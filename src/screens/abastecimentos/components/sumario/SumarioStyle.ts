import styled from "styled-components/native"
import { Header4, Caption2 } from "../../../../components/core"
import { ThemeObject } from "../../../../core/theme"

export const Container = styled.View`
    padding: ${({ theme }: ThemeObject) => `${theme.metrics.spacing.md}px 0px`};
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
`

export const Info = styled.View`
    
`

export const Value = styled(Header4)`
    text-align: center;
    color: ${({ theme }: ThemeObject) => theme.colors.fg.main};
`

export const Label = styled(Caption2)`
    font-family: ${({ theme }: ThemeObject) => theme.fontFamilies.roboto};
    text-align: center;
    min-width: 120px;
`