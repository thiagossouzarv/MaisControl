import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import { APP_SCREENS } from "./screens";
import screenOptions, { DrawerScreenOptions } from "./screenOptions";
import AppMenu from "./appMenu/AppMenu";
import { AbastecimentosScreen, AlterarSenhaScreen, ClientesScreen, MenuScreen, PermissoesScreen, TanquesScreen } from "../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../contexts/auth";

const AppStack = createNativeStackNavigator();
const AppStackFinal = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

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
            component={AppRoutesMenu}
            options={{ headerShown: false }} />

        <AppStack.Screen
            name={APP_SCREENS.AlterarSenha}
            component={AlterarSenhaScreen}
            options={{
                title: "Alterar Senha",
            }} />

        <AppStack.Screen
            name={APP_SCREENS.Permissoes}
            component={PermissoesScreen}
            options={{
                title: "Permissões",
            }} />

    </AppStack.Navigator>
);

const AppRoutesMenu: React.FC = () => {
    const { user } = useAuth()

    return (
        <Drawer.Navigator
            useLegacyImplementation={true}
            initialRouteName={APP_SCREENS.Abastecimentos}
            screenOptions={DrawerScreenOptions}
            drawerContent={(props: any) => <AppMenu {...props} />}>
            <Drawer.Screen
                name={APP_SCREENS.Menu}
                component={MenuScreen}
                options={{
                    title: "Menu",
                    drawerIcon: ({ color }: any) => <MaterialCommunityIcons name="menu" size={22} color={color} />
                }} />

            <Drawer.Screen
                name={APP_SCREENS.Abastecimentos}
                component={AbastecimentosScreen}
                options={{
                    title: "Abastecimentos",
                    drawerIcon: ({ color }) => <MaterialCommunityIcons name="gas-station-outline" size={22} color={color} />
                }} />

            {/* <Drawer.Screen
                name={APP_SCREENS.Tanques}
                component={TanquesScreen}
                options={{
                    title: "Tanques",
                    drawerIcon: ({ color }) => <MaterialCommunityIcons name="gas-station-outline" size={22} color={color} />
                }} /> */}

            {/* {!!user?.IsAdmin &&
                <Drawer.Screen
                    name={APP_SCREENS.Clientes}
                    component={ClientesScreen}
                    options={{
                        title: "Clientes",
                        drawerIcon: ({ color }: any) => <MaterialCommunityIcons name="account-multiple-outline" size={22} color={color} />
                    }} />
            } */}
        </Drawer.Navigator>
    );
};

export default AppRoutesFinal;