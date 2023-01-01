import { DrawerNavigationOptions } from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationOptions, NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Icon } from "react-native-elements";
import { BasicTheme } from "../core/theme";

export const AppHeaderStyle = {
    headerShadowVisible: false,
    headerStyle: {
        backgroundColor: BasicTheme.header.bg.primary,
    },
    headerTitleStyle: {
        color: BasicTheme.header.title.fg.primary,
        fontFamily: BasicTheme.header.title.family
    },
    headerTransparent: false,
    headerTintColor: "white",
}

interface OptProps {
    navigation: NativeStackNavigationProp<any, any>;
    route: RouteProp<any, any>;
}

export default ({ navigation, route }: OptProps): NativeStackNavigationOptions => ({
    animation: "slide_from_right",
    animationTypeForReplace: "pop",

    headerShown: true,

    headerLeft: () => (
        <Icon
            color={BasicTheme.header.title.fg.primary}
            containerStyle={{
                marginRight: 15,
            }}
            name="md-chevron-back"
            onPress={() => {
                switch (route.name) {
                    // case APP_SCREENS.AceiteSolicitacaoTroca:
                    //     const aba: string | undefined = route.params.requestScreen;
                    //     if (aba) navigation.navigate("Tabs", {
                    //         screen: APP_SCREENS.Plantoes,
                    //         params: { aba }
                    //     });
                    //     else navigation.goBack();
                    //     break;
                    // case APP_SCREENS.FormularioCheckin:
                    //     if (route.params.requestScreen === APP_SCREENS.Plantoes) navigation.goBack();
                    //     else navigation.navigate(APP_SCREENS.Escala);
                    //     break;
                    default:
                        navigation.goBack();
                        break;
                }
            }}
            size={28}
            type="ionicon"
        />
    ),

    ...AppHeaderStyle
    
});

export const DrawerScreenOptions: DrawerNavigationOptions = {
    drawerActiveBackgroundColor: BasicTheme.colors.main,
    drawerActiveTintColor: "white",
    drawerInactiveTintColor: "#444",
    drawerLabelStyle: {
        marginLeft: -25,
        //fontFamily: 'Roboto-Medium',
        fontSize: 15,
        fontWeight: "bold",
    },
    
    ...AppHeaderStyle
}