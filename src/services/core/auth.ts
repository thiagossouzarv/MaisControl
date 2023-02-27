
import AsyncStorage from "@react-native-async-storage/async-storage"

import Http, { ErrorResponse, HttpBaseResponse } from "./http"
import { STORAGE_ID_BIO_AUTHENTICATION } from "../../constants/globals"
import api, { API_BASE_URL } from "./api"
import ArrayUtils from "../../utils/array"
import DataOffline from "./DataOffline"

export default class AuthService {
    static signIn(
        cpf: string,
        senha: string,
        aceitarPoliticaTermos: boolean,
        bioAutenticacao: boolean,
        empresa?: number,
    ): Promise<LoginResponse> {
        return new Promise(async (resolve, reject) => {
            const MSG_ERROR = "Erro desconhecido ao realizar o login."

            try {
                const resp: SignInResponse = await api.post("usuarios/GerarTokenMobile", {
                    grant_type: "password",
                    layout: "5",
                    username: cpf,
                    empresa,
                    password: bioAutenticacao ? null : senha,
                    token: bioAutenticacao ? senha : null,
                    aceite_politica_termo: aceitarPoliticaTermos
                })

                const validate = Http.validate(resp, MSG_ERROR)

                if (!empresa && resp.Data?.IsAdministrator)
                    return reject({
                        code: ERROS.escolherCliente,
                        userMessage: resp.Mensagem || MSG_ERROR,
                        data: { clientes: resp.Data.Clientes }
                    } as ErrorResponse)

                if (resp.Data?.AlterarSenha)
                    return reject({
                        code: ERROS.redefinirSenha,
                        userMessage: resp.Mensagem || MSG_ERROR,
                        data: { token: resp.Data.Token }
                    } as ErrorResponse)

                if (validate.hasError || !resp.Data)
                    return reject(validate.rejection)
                
                //carregar todos os dados para uso offline
                DataOffline.carregarDadosOffline()

                resolve({
                    token: resp.Data.Token,
                    user: {
                        Nome: resp.Data.NomeUsuario,
                        Cpf: cpf,
                        IsAdmin: resp.Data.IsAdministrator,
                        Empresa: {
                            Id: resp.Data.IdEmpresa,
                            Nome: resp.Data.NomeEmpresa
                        },
                        Clientes: ArrayUtils.sort(resp.Data.Clientes || [], item => [
                            [item.NomeFantasia, "asc"], 
                            [item.Nome || item.RazaoSocial, "asc"]])
                    }
                })

            } catch (error: any) {
                reject(Http.processError(error, MSG_ERROR))
            }
        })
    }

    static isTokenValid(cpf: string, token: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            const MSG_ERROR = "Erro desconhecido ao validar o token de autenticação."
            
            //return resolve(true)
            try {
                const resp: IsTokenValidResponse = await api.get(`usuarios/ValidateToken?token=${token}&username=${cpf}`, {
                headers: {
                    Authorization: "Bearer " + token
                }})
                const validacao = Http.validate(resp, MSG_ERROR)

                if (validacao.hasError)
                    return reject(validacao.rejection)

                resolve(resp.Data)

            } catch (error: any) {
                console.log(error)
                reject(Http.processError(error, MSG_ERROR))
            }
        })
    }

    static refreshToken(): Promise<string> {
        return new Promise(async (resolve, reject) => {
            const MSG_ERROR = "Erro desconhecido ao atualizar token de autenticação."

            try {
                const resp: RefreshTokenResponse = await api.post("tokenIsValid/?refresh=true")
                const validacao = Http.validate(resp, MSG_ERROR)

                if (validacao.hasError)
                    return reject(validacao.rejection)

                resolve(resp.token)

            } catch (error: any) {
                reject(Http.processError(error, MSG_ERROR))
            }
        })
    }

    static requestNewPassword(cpf: string): Promise<string> {
        return new Promise(async (resolve, reject) => {
            const MSG_ERROR = "Erro ao requisitar nova senha."

            try {
                const resp: RequestNewPasswordResponse = await api.post(`redefinirSenhaCPF/${cpf}/redefinir/`)

                if (resp.error)
                    return reject({
                        code: resp.code || resp.codigo || "error",
                        userMessage: resp.message || MSG_ERROR,
                    } as ErrorResponse);

                resolve(resp.email)

            } catch (error: any) {
                reject(Http.processError(error, MSG_ERROR))
            }
        })
    }

    static updatePassword(senha: string, token?: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const MSG_ERROR = "Não foi possível gerar o link de acesso para alterar a senha.."

            try {
                //const uri = link.replace(API_BASE_URL, "");
                const resp: RequestNewPasswordResponse = await api.post("usuarios/ChangePassword", 
                    { Senha: senha }, !!token ? {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                } : {});
                const validate = Http.validate(resp, MSG_ERROR)
                
                if (validate.hasError)
                    return reject(validate.rejection)

                resolve()

            } catch (error: any) {
                reject(Http.processError(error, MSG_ERROR))
            }
        })
    }

    static isAppTermsAccepted(cpf: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            const MSG_ERROR = "Erro ao verificar aceite de termos do aplicativo."

            try {
                const response: any = await api.post("getPoliticaTermo/", { CPF: cpf });
                const validacao = Http.validate(response, MSG_ERROR)

                if (validacao.hasError)
                    return reject(validacao.rejection)

                resolve(response.aceitou_termo && response.aceitou_politica)

            } catch (error: any) {
                reject(Http.processError(error, MSG_ERROR))
            }
        })
    }

    static storageBioAuthentication(bioAuth: BioAuthenticationStorage): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await AsyncStorage.setItem(STORAGE_ID_BIO_AUTHENTICATION, JSON.stringify(bioAuth))
                resolve()

            } catch (error) {
                reject({ userMessage: "Falha ao salvar configurações de autenticação biométrica." })
            }
        })
    }

    static getBioAuthenticationStoraged(): Promise<BioAuthenticationStorage> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await AsyncStorage.getItem(STORAGE_ID_BIO_AUTHENTICATION)
                resolve(!response ? {
                    cpf: null,
                    token: null
                } : JSON.parse(response))

            } catch (error) {
                reject({ userMessage: "Falha ao recuperar configurações de autenticação biométrica." })
            }
        })
    }

    static updateBioAuthenticationToken(token: string, cpf: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await AsyncStorage.getItem(STORAGE_ID_BIO_AUTHENTICATION)

                if (response) {
                    const bio = JSON.parse(response)
                    if (bio.cpf) {
                        if (cpf && cpf != bio.cpf) {
                            await AsyncStorage.setItem(STORAGE_ID_BIO_AUTHENTICATION, JSON.stringify({ cpf: null, token: null }))

                        } else {
                            bio.token = token
                            await AsyncStorage.setItem(STORAGE_ID_BIO_AUTHENTICATION, JSON.stringify(bio))
                        }
                    }
                }

                resolve()

            } catch (error: any) {
                reject(Http.processError(error, "Falha ao salvar configurações de autenticação biométrica."))
            }
        })
    }
}


interface LoginResponse {
    user: User,
    token: string,
}

export interface User {
    Nome: string,
    Cpf: string,
    IsAdmin: boolean,
    Empresa: {
        Id: string,
        Nome: string,
    },
    Clientes: Cliente[]
}

export interface BioAuthenticationStorage {
    cpf: string | null,
    token: string | null,
}


interface SignInResponse {
    Codigo: number;
    Mensagem: string;
    Data?: {
        AlterarSenha: boolean;
        IsAdministrator: boolean;
        Token: string;
        NomeUsuario: string;
        Clientes: Cliente[];
        NomeEmpresa: string;
        IdEmpresa: string;
        CpfLogin: string;
    }
}

interface IsTokenValidResponse extends HttpBaseResponse {
    Data: boolean
}

interface RefreshTokenResponse extends HttpBaseResponse {
    token: string;
}

interface RequestNewPasswordResponse extends HttpBaseResponse {
    email: string;
}

export interface Cliente {
    IdCliente: number, 
    Inativo: boolean, 
    Nome: null, 
    NomeFantasia: string, 
    RazaoSocial: string, 
    CPF: string | null, 
    Senha: string | null, 
    StringConexao: string | null, 
    Login: null, 
    GUID: string | null, 
    AlterarSenha: boolean, 
    IsAdministrator: boolean, 
    MacConcentrador: string | null, 
}

export const ERROS = {
    redefinirSenha: "redefinir-senha",
    escolherCliente: "escolher-cliente"
}