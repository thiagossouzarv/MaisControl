import styled from "styled-components/native"
import { ThemeObject } from "../../../../../core/theme"
import { BaseText } from "../../../../core"
import { Icon } from "../../../../ui"

export const Container = styled.View`
    flex-direction: row;
    padding: ${({ theme }: ThemeObject) => `${theme.metrics.spacing.md}px ${theme.metrics.spacing.md * 1.2}px`};
    padding-bottom: ${({ theme }: ThemeObject) => theme.metrics.spacing.lg * .7}px;
    align-items: center;
    background-color: ${({ theme }: ThemeObject) => theme.header.bg.primary};
`

export const Title = styled(BaseText)`
    font-family: ${({ theme }: ThemeObject) => theme.header.title.family};
    color: ${({ theme }: ThemeObject) => theme.header.title.fg.primary};
    font-size: ${({ theme }: ThemeObject) => theme.header.title.size}px;
`

export const BackIcon = styled(Icon).attrs(({ theme }: ThemeObject) => ({
    color: theme.header.title.fg.primary,
}))``