import styled from "styled-components/native"
import { ThemeObject } from "../../../../../../core/theme"

export const Container = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    padding: ${({ theme }: ThemeObject) => `0px ${theme.metrics.spacing.lg - theme.metrics.spacing.xs}px`}
`