import React from "react";

import { NavigationContainer, DefaultTheme, createNavigationContainerRef } from '@react-navigation/native';
import { useAuth } from "../contexts/auth";
import { obterNomeDaRota } from "./screens";
import LinkingConfiguration from "./LinkingConfiguration";
import LogoContainer from "../components/app/logoPage/LogoPage";
import { BasicTheme } from "../core/theme";

const AppTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: BasicTheme.colors.bg.light,
    }
}

const navigationRef = createNavigationContainerRef()

interface AppNavigationProps {
    children: React.ReactNode;
}

const AppNavigation: React.FC<AppNavigationProps> = ({ children }) => {
    const { isSigned } = useAuth();

    return (
        <NavigationContainer
            ref={navigationRef}
            theme={AppTheme}
            linking={LinkingConfiguration(isSigned)}
            fallback={<LogoContainer />}>
            {children}
        </NavigationContainer>
    );
};

export function navigate(tela: string, params: any) {
    try {
        const telaAtual = navigationRef.getCurrentRoute()?.name || "";
        if (!telaAtual?.length || (obterNomeDaRota(telaAtual) != obterNomeDaRota(tela)))
            return;

        if (navigationRef.isReady())
            navigationRef.navigate(tela, params);

    } catch (error) {

    }
}

export default AppNavigation;