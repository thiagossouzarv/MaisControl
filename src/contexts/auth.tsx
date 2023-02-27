import React, { createContext, useState, useEffect, useContext, useCallback } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as SplashScreen from 'expo-splash-screen'

import { STORAGE_ID_USER, STORAGE_ID_USER_TOKEN } from "../constants/globals"
import { APP_INTERCEPTOR, updateToken } from "../services/core/api"
import AsyncUtils from "../utils/async"
import AuthService, { Cliente, User } from "../services/core/auth"
import { AppConfig } from "../core/config"
import Http from "../services/core/http"
import checkInternetConnection from "../utils/isConection"
import DataOffline from "../services/core/DataOffline"

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [clientes, setClientes] = useState<Cliente[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const updateAuthInfo = useCallback(async (user: User, token: string) => {        
        await AsyncStorage.setItem(STORAGE_ID_USER, JSON.stringify(user))
        await AsyncStorage.setItem(STORAGE_ID_USER_TOKEN, token)
        await updateToken(token)
        
        if (AppConfig.auth.bioAuthentication) 
            AuthService.updateBioAuthenticationToken(token, user?.Cpf).catch((error: any) => console.log(error))

        setUser(user)
    }, [])

    const signIn = useCallback((
        cpf: string, 
        senha: string, 
        aceitarPoliticaTermos: boolean, 
        bioAutenticacao: boolean,
        empresa?: number
    ): Promise<void> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await AuthService.signIn(cpf, senha, aceitarPoliticaTermos, bioAutenticacao, empresa)
                await updateAuthInfo(response.user, response.token)
                resolve()

            } catch (error: any) {
                reject(error)
            }
        })
    }, [updateAuthInfo])

    const updateClientes = useCallback((clientes: Cliente[]): Promise<void> => {
        return new Promise(async (resolve, reject) => {
            try {
                setClientes(clientes)
                resolve()

            } catch (error: any) {
                reject(Http.processError(error, "Falha ao atualizar cliente."))
            }    
        })
    }, [user])

    const signOut = useCallback(async () => {
        await AsyncStorage.removeItem(STORAGE_ID_USER)
        await AsyncStorage.removeItem(STORAGE_ID_USER_TOKEN)

        setUser(null)
    }, [])

    useEffect(function middlewareSignOut() {
        APP_INTERCEPTOR.updateInterceptor(signOut)
    }, [signOut])

    useEffect(function autenticacaoAutomatica() {
        async function load() {
            try {
                const storagedUser = await AsyncStorage.getItem(STORAGE_ID_USER)
                const storagedToken = await AsyncStorage.getItem(STORAGE_ID_USER_TOKEN)

                if (storagedUser && storagedToken) {
                    const user: User = JSON.parse(storagedUser)
                    checkInternetConnection().then( async isConnected => {
                        if (isConnected) {
                            console.log('com internet');
                            //alert('com internet')
                            const tokenValido = await AuthService.isTokenValid(user.Cpf, storagedToken)
                            if (tokenValido) {
                                await updateAuthInfo(user, storagedToken)
                                DataOffline.carregarDadosOffline()
                            }
                            else signOut()
                        } else {
                            //alert('sem internet')
                            await updateAuthInfo(user, storagedToken)
                            console.log('sem internet')
                        }
                    })
                    //const newToken = await AuthService.refreshToken()
                    //await updateAuthInfo(user, newToken)
                }

            } catch (error) {
                signOut()

            } finally {
                setIsLoading(false)
                AsyncUtils.waitAMoment(300)
                SplashScreen.hideAsync()
            }
        }

        load()
    }, [])

    return (
        <AuthContext.Provider value={{
            isSigned: !!user,
            user,
            clientes,
            isLoading,
            signIn,
            signOut,
            requestNewPassword: AuthService.requestNewPassword,
            updateClientes
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    return context
}

interface AuthContextData {
    isSigned: boolean
    user: User | null
    clientes: Cliente[]
    isLoading: boolean
    signIn(cpf: string, senha: string, aceitarPoliticasTermos: boolean, bioAutenticacao: boolean, empresa?: number): Promise<void>
    signOut(): void
    requestNewPassword(cpf: string): Promise<string>
    updateClientes(client: Cliente[]): Promise<void>
}