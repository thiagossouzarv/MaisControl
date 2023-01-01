import React from "react";
import { View } from "react-native";
import { useTheme } from "styled-components/native"
import { AppTheme, BasicMetrics, BasicTheme } from "../../../core/theme";

interface SeparatorProps {
    gap?: BasicMetrics | number,
    gapFactor?: number,
    vertical?: boolean,
    visible?: boolean,
    grow?: boolean,
}

const Separator: React.FC<SeparatorProps> = ({
    gap = "md",
    gapFactor = 1,
    vertical = false,
    visible = true,
    grow = false,
}) => {
    const theme: AppTheme = useTheme()

    if (!visible) return null;

    const distance = typeof gap === "number" ? gap : Number(theme.metrics.spacing[gap]) * gapFactor

    return (
        <View style={{
            height: vertical ? 1 : distance,
            width: vertical ? distance : 1,
            flexGrow: grow ? 1 : 0
        }} />
    );
}

export default Separator;