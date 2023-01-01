import React from "react"
import { useTheme } from "styled-components/native"
import { AppTheme } from "../../../core/theme";
import Icon from "../icon/Icon";


import * as UI from "./StatusIconStyle"

export type StatusIconType = "success" | "error"

interface StatusIconProps {
    type: StatusIconType;
    size?: number;
}

const StatusIcon: React.FC<StatusIconProps> = ({
    type,
    size,
}) => {
    const theme: AppTheme = useTheme()

    const variants = {
        success: {
            color: theme.colors.fg.success,
            type: "checkmark-circle-outline",
            source: "ionicon",
            label: "Sucesso!"
        },
        error: {
            color: theme.colors.fg.error,
            type: "alert-circle-outline",
            source: "ionicon",
            label: "Opps!"
        }
    }

    const icon = variants[type]

    return (
        <UI.Container>
            <Icon            
                iconSize={size || theme.metrics.icon.lg}
                icon={icon.type}
                iconSource={icon.source}
                color={icon.color} />

            <UI.Label style={{ color: icon.color }}>
                {icon.label}
            </UI.Label>
        </UI.Container>
    )
}

export default StatusIcon
