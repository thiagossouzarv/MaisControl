import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'
import api from './api'
import { EnvironmentService } from './environment'
import Http, { HttpBaseResponse } from './http'

export default class PushNotificationService {

    static updateServerToken(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                let token = await PushNotificationService.getToken()
                const deviceInfo = EnvironmentService.getDeviceInfo()
                console.log('Push Token: ', token.data)                

                const response: HttpBaseResponse = await api.post("setDeviceInfo/", {
                    pushToken: PushNotificationService.deserializeToken(token.data),
                    ...deviceInfo
                })

                const validacao = Http.validate(response)

                if (validacao.hasError)
                    return reject(validacao.rejection)

                resolve()

            } catch (error: any) {
                reject(Http.processError(error, "Erro ao registrar token de notificações push."))
            }
        })
    }

    static getToken(): Promise<Notifications.ExpoPushToken> {
        return new Promise(async (resolve, reject) => {
            try {
                let { status } = await Notifications.getPermissionsAsync()

                if (status !== "granted") {
                    const { status: newStatus } = await Notifications.requestPermissionsAsync({
                        ios: {
                            allowAlert: true,
                            allowBadge: true,
                            allowSound: true,
                        }
                    })
                    
                    status = newStatus
                }

                if (status !== "granted")
                    return reject("Você negou a permissão para receber/enviar notificações.")

                const tokenResponse = await Notifications.getExpoPushTokenAsync()

                if (Platform.OS === "android") {
                    await Notifications.setNotificationChannelAsync("default", {
                        name: "default",
                        importance: Notifications.AndroidImportance.MAX,
                        vibrationPattern: [0, 250, 250, 250],
                        lightColor: "#FF231F7C",
                    })
                }

                resolve(tokenResponse)

            } catch (error: any) {
                reject(Http.processError(error, "Erro ao registrar token das notificações push."))
            }
        })
    }

    static deserializeToken(token: string) {
        const match = token.match(/\[(.*)\]/)
        return match?.length || 0 > 1 ? match[1] : token
    }

    static getRequestPermissionStatus(): Promise<RequestPermissionStatus> {
        return new Promise(async (resolve, reject) => {
            try {
                const { status: existingStatus, canAskAgain } = await Notifications.getPermissionsAsync()
                resolve({
                    enabled: existingStatus === 'granted',
                    canAskAgain,
                })

            } catch (error: any) {
                reject(Http.processError(error, "Falha ao verificar permissão sobre notificações."))
            }
        })
    }
}


interface RequestPermissionStatus {
    enabled: boolean
    canAskAgain: boolean
}