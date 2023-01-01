import styled from "styled-components/native"
import { Caption2 } from "../../../../../../../../components/core"
import { ThemeObject } from "../../../../../../../../core/theme"

export const Container = styled.View`
    padding: ${({ theme }: ThemeObject) => `${theme.metrics.spacing.xs}px ${theme.metrics.spacing.sm}px`};
    flex-direction: row;
    align-items: center;
`

export const Label = styled(Caption2)``