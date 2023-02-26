import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { useAuth } from "../contexts/auth";
import { usePermissions } from "../contexts/permissions";
import PushNotificationService from "../services/core/pushNotification";

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

const Routes: React.FC = () => {
    const { isSigned, isLoading } = useAuth();
    const { requiredPermissionsAllEnabled, permissionsIgnored } = usePermissions();
    
    const pendenciasResolvidas = isSigned && (requiredPermissionsAllEnabled || permissionsIgnored);

    useEffect(function atualizarStatusBar() {
        StatusBar.setHidden(!pendenciasResolvidas)
    }, [pendenciasResolvidas])

    useEffect(function enviarPushNotificationToken() {
        try {
            if (pendenciasResolvidas) {
                //console.log('tentando enviar push notification novamente...');
                //setTimeout(() => PushNotificationService.updateServerToken().catch(error => console.log(error)), 5000);
            }
        } catch (error) { }
    }, [pendenciasResolvidas]);

    if (isLoading) return null;

    return pendenciasResolvidas ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;