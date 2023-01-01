import React, { useCallback, useEffect, useRef, useState } from "react"
import { useTheme } from "styled-components/native"
import { AppState, RefreshControl } from "react-native"
import { Bold, PageBaseProps } from "../../../../components/core"
import Messager, { MessagerHandler } from "../../../../components/dialogs/messager/Messager"
import { AppScrollView, PageLoading, Separator } from "../../../../components/utils"
import { useAuth } from "../../../../contexts/auth"
import { usePermissions } from "../../../../contexts/permissions"
import useTrackingMounting from "../../../../hooks/core/useTrackingMounting"
import { AUTH_SCREENS } from "../../../../routes/screens"

import * as UI from "./RequisicaoPermissoesScreenStyle"
import { AppTheme } from "../../../../core/theme"
import { Icon } from "../../../../components/ui"
import { Button } from "../../../../components/form"
import RequestPermissionItem from "./components/requestPermissionItem/RequestPermissionItem"
import { AppConfig } from "../../../../core/config";

const APP_REQUIRED_PERMISSIONS = AppConfig.permissions.required

const RequisicaoPermissoesScreen: React.FC<PageBaseProps> = ({
    navigation,
}) => {

    const { execSafe } = useTrackingMounting()
    const { requiredPermissionsAllEnabled, location, notifications, updateAllPermissionStatus, setIgnorePermissions } = usePermissions()
    const { isSigned } = useAuth()
    const theme: AppTheme = useTheme()

    const _messager = useRef<MessagerHandler>()

    const [carregando, setCarregando] = useState(true)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(function requisitarNotificacao() {
        const requisitar = async () => {
            try {
                if (APP_REQUIRED_PERMISSIONS.some(r => r == "notifications") && notifications.request)
                    notifications?.request()?.catch(error => { })
            } catch (error) { }
        }

        requisitar()
    }, [])

    useEffect(function monitorarStatusLogin() {
        if (!isSigned) navigation.navigate(AUTH_SCREENS.Login)
    }, [isSigned])

    const atualizarStatusPermissoes = useCallback(async () => {
        try {
            setRefreshing(true)
            setCarregando(true)
            if (!location.updateStatus || !notifications.updateStatus) throw new Error()

            const { success } = await updateAllPermissionStatus()

            if (!success) throw new Error()

        } catch (error: any) {
            execSafe(() => _messager.current?.setError(error.userMessage || "Falha ao atualizar status das permissões."))

        } finally {
            execSafe(() => {
                setRefreshing(false)
                setCarregando(false)
            })
        }
    }, [location, notifications])

    const atualizarStatusPermissoesOnChangeAppStatus = useCallback((appStatus: string) => {
        if (appStatus.toLowerCase() === "active") atualizarStatusPermissoes()

    }, [atualizarStatusPermissoes])

    useEffect(function monitorarStatusForeground() {
        const listener = AppState.addEventListener('change', atualizarStatusPermissoesOnChangeAppStatus)

        return () => listener.remove()
    }, [])

    useEffect(function carregarTela() {
        atualizarStatusPermissoes()
    }, [])

    const requisitarPermissaoLocalizacao = useCallback(async () => {
        try {
            if (!location.request) throw new Error()

            setCarregando(true)
            await location.request()

        } catch (error: any) {
            execSafe(() => {
                _messager.current?.setError(error.userMessage || "Falha ao obter permissão de localização.")
            })

        } finally {
            execSafe(() => setCarregando(false))
        }
    }, [location?.request])

    function forceOpenApp() {
        setIgnorePermissions(true)
    }

    return (
        <UI.Container>
            <AppScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        colors={[theme.colors.fg.main_dark]}
                        onRefresh={atualizarStatusPermissoes} />
                }>
                <UI.Main>
                    <UI.Header>
                        <Icon
                            icon="shield-key"
                            iconSource="material-community"
                            color={theme.login.icon.fg}
                            iconSize={theme.metrics.icon.xl} />

                        <Separator />

                        <UI.Title>Requisição de <Bold style={{ color: theme.colors.fg.main_dark }}>Permissões</Bold></UI.Title>
                    </UI.Header>

                    <UI.Content>
                        <UI.Message>Prezado usuário, para melhor uso do aplicativo <Bold>recomendamos</Bold> o <Bold>consentimento prévio</Bold> das seguintes <Bold>permissões</Bold>:</UI.Message>

                        {APP_REQUIRED_PERMISSIONS.some(r => r == "notifications") &&
                            <RequestPermissionItem
                                title="Avisos de Notificação"
                                message="Usado para enviar mensagens relacionadas as atividades desempenhadas pelo profissional por meio do aplicativo."
                                disabled={true}
                                permissionEnabled={notifications.enabled}
                                request={notifications.openDeviceSettings}
                                openSettings={notifications.openDeviceSettings} />
                        }

                        {APP_REQUIRED_PERMISSIONS.some(r => r == "location") &&
                            <RequestPermissionItem
                                title="Localização"
                                message="Usado para confirmação da localização do aparelho no momento de cada checkin realizado."
                                disabled={!location.canRequest}
                                permissionEnabled={location.enabled}
                                request={requisitarPermissaoLocalizacao}
                                openSettings={location.openDeviceSettings} />
                        }
                    </UI.Content>
                </UI.Main>
            </AppScrollView>

            <UI.Action>
                <Button
                    type="submit"
                    icon="login"
                    iconFont="ant-design"
                    loading={false}
                    onClick={forceOpenApp}
                    rounding>
                    {requiredPermissionsAllEnabled ? "Entrar no app" : "Ignorar e entrar no app"}
                </Button>
            </UI.Action>

            {/* <AppDivider color={AppColors.primaryLighterer} />
            <UI.Footer onPress={navegarParaPaginaTiraDuvidas}>
                <UI.Warn>
                    Problemas para habilitar as permissões?
                </UI.Warn>

                <UI.Link onPress={navegarParaPaginaTiraDuvidas} >
                    <UI.LinkLabel>
                        clique aqui
                    </UI.LinkLabel>
                </UI.Link>
            </UI.Footer> */}

            <Messager ref={_messager} />
            <PageLoading visible={carregando} />
        </UI.Container>
    )
}

export default RequisicaoPermissoesScreen