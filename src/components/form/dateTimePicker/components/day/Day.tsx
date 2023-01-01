import React, { useEffect } from "react"
import { useTheme } from "styled-components/native"
import { AppTheme } from "../../../../../core/theme"

import * as UI from "./DayStyle"

interface DayProps {
    dia: number,
    isMonthDay: boolean,
    isToday: boolean,
    active: boolean,
    onPress: (data: number) => void,
    outOfLimits: boolean
}

const Day: React.FC<DayProps> = ({
    dia,
    isMonthDay,
    isToday,
    active,
    onPress,
    outOfLimits
}) => {
    const theme: AppTheme = useTheme()
    
    return (
        <UI.Container 
            disabled={!isMonthDay || outOfLimits}
            onPress={() => onPress(dia)}>
            {({ pressed }: any) => (
                <>
                    <UI.DayMarker style={{
                        backgroundColor: active ? theme.colors.main : pressed ? theme.colors.main_200 : "transparent"
                    }}>
                        <UI.Label style={{ 
                            color: outOfLimits ? theme.colors.basic_300 : active ? "white" : isMonthDay ? (isToday ? theme.colors.info : theme.colors.fg.dark) : theme.colors.basic_300,
                            fontWeight: isMonthDay ? "bold" : "normal"
                        }}>
                            {dia}
                        </UI.Label>
                    </UI.DayMarker>
                </>
            )}
        </UI.Container>
    )
}

export const EmptyRow: React.FC = () => {
    return (
        <UI.Container>
            <UI.DayMarker>
                <UI.Label></UI.Label>
            </UI.DayMarker>
        </UI.Container>
    )
}

export default React.memo(Day)