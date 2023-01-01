import React from "react"
import { useTheme } from "styled-components/native"
import { AppTheme, BasicMetrics, ForegroundColors, getForegroundColor } from "../../../core/theme";

import * as UI from "./CounterStyle"

const SIZE_FACTOR = {
    xs: 0.7,
    sm: 0.8,
    md: 0.9,
    lg: 1,
    xl: 1.1
} 

interface CounterProps {
   value: number | string;
   label: string;
   color?: ForegroundColors;
   size?: BasicMetrics;
   labelWidth?: number | "auto";
   alignment: "center" | "flex-start" | "flex-end"
}

const Counter: React.FC<CounterProps> = ({
    value,
    label,
    color,
    size = "md",
    labelWidth = "auto",
    alignment = "center"
}) => {
    const theme: AppTheme = useTheme()
    const _color = color ? getForegroundColor(color, theme) : theme.colors.fg.dark
    const _factor = SIZE_FACTOR[size]

    return (
        <UI.Container>
            <UI.Value style={{
                color: _color,
                fontSize: theme.fonts.h4.size * _factor,
            }}>
                {value}
            </UI.Value>
            <UI.Label style={{
                color: _color,
                fontSize: theme.fonts.c2.size * 0.9 * _factor,
                width: labelWidth,
                texAlign: "center",
                alignSelf: alignment
            }}>
                {label}
            </UI.Label>
        </UI.Container>
    )
}

export default Counter