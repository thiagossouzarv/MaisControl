import axios from "axios"

import { EnvironmentService } from "./environment"
import { STORAGE_ID_BIO_AUTHENTICATION } from "../../constants/globals"

const env = EnvironmentService.getEnviroment()
export const API_BASE_URL = env.webServiceURI

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        get: { 'Content-Type': 'application/json' },
        post: { 'Content-Type': 'application/json' },
        put: { 'Content-Type': 'application/json' },
        delete: { 'Content-Type': 'application/json' },
        patch: { 'Content-Type': 'application/json' },
        head: { 'Content-Type': 'application/json' }
    },
})

// api.interceptors.response.use((response) => {
//     return response.data
// }, (error) => {
//     if (error.response && error.response.data) {
//         return Promise.reject(error.response.data)
//     }
//     return Promise.reject(error.message)
// })

export function updateToken(token: string) {
    api.defaults.headers.Authorization = `Bearer ${token}`    
}

export const APP_INTERCEPTOR: InterceptorObject = {
    _interceptor: null,
    updateInterceptor: function (signOut) {
        if (this._interceptor != null) api.interceptors.response.eject(this._interceptor)

        this._interceptor = api.interceptors.response.use(function (response) {
            // Qualquer código de status que dentro do limite de 2xx faz com que está função seja acionada
            // Faz alguma coisa com os dados de resposta

            //if (signOut != null && response.data && response.data.codigo === 401) signOut()
            //console.log(response.data, response.data.codigo === 401)

            return response.data
        }, function (error) {
            // Qualquer código de status que não esteja no limite do código 2xx faz com que está função seja acionada
            // Faz alguma coisa com o erro da resposta
            if (error.response && error.response.data)
                return Promise.reject(error.response.data)
                
            return Promise.reject(error.message)
        })
    }
}

export default api

interface InterceptorObject {
    _interceptor: null | number
    updateInterceptor: (signOut: () => Promise<void>) => void
}