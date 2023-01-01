import { useCallback, useEffect, useRef, useState } from "react"
import * as LocalAuthentication from 'expo-local-authentication'
import AuthService, { BioAuthenticationStorage } from "../../services/core/auth"
import { useFocusEffect } from "@react-navigation/native"
import { AppConfig } from "../../core/config"

const useBiometrics = (onAuthenticate: Function) => {

    const _bioValidada = useRef(false)
    const _bio = useRef<BioAuthenticationStorage>({ cpf: null, token: null })

    const [bioAuthenticationAvailable, setBioAuthenticationAvailable] = useState(false)
    const [toggleUpdate, setToggleUpdated] = useState(false)

    useFocusEffect(useCallback(() => {
        const load = async () => {
            if (AppConfig.auth.bioAuthentication) {
                const bio = await AuthService.getBioAuthenticationStoraged()
                _bio.current = bio
            }
        }

        load()
    }, []))

    useEffect(function verificarBioAuthentication() {
        (async () => {
            try {
                if (AppConfig.auth.bioAuthentication) {
                    const temHardware = await LocalAuthentication.hasHardwareAsync()
                    const permiteBioAutenticacao = (await LocalAuthentication.supportedAuthenticationTypesAsync()).length > 0
                    const temBioAutenticacaoSalva = await LocalAuthentication.isEnrolledAsync()
                    const temBioAutenticacaoRegistrada = await LocalAuthentication.getEnrolledLevelAsync() === LocalAuthentication.SecurityLevel.BIOMETRIC
                    const bio = await AuthService.getBioAuthenticationStoraged()
                    const usuarioPermitiuBioAutenticacao = !!bio.cpf

                    _bio.current = bio
                    setBioAuthenticationAvailable(temHardware && permiteBioAutenticacao && temBioAutenticacaoRegistrada && temBioAutenticacaoSalva && usuarioPermitiuBioAutenticacao)

                    if (usuarioPermitiuBioAutenticacao) authenticate()
                }

            } catch (error) { console.log(error) }
        })()
    }, [])

    const setBioValidada = useCallback((valor: boolean) => {
        _bioValidada.current = valor
        setToggleUpdated(val => !val)
    }, [])

    const authenticate = useCallback(() => {
        return new Promise(async (resolve, reject): Promise<void> => {
            try {
                setBioValidada(false)

                const response = await LocalAuthentication.authenticateAsync({
                    cancelLabel: 'Cancelar',
                    disableDeviceFallback: true,
                    fallbackLabel: '',
                    promptMessage: 'Reconhecimento Biométrico',
                })

                if (!response.success && response.error != "user_cancel")
                    reject(response.error === "lockout"
                        ? "Você ultrapassou o número de tentativas permitidos, favor tente novamente mais tarde."
                        : "Falha ao realizar autenticação biométrica.")

                if (response.success) {
                    setBioValidada(true)
                    onAuthenticate()
                    resolve(null)
                }

            } catch (error: any) {
                reject("Falha ao realizar autenticação biométrica.")
            }
        })
    }, [onAuthenticate])

    const invalidate = useCallback(() => {
        setBioValidada(false)
    }, [])

    return {
        bioInfo: _bio,
        bioEnabled: bioAuthenticationAvailable,
        bioAuthenticate: authenticate,
        bioAuthInvalidate: invalidate,
        bioAuthConfirmed: _bioValidada,
        _toggle: toggleUpdate
    }
}

export default useBiometrics