import styled from "styled-components/native"
import { ThemeObject } from "../../../core/theme"
import { Subtitle1, Paragraph2 } from "../../core"

export const Container = styled.View`
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    padding: ${({ theme }: ThemeObject) => `0px ${theme.metrics.spacing.xl * .9}px`};
`

export const Title = styled(Subtitle1)`
    text-align: center;
    font-family: ${({ theme }: ThemeObject) => theme.fontFamilies.roboto};
    color: ${({ theme }: ThemeObject) => theme.colors.fg.dark};
`

export const Message = styled(Paragraph2)`
    color: ${({ theme }: ThemeObject) => theme.colors.fg.light};
    font-weight: normal;
    font-family: ${({ theme }: ThemeObject) => theme.fontFamilies.roboto};
    text-align: center;
`