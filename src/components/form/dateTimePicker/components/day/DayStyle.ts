import styled from "styled-components/native"
import { ThemeObject } from "../../../../../core/theme"
import { Caption2 } from "../../../../core"

const CIRCLE_SIZE = 35

export const Container = styled.Pressable`
    width: ${100 / 7}%;
    padding: ${({ theme }: ThemeObject) => `${theme.metrics.spacing.xs}px 0px`};
    align-items: center;
    justify-content: center;
`

export const DayMarker = styled.View`
    width: ${CIRCLE_SIZE}px;
    height: ${CIRCLE_SIZE}px;
    border-radius: ${CIRCLE_SIZE}px;
    align-items: center;
    justify-content: center;
`

export const Label = styled(Caption2)`
    text-align: center;
    font-weight: bold;
`