import styled from "styled-components/native"
import { ThemeObject } from "../../../../../core/theme"
import { BaseText } from "../../../../core"
import { Icon } from "../../../../ui"
import { Platform } from 'react-native';

export const Container = styled.View`
    flex-direction: row;
    padding: ${({ theme }: ThemeObject) => Platform.OS == 'ios'? theme.metrics.spacing.lg + 20: theme.metrics.spacing.md}px 0px;
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