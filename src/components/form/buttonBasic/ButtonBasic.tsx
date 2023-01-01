import React from "react"
import { useTheme } from "styled-components/native"
import { AppTheme, ForegroundColors, getForegroundColor } from "../../../core/theme"

import * as UI from "./ButtonBasicStyle"

interface ButtonBasicProps {
    onPress: () => void,
    label: string,
    color?: ForegroundColors,
    horizontalFlat?: boolean
}

const ButtonBasic: React.FC<ButtonBasicProps> = ({
    onPress,
    label,
    color,
    horizontalFlat = false
 }) => {
    const theme: AppTheme = useTheme()

    const _color = color ? getForegroundColor(color, theme) : theme.colors.fg.main

    return (
        <UI.Container 
            onPress={onPress}
            style={horizontalFlat ? { paddingLeft: theme.metrics.spacing.sm, paddingRight: theme.metrics.spacing.sm } : {} }>
            <UI.Label style={{ color: _color }}>
                {label}
            </UI.Label>
        </UI.Container>
    )
}

export default React.memo(ButtonBasic)