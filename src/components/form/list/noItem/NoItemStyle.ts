import styled from "styled-components/native"
import { ThemeObject } from "../../../../core/theme"
import { Paragraph1 } from "../../../core"

export const Container = styled.View`
    flex-direction: row;
    align-items: center;
    padding: ${({ theme }: ThemeObject) => `${theme.metrics.spacing.md}px ${theme.metrics.spacing.md}px`};
    background-color: ${({ theme }: ThemeObject) => theme.colors.error_200};
    border-radius: ${({ theme }: ThemeObject) => theme.metrics.rouding.md}px;
`

export const Warn = styled(Paragraph1)`
    color: ${({ theme }: ThemeObject) => theme.colors.error};
    padding-left: ${({ theme }: ThemeObject) => theme.metrics.spacing.md}px;
`