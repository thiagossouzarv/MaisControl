import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from "styled-components/native";
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { BasicTheme } from './src/core/theme';
import useCachedResources from './src/hooks/core/useCachedResources';
import { AuthProvider } from './src/contexts/auth';
import Routes from './src/routes';
import AppNavigation from './src/routes/AppNavigation';
import { PermissionsProvider } from './src/contexts/permissions';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import * as TaskManager from 'expo-task-manager';
import checkInternetConnection from './src/utils/isConection';
import { BACKGROUND_SAVE_CLOUD, STORAGE_ABASTECIMENTOS } from './src/constants/globals';
import * as BackgroundFetch from 'expo-background-fetch';
import api from './src/services/core/api';
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function App() {
    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) return null;

    TaskManager.defineTask(BACKGROUND_SAVE_CLOUD, async () => {
        checkInternetConnection().then( async isConnected => {
            const now = Date.now();
            if (isConnected) {
                console.log('gravando dados nuvem')
                var AbastecimentosDB = await AsyncStorage.getItem(STORAGE_ABASTECIMENTOS)
                var abastecimentos = AbastecimentosDB == null? [] : JSON.parse(AbastecimentosDB)

                abastecimentos.forEach(async post => {
                    const resp = await api.post("abastecimento/GravarAbastecimentoInterno", post)
                    console.log(resp)
                });
                await AsyncStorage.removeItem(STORAGE_ABASTECIMENTOS)
            }
            return BackgroundFetch.BackgroundFetchResult.NewData;
        })
    });

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider style={{ flex: 1 }}>
                <ThemeProvider theme={BasicTheme}>
                    <AuthProvider>
                        <AppNavigation>
                            <PermissionsProvider>
                                <Routes />
                            </PermissionsProvider>
                        </AppNavigation>
                    </AuthProvider>
                </ThemeProvider>

                <StatusBar style={BasicTheme.statusbar.theme} backgroundColor={BasicTheme.statusbar.bg} />
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}
