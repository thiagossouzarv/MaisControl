import React from "react";
import { View, StyleSheet  } from "react-native";
import { useTheme } from "styled-components/native"
import { AppTheme, BasicMetrics, BasicTheme } from "../../../core/theme";

interface SeparatorProps {
    gap?: BasicMetrics | number,
    gapFactor?: number,
    vertical?: boolean,
    visible?: boolean,
    grow?: boolean,
    line?: boolean,
}

const Separator: React.FC<SeparatorProps> = ({
    gap = "md",
    gapFactor = 1,
    vertical = false,
    visible = true,
    grow = false,
    line = false,
}) => {
    const theme: AppTheme = useTheme()

    if (!visible) return null;

    const distance = typeof gap === "number" ? gap : Number(theme.metrics.spacing[gap]) * gapFactor

    const styles = StyleSheet.create({
        normal: {
            height: vertical ? 1 : distance,
            width: vertical ? distance : 1,
            flexGrow: grow ? 1 : 0,
        },
        line: {
            height: 1,
            backgroundColor: 'gray',
            marginVertical: 10,
        }
    });

    return (
        <View style={line? styles.line : styles.normal} />
    );
    
}



export default Separator;