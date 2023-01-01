import * as Device from 'expo-device'
import appJson from "../../../app.json"
import * as Updates from 'expo-updates'

const APP_ENVIRONMENTS = {
    producao: {
        id: "prd",
        label: "produção",
        site: "https://lutcode.com.br/lutagro",
        webServiceURI: "https://maiscontrol.com/api/",
    } as AppEnvironment,
    desenvolvimento: {
        id: "dev",
        label: "desenvolvimento",
        site: "https://lutcode.com.br/",
        webServiceURI: "https://maiscontrol.com/api/",
    } as AppEnvironment,
    homologacao: {
        id: "hml",
        label: "homologação",
        site: "https://lutcode.com.br/",
        webServiceURI: "https://maiscontrol.com/api/",
    } as AppEnvironment
}

export class EnvironmentService {
    static getDeviceInfo(): EnvironmentInfo {
        return {
            device_id: Device.modelName,
            os_version: Device.osVersion,
            plataforma: Device.osName,
            versao: appJson.expo.version,
        }
    }

    static getEnviroment(): AppEnvironment {
        return Updates.releaseChannel.startsWith('prd') ? APP_ENVIRONMENTS.producao :
            Updates.releaseChannel.startsWith('dev') ? APP_ENVIRONMENTS.desenvolvimento :
                APP_ENVIRONMENTS.homologacao
    }
}


interface AppEnvironment {
    id: string,
    label: string,
    site: string,
    webServiceURI: string,
}

export interface EnvironmentInfo {
    device_id: string | null;
    os_version: string | null;
    plataforma: string | null;
    versao: string;
  }