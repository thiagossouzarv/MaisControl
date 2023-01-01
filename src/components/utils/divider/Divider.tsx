import React from "react"
import styled, { useTheme } from 'styled-components/native'

import { Divider as DV } from "react-native-elements"
import { AppTheme, BackgroundColors, BasicMetrics, getBackgroundColor } from "../../../core/theme"

const GAPS = {
    xs: 3,
    sm: 5,
    md: 10,
    lg: 15,
    xl: 30
}

interface DividerProps {
    color?: BackgroundColors,
    vertical?: boolean,
    visible?: boolean,
    width?: number,
    gap?: BasicMetrics,
    gapMode?: "both" | "left" | "right" | "none",
    margin?: BasicMetrics,
    style?: object,
}

const Divider: React.FC<DividerProps> = ({
    color = "",
    vertical = false,
    visible = true,
    width,
    gap,
    gapMode = "both",
    margin = 0,
    style = {},
}) => {
    const theme: AppTheme = useTheme()
    const gapValue = gap ? GAPS[gap] : 0
    const marginValue = typeof margin === "string" ? theme.metrics.spacing[margin] : margin
    
    if (!visible) return null
    
    if (color) color = getBackgroundColor(color, theme)
    else color = theme.page.divider.bg
    if (!width) width = theme.page.divider.width

    return (
        <Container style={[{
            backgroundColor: vertical ? color : "transparent",
            paddingVertical: !vertical ? marginValue : 0,
            paddingHorizontal: vertical ? marginValue : 0,
            marginLeft: gapMode == "both" || gapMode == "left" ? gapValue + "%" : 0,
            marginRight: gapMode == "both" || gapMode == "right" ? gapValue + "%" : 0
        }, style]}>
            <DV
                color={color}
                orientation={vertical ? "vertical" : "horizontal"}
                width={width} />
        </Container>
    )
}

const Container = styled.View``

export default Divider