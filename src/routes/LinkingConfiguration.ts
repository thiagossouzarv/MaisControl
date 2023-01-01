import { LinkingOptions } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import * as Linking from 'expo-linking';
import { APP_SCREENS, AUTH_SCREENS } from './screens';
import { LinkingMaping, obterUrl, validarUrl } from './LinkingMaping';

const prefix = Linking.createURL('/');

function LinkingConfiguration(isSigned: boolean): LinkingOptions<any> {
    return ({
        prefixes: [prefix, 'https://app.drtask.lutcode.com.br'],
        async getInitialURL() {
            const response = await Notifications.getLastNotificationResponseAsync();
            //let url = validarUrl(obterUrlNotificacao(response?.notification.request.content.data), isSigned);
            let url = obterUrlNotificacao(response?.notification.request.content.data);
            if (url?.length) return prefix + "/" + url;

            url = await Linking.getInitialURL();
            return url;
        },
        subscribe(listener: any) {
            const onReceiveURL = ({ url }: { url: string }) => listener(url);

            // Listen to incoming links from deep linking
            const lnk = Linking.addEventListener('url', onReceiveURL);

            const subscription = Notifications.addNotificationResponseReceivedListener(response => {
                const url = validarUrl(obterUrlNotificacao(response.notification.request.content.data), isSigned);
                listener(prefix + "/" + url);
            });

            return () => {
                //Linking.removeEventListener('url', onReceiveURL);
                lnk.remove();
                subscription.remove();
            };
        },
        config: {
            screens: {
                [AUTH_SCREENS.Login]: {
                    path: LinkingMaping[AUTH_SCREENS.Login].rota,
                    exact: true,
                },
                "App": {
                    initialRouteName: "Tabs",
                    path: "",
                    screens: {
                        // [APP_SCREENS.AceiteSolicitacaoTroca]: {
                        //     path: LinkingMaping[APP_SCREENS.AceiteSolicitacaoTroca].rota,
                        //     exact: true,
                        // },
                        // [APP_SCREENS.DetalheNotificacao]: {
                        //     path: LinkingMaping[APP_SCREENS.DetalheNotificacao].rota,
                        //     exact: true,
                        // },
                        // [APP_SCREENS.FormularioCheckin]: {
                        //     path: LinkingMaping[APP_SCREENS.FormularioCheckin].rota,
                        //     exact: true,
                        // },
                        "Tabs": {
                            screens: {
                                // [APP_SCREENS.Escala]: {
                                //     path: LinkingMaping[APP_SCREENS.Escala].rota,
                                //     exact: true,
                                // },
                                // [APP_SCREENS.Plantoes]: {
                                //     path: LinkingMaping[APP_SCREENS.Plantoes].rota,
                                //     exact: true,
                                // },
                            }
                        }
                    }
                }
            }
        }
    });
}

export default LinkingConfiguration;

function obterUrlNotificacao(info: any): string | null | undefined {
    try {
        const { url, tela, parametros }: {
            url: string | null | undefined,
            tela: string | null | undefined,
            parametros: object | null | undefined
        } = info || {};

        let urlFinal: string | undefined | null = url?.replace(prefix, "");

        if (!urlFinal?.length && tela?.length)
            urlFinal = obterUrl({ tela, parametros: parametros || {} });

        return urlFinal;

    } catch (error) {
        return null;
    }
}
