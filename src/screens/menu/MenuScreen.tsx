import React, { useRef } from "react"
import { useTheme } from "styled-components/native"
import { Bold, PageBaseProps } from "../../components/core"
import { Messager, MessagerAction, MessagerHandler, MessagerHandleSubmit, MessagerLabel } from "../../components/dialogs"
import { ListItem } from "../../components/form"
import { AppScrollView } from "../../components/utils"
import { useAuth } from "../../contexts/auth"
import { AppConfig } from "../../core/config"
import { AppTheme } from "../../core/theme"
import useTrackingMounting from "../../hooks/core/useTrackingMounting"
import { APP_SCREENS } from "../../routes/screens"

import * as UI from "./MenuScreeenStyle"

const ACTIONS = {
    signOut: {
        code: "sign-out",
        message: <MessagerLabel>Deseja realmente <Bold>sair</Bold> da sua <Bold>conta</Bold>?</MessagerLabel>,
        submitButton: "Sim"
    } as MessagerAction
}

const MenuScreen: React.FC<PageBaseProps> = ({ navigation }) => {
    const theme: AppTheme = useTheme()
    const { execSafe } = useTrackingMounting()
    const { signOut } = useAuth()

    const _messager = useRef<MessagerHandler>()

    const deslogar = () => {
        try {
            signOut()

        } catch (error: any) {
            execSafe(() => _messager.current?.setError(error?.userMessage || "Falha ao deslogar do aplicativo."))
        }
    }

    const handleSignOut = () => {
        _messager.current?.ask(ACTIONS.signOut)
    }

    const handleSubmit: MessagerHandleSubmit = (type, action) => {
        if (type === "error") return

        if (action?.code === ACTIONS.signOut.code) deslogar()

    }

    return (
        <UI.Container>
            <AppScrollView>
                {/* <ListItem
                    icon="key-outline"
                    iconSource="ionicon"
                    title="Alterar Senha"
                    subtitle={"Defina uma nova senha de acesso"}
                    onPress={() => navigation.navigate(APP_SCREENS.AlterarSenha)} /> */}

                {/* <ListItem
                    icon="lock-closed-outline"
                    iconSource="ionicon"
                    title="Permissões"
                    subtitle={AppConfig.auth.bioAuthentication ? "Autenticação biométrica" : "Controle as permissões do app"}
                    onPress={() => navigation.navigate(APP_SCREENS.Permissoes)} /> */}

                <ListItem
                    icon="log-out-outline"
                    iconSource="ionicon"
                    title="Sair"
                    subtitle="Deslogar da conta"
                    iconColor={theme.colors.danger_400}
                    onPress={handleSignOut} />

                <Messager
                    ref={_messager}
                    handleSubmit={handleSubmit} />
            </AppScrollView>
        </UI.Container>
    )
}

export default MenuScreen