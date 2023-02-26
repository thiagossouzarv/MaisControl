import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import * as Location from 'expo-location';
import * as IntentLauncher from 'expo-intent-launcher'

import PushNotificationService from "../services/core/pushNotification";
import { Linking, Platform } from "react-native";
import Constants from "expo-constants";
import { AppConfig } from "../core/config";

const APP_REQUIRED_PERMISSIONS = AppConfig.permissions.required

interface UpdateStatusResponse {
    success: boolean;
};

type PermissionsContextType = {
    requiredPermissionsAllEnabled: boolean;
    permissionsIgnored: boolean;
    setIgnorePermissions: (ignored: boolean) => void;
    updateAllPermissionStatus: () => Promise<UpdateStatusResponse>;
    location: {
        enabled: boolean;
        canRequest: boolean;
        request: (() => Promise<void>) | null;
        updateStatus: (() => Promise<UpdateStatusResponse>) | null;
        openDeviceSettings: (() => Promise<void>) | null;
    };
    notifications: {
        enabled: boolean;
        canRequest: boolean;
        request: (() => Promise<void>) | null;
        updateStatus: (() => Promise<UpdateStatusResponse>) | null;
        openDeviceSettings: (() => Promise<void>) | null;
    };
}

const PACKAGE_NAME = Constants?.manifest?.releaseChannel
    ? Constants.manifest.android.package
    : 'host.exp.exponent';

export const PermissionsContext = createContext<PermissionsContextType>({
    requiredPermissionsAllEnabled: false,
    permissionsIgnored: false,
    setIgnorePermissions: () => { },
    location: {
        enabled: false,
        canRequest: true,
        request: null,
        updateStatus: null,
        openDeviceSettings: null,
    },
    notifications: {
        enabled: false,
        canRequest: true,
        request: null,
        updateStatus: null,
        openDeviceSettings: null,
    },
    updateAllPermissionStatus: (): Promise<UpdateStatusResponse> => Promise.resolve({ success: true }),
});

export function PermissionsProvider({ children }: { children: React.ReactNode }) {
    const [statusForegroundLocation, requestForegroundLocationPermission] = Location.useForegroundPermissions();

    const [permissionsIgnored, setPermissionsIgnored] = useState(false);
    const [locationEnabled, setLocationEnabled] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [canLocationRequest, setCanLocationRequest] = useState(true);
    const [canNotificationsRequest, setCanNotificationsRequest] = useState(true);

    const updateNotificationsStatus = useCallback((): Promise<UpdateStatusResponse> => {
        return new Promise(async (resolve, reject) => {
            try {
                const info = await PushNotificationService.getRequestPermissionStatus();
                setCanNotificationsRequest(info.canAskAgain);
                setNotificationsEnabled(info.enabled);
                resolve({ success: true });

            } catch (error) {
                console.log(error);
                resolve({ success: false });
            }
        });
    }, []);

    const updateLocationStatus = useCallback((): Promise<UpdateStatusResponse> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await Location.getForegroundPermissionsAsync();
                setCanLocationRequest(response.canAskAgain);
                setLocationEnabled(response.granted);
                resolve({ success: true });

            } catch (error) {
                console.log(error);
                resolve({ success: false });
            }
        });
    }, []);

    useEffect(function carregamentoInicial() {
        updateNotificationsStatus().catch(error => { });
        updateLocationStatus().catch(error => { });
    }, [updateNotificationsStatus, updateLocationStatus]);

    useEffect(function atualizarLocationStatus() {
        const atualizar = async () => {
            try {
                setLocationEnabled(statusForegroundLocation?.status === "granted");
                setCanLocationRequest(statusForegroundLocation?.canAskAgain || false);
                await updateNotificationsStatus();
            } catch (err) {}
        };

        atualizar();
    }, [statusForegroundLocation]);

    const requestForegroundLocationPermissionAsync = useCallback((): Promise<void> => {
        return new Promise(async (resolve, reject) => {
            try {
                await Location.requestForegroundPermissionsAsync();
                await updateNotificationsStatus();
                resolve();

            } catch (error) {
                console.log(error);
                reject("Falha ao requisitar permissão de localização.");
            }
        })
    }, []);

    const requestNotificationsPermission = useCallback((): Promise<void> => {
        return new Promise(async (resolve, reject) => {
            try {
                //await PushNotificationService.updateServerToken();
                //await updateNotificationsStatus();
                resolve();

            } catch (error) {
                console.log(error);
                reject("Falha ao registrar token de notificações.");
            }
        })
    }, [updateNotificationsStatus]);

    const updateAllPermissionStatus = useCallback((): Promise<UpdateStatusResponse> => {
        return new Promise(async (resolve, reject) => {
            try {
                const { success: suc1 } = await updateLocationStatus();
                const { success: suc2 } = await updateNotificationsStatus();

                resolve({ success: suc1 && suc2 });

            } catch (error) {
                console.log(error);
                resolve({ success: false });
            }
        });

    }, [updateLocationStatus, updateNotificationsStatus]);

    const openAppNotificationSettings = useCallback(async () => {
        if (Platform.OS === 'ios') {
            //Linking.openURL(`App-Prefs:NOTIFICATIONS_ID`);
            try {
                /*await PushNotificationService.updateServerToken();
                const response = await PushNotificationService.getRequestPermissionStatus();
                if (!response.enabled) throw new Error();*/

                //PushNotificationService.trySendPushTokenToServer().catch(e => {});

            } catch (error: any) {
                Linking.openURL("app-settings:");
            }
        } else {
            await IntentLauncher.startActivityAsync(
                IntentLauncher.ActivityAction.APP_NOTIFICATION_SETTINGS,
                {
                    extra: { 'android.provider.extra.APP_PACKAGE': PACKAGE_NAME },
                    packageName: PACKAGE_NAME,
                    //data: 'package:' + PACKAGE_NAME,
                },
            );

            updateAllPermissionStatus();
        }
    }, [updateAllPermissionStatus]);

    const openAppLocationSettings = useCallback(async () => {
        if (Platform.OS === 'ios') {
            Linking.openURL("app-settings:");
        } else {
            await IntentLauncher.startActivityAsync(
                IntentLauncher.ActivityAction.APPLICATION_DETAILS_SETTINGS,
                {
                    extra: { 'android.provider.extra.APP_PACKAGE': PACKAGE_NAME },
                    data: 'package:' + PACKAGE_NAME,
                    packageName: PACKAGE_NAME,
                },
            );

            updateAllPermissionStatus();
        }
    }, [updateAllPermissionStatus]);

    const setIgnorePermissions = useCallback((ignored: boolean) => {
        setPermissionsIgnored(ignored);
    }, []);


    const requiredPermissionsAllEnabled = 
        (!APP_REQUIRED_PERMISSIONS.some(r => r === "location") || locationEnabled) &&
        (!APP_REQUIRED_PERMISSIONS.some(r => r === "notifications") || notificationsEnabled);

    return (
        <PermissionsContext.Provider value={{
            requiredPermissionsAllEnabled,
            permissionsIgnored,
            setIgnorePermissions,
            updateAllPermissionStatus,
            location: {
                enabled: locationEnabled,
                canRequest: canLocationRequest,
                request: requestForegroundLocationPermissionAsync,
                updateStatus: updateLocationStatus,
                openDeviceSettings: openAppLocationSettings,
            },
            notifications: {
                enabled: notificationsEnabled,
                canRequest: canNotificationsRequest,
                request: requestNotificationsPermission,
                updateStatus: updateNotificationsStatus,
                openDeviceSettings: openAppNotificationSettings,
            }
        }}>
            {children}
        </PermissionsContext.Provider>
    );
}

export function usePermissions() {
    const context = useContext(PermissionsContext);
    return context;
}