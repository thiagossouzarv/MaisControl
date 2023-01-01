import React from "react"
import { useTheme } from "styled-components/native"
import { AppTheme } from "../../../core/theme";

import * as UI from "./TagStyle"

interface TagProps {
    color?: string;
    children?: React.ReactNode;
    marker?: boolean;
    markerColor?: string;
    markerSpace?: number;
    mini?: boolean;
    grow?: boolean;
    style: object;
    textColor?: string;
    visible?: boolean;
}

const Tag: React.FC<TagProps> = ({
    color,
    children,
    marker = false,
    markerColor = "#FFF",
    markerSpace,
    mini = false,
    grow = false,
    style = {},
    textColor = "#FFF",
    visible = true,
}) => {

    const theme: AppTheme = useTheme()
    color = color || theme.colors.main
    markerSpace = markerSpace || theme.metrics.spacing.sm

    if (!visible) return null

    return (
        <UI.Container
            color={color}
            factor={mini ? 0.8 : 1}
            grow={grow ? 1 : 0}
            style={style}>
            {marker && <UI.Marker color={markerColor} mini={mini} space={markerSpace} />}
            <UI.Label
                color={textColor}
                grow={grow ? 1 : 0}
                mini={mini}>
                {children}
            </UI.Label>
        </UI.Container>
    )
}

export default Tag