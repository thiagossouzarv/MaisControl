import styled from "styled-components/native"
import { ThemeObject } from "../../../../../core/theme"
import { Caption1 } from "../../../../core"

export const Container = styled.Pressable`    
    width: ${100 / 3}%;
    align-items: center;
    justify-content: center;
    padding: ${({ theme }: ThemeObject) => `${theme.metrics.spacing.sm}px 0px`};
`

export const MonthMarker = styled.View`
    padding: ${({ theme }: ThemeObject) => `${theme.metrics.spacing.sm}px 0px`};
    width: 40px;
    align-items: center;
    justify-content: center;
    border-radius: ${({ theme }: ThemeObject) => theme.metrics.rouding.sm}px;
`

export const Label = styled(Caption1)`
    font-weight: bold;
    color: ${({ theme }: ThemeObject) => theme.colors.fg.dark};
`