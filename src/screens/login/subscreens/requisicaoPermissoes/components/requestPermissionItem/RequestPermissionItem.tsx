import React from "react"
import { useTheme } from "styled-components/native"

import * as UI from "./RequestPermissionItemStyle"
import Tag from "../../../../../../components/ui/tag/Tag"
import { AppTheme } from "../../../../../../core/theme"


interface RequestPermissionItemProps {
    title: string
    message: string
    disabled: boolean
    permissionEnabled: boolean
    request: (() => Promise<void>) | null
    openSettings: (() => any) | null
}

const RequestPermissionItem: React.FC<RequestPermissionItemProps> = ({
    title,
    message,
    disabled,
    permissionEnabled,
    request,
    openSettings,
}) => {

    const theme: AppTheme = useTheme()

    async function requisitarPermissao() {
        if (disabled) {
            if (openSettings) openSettings()

        } else if (request) await request()
    }

    return (
        <UI.Container
            // disabled={disabled || permissionEnabled}
            onPress={requisitarPermissao} >
            <UI.Title>{title}</UI.Title>
            <UI.Message>{message}</UI.Message>

            <UI.Footer>
                <Tag
                    color={permissionEnabled ? theme.colors.success : disabled ? theme.colors.error : theme.colors.error}
                    style={{ alignSelf: "center" }}
                    mini
                    marker>
                    {permissionEnabled ? "ativo" : disabled ? "bloqueado" : "inativo"}
                </Tag>

                {!permissionEnabled &&
                    <UI.Link
                        // disabled={disabled}
                        onPress={requisitarPermissao} >
                        <UI.LinkLabel>
                            {disabled ? "abrir configurações" : "clique para ativar"}
                        </UI.LinkLabel>
                    </UI.Link>
                }
            </UI.Footer>
        </UI.Container>
    )
}

export default React.memo(RequestPermissionItem)