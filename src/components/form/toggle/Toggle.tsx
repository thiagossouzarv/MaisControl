import React, { useLayoutEffect, useState } from "react"
import { useTheme } from "styled-components/native"
import { AppTheme } from "../../../core/theme"

import * as UI from "./ToggleStyle"

interface ToggleProps {
    label: string
    onChange: (value: boolean) => void
    disabled?: boolean
    beginChecked?: boolean
    fullWidth?: boolean
    background?: boolean
    containerStyle?: object
}

const Toggle: React.FC<ToggleProps> = ({
    label,
    onChange,
    disabled = false,
    beginChecked = false,
    fullWidth = true,
    background = true,
    containerStyle = {}
}) => {
    const theme: AppTheme = useTheme()
    const [enabled, setEnabled] = useState(false)

    useLayoutEffect(function atualizarEstadoInicial() {
        setEnabled(beginChecked)
    }, [beginChecked])

    useLayoutEffect(function repassarValor() {
        onChange(enabled)
    }, [enabled])

    return (
        <UI.Container
            style={[{
                flexGrow: fullWidth ? 1 : 0,
                backgroundColor: background ? theme.colors.bg.light : "transparent"
            }, containerStyle]}
            onPress={() => {
                if (!disabled) setEnabled((value: boolean) => !value)}
            }>
            <UI.Label>
                {label}
            </UI.Label>

            <UI.Toggle
                disabled={disabled}
                onValueChange={setEnabled}
                value={enabled} />
        </UI.Container>
    )
}

export default React.memo(Toggle)