import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabNavigator from "./BottomTab";
import screenOptions from "./screenOptions";
import { APP_SCREENS } from "./screens";
import { MaterialDetalheScreen, PermissoesScreen } from "../screens";


const AppStack = createNativeStackNavigator();
const AppStackFinal = createNativeStackNavigator();

const AppRoutesFinal: React.FC = () => (
    <AppStackFinal.Navigator
        screenOptions={screenOptions}>
        <AppStackFinal.Screen
            name="App"
            component={AppRoutes}
            options={{ headerShown: false }} />
    </AppStackFinal.Navigator>
);

const AppRoutes: React.FC = () => (
    <AppStack.Navigator
        screenOptions={screenOptions}>

        <AppStack.Screen
            name="Tabs"
            component={BottomTabNavigator}
            options={{ headerShown: false }} />

        <AppStack.Screen
            name={APP_SCREENS.MaterialDetalhe}
            component={MaterialDetalheScreen}
            options={{
                title: "Detalhe",
            }} />

        <AppStack.Screen
            name={APP_SCREENS.Permissoes}
            component={PermissoesScreen}
            options={{
                title: "Permissões",
            }} />

    </AppStack.Navigator>
);

export default AppRoutesFinal;