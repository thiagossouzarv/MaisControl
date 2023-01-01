import React from "react"
import { useTheme } from "styled-components/native"
import { AppTheme } from "../../../../../core/theme";

import * as UI from "./MonthStyle"

interface MonthProps {
    month: number
    label: string
    onPress: (month: number) => void
    active: boolean
}

const Month: React.FC<MonthProps> = ({
    month,
    label,
    onPress,
    active
}) => {
    const theme: AppTheme = useTheme()

    return (
        <UI.Container onPress={() => onPress(month)}>
            {({ pressed }: any) => (
                <UI.MonthMarker style={{
                    backgroundColor: active ? theme.colors.main : pressed ? theme.colors.main_200 : "transparent"
                }}>
                    <UI.Label style={{
                        color: active ? "white" : theme.colors.fg.dark,
                    }}>
                        {label}
                    </UI.Label>
                </UI.MonthMarker>
            )}
        </UI.Container>
    )
}

export const EmptyRow: React.FC = () => {
    return (
        <UI.Container>
            <UI.MonthMarker>
                <UI.Label></UI.Label>
            </UI.MonthMarker>
        </UI.Container>
    )
}

export default React.memo(Month)