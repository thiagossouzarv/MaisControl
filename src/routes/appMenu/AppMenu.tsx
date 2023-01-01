import React, { useRef } from "react";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { useTheme } from "styled-components/native"

import * as UI from "./AppMenuStyle";
import { Ionicons } from '@expo/vector-icons';
import useTrackingMounting from "../../hooks/core/useTrackingMounting";
import { useAuth } from "../../contexts/auth";
import { Messager, MessagerAction, MessagerHandler, MessagerHandleSubmit, MessagerLabel } from "../../components/dialogs";
import { Bold } from "../../components/core";
import { Divider } from "../../components/utils";
import { AppTheme } from "../../core/theme";

const ACTIONS = {
    signOut: {
        code: "sign-out",
        message: <MessagerLabel>Você deseja realmente <Bold>deslogar</Bold> do aplicativo?</MessagerLabel>
    } as MessagerAction
}

const AppMenu: React.FC = (props: any) => {
    const theme: AppTheme = useTheme()
    const { signOut, user } = useAuth();
    const { execSafe } = useTrackingMounting();
    const _messager = useRef<MessagerHandler>();

    const deslogar = () => {
        try {
            signOut();
        } catch (error: any) {
            execSafe(() => _messager.current?.setError(error?.userMessage || "Falha ao deslogar."));
        }
    };

    const askSignout = () => {
        _messager.current?.ask(ACTIONS.signOut);
    };

    const handleSubmit: MessagerHandleSubmit = (type, action) => {
        if (type === "error") return

        if (action?.code === ACTIONS.signOut.code) deslogar()
    }

    return (
        <UI.Container>
            <DrawerContentScrollView {...props}
                contentContainerStyle={{
                    backgroundColor: theme.statusbar.bg
                }}>

                <UI.Header>
                    <UI.Background
                        source={require("../../assets/images/menu-bg.jpg")}
                        style={{ padding: 20 }}>
                        {/* <UI.Avatar source={require("../../assets/images/user-profile.jpg")} /> */}
                        <UI.Logo source={require("../../assets/images/logo-full-alternate.png")} />
                        <UI.Title>{user?.Nome}</UI.Title>
                        <UI.Subtitle>{user?.Empresa?.Nome?.trim()}</UI.Subtitle>
                    </UI.Background>
                </UI.Header>

                <UI.ListContainer>
                    <DrawerItemList {...props} />
                </UI.ListContainer>
            </DrawerContentScrollView>

            <Divider />

            <UI.Footer>
                <MenuItem
                    onPress={askSignout}
                    title="Sair"
                    icon={<Ionicons name="exit-outline" size={24} color={theme.colors.main} />} />
            </UI.Footer>

            <Messager
                ref={_messager}
                handleSubmit={handleSubmit} />
        </UI.Container>
    )
}

interface MenuItemProps {
    title: string;
    icon: any;
    onPress: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
    title,
    icon,
    onPress
}) => {
    return (
        <UI.MenuItemContainer onPress={onPress}>
            {icon}
            <UI.Label>{title}</UI.Label>
        </UI.MenuItemContainer>
    );
};

export default AppMenu;