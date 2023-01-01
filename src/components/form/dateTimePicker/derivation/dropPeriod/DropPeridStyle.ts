import styled from "styled-components/native"
import { ThemeObject } from "../../../../../core/theme"
import { Highlight } from "../../../../core"

export const Container = styled.View``

export const DatePicker = styled(Highlight)`
    /* font-weight: normal; */
    color: ${({ theme }: ThemeObject) => theme.colors.fg.dark};
`

export const Separator = styled.Text`
    padding: ${({ theme }: ThemeObject) => `0px ${theme.metrics.spacing.md}px`};
    font-size: ${({ theme, variant }: ThemeObject) => variant === "fit" ? theme.fonts.p2.size : theme.input.fontSize}px;
    font-weight: normal;
    opacity: 0.7;
`

export const Content = styled.View`
    flex-direction: row;
    flex: 1;
`