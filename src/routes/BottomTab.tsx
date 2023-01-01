import React from "react"
import { useTheme } from "styled-components/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { MateriaisScreen, MenuScreen } from "../screens"
import { Icon } from "react-native-elements"
import { APP_SCREENS } from "./screens"
import { useAuth } from "../contexts/auth"
import { AppHeaderStyle } from "./screenOptions"
import { AppTheme } from "../core/theme"

const BottomTab = createBottomTabNavigator()

export default function BottomTabNavigator() {
    const theme: AppTheme = useTheme()
    const { user } = useAuth()
    const isAdminUser = !!user?.isAdmin

    return (
        <BottomTab.Navigator
            initialRouteName="Checkin"
            screenOptions={{
                unmountOnBlur: true,

                ...AppHeaderStyle,

                tabBarActiveBackgroundColor: theme.bottomNavigation.bg.primary,
                tabBarInactiveBackgroundColor: theme.bottomNavigation.bg.secondary,
                tabBarActiveTintColor: theme.bottomNavigation.fg.primary,
                tabBarInactiveTintColor: theme.bottomNavigation.fg.secondary,
                tabBarIconStyle: {
                    color: theme.colors.fg.dark,
                },
                tabBarStyle: {
                    //height: Platform.OS == 'ios' ? 85 : 60,
                    elevation: 0,
                },
                tabBarItemStyle: {
                    paddingVertical: 4,//6
                },
            }}
        >
            <BottomTab.Screen
                name={APP_SCREENS.Materiais}
                component={MateriaisScreen}
                options={{
                    title: "Materiais",
                    tabBarIcon: ({ color }) => <TabBarIcon name="all-inbox" type="material" color={color} />,
                }} />
            <BottomTab.Screen
                name={APP_SCREENS.Menu}
                component={MenuScreen}
                options={{
                    title: "Menu",
                    tabBarIcon: ({ color }) => <TabBarIcon name="menu" color={color} />,
                }} />
        </BottomTab.Navigator>
    )
}

interface TabBarIconProps {
    color: string
    name: string
    type?: string
}

function TabBarIcon({ color, name, type = "material-community" }: TabBarIconProps) {
    return (
        <Icon
            color={color}
            name={name}
            size={23}
            type={type}
        />
    )
}