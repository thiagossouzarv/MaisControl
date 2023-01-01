import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import {
    ClientesScreen,
    EsqueciMinhaSenhaScreen,
    LoginScreen,
    RedefinirSenhaScreen,
    RequisicaoPermissoesScreen,
} from "../screens"
import screenOptions from "./screenOptions"
import { AUTH_SCREENS } from "./screens"
import { useAuth } from "../contexts/auth"

const AuthStack = createNativeStackNavigator()

const AuthRoutes: React.FC = () => {
    const { isSigned } = useAuth()

    return (
        <AuthStack.Navigator
            initialRouteName={isSigned ? AUTH_SCREENS.RequisicaoPermissoes : AUTH_SCREENS.Login}
            screenOptions={screenOptions}>
            <AuthStack.Screen
                name={AUTH_SCREENS.Login}
                component={LoginScreen}
                options={{ headerShown: false }} />

            <AuthStack.Screen
                name={AUTH_SCREENS.RequisicaoPermissoes}
                component={RequisicaoPermissoesScreen}
                options={{ headerShown: false }} />

            <AuthStack.Screen
                name={AUTH_SCREENS.EsqueciMinhaSenha}
                component={EsqueciMinhaSenhaScreen}
                options={{ headerShown: false }} />

            <AuthStack.Screen
                name={AUTH_SCREENS.RedefinirSenha}
                component={RedefinirSenhaScreen}
                options={{ headerShown: false }} />

            <AuthStack.Screen
                name={AUTH_SCREENS.Clientes}
                component={ClientesScreen}
                options={{ headerShown: true, title: "Clientes" }} />
        </AuthStack.Navigator>
    )
}

export default AuthRoutes