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

export default function App() {
    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) return null;

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
