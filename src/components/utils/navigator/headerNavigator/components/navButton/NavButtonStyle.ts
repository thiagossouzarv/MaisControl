import styled from "styled-components/native"
import { ThemeObject } from "../../../../../../core/theme"

export const Container = styled.View`
    padding: ${({ theme }: ThemeObject) => `${theme.metrics.spacing.md}px ${theme.metrics.spacing.xl}px`};
`