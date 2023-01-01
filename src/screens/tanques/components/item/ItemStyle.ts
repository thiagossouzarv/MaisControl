import styled from "styled-components/native"
import { Caption2, Subtitle2 } from "../../../../components/core"
import { ListItemSubtitle, ListItemInfo2 } from "../../../../components/form"
import { ThemeObject } from "../../../../core/theme"

export const Container = styled.View`
`

export const Content = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
`

export const Title = styled(Subtitle2)`
    color: ${({ theme }: ThemeObject) => theme.colors.basic};    
`

export const Subtitle = styled(ListItemSubtitle)``

export const Info = styled.View`
    justify-content: space-between;    
    align-items: center;
    width: ${100 / 3}%;
`

export const Label = styled(Caption2)`
    color: ${({ theme }: ThemeObject) => theme.colors.basic_600};
    text-align: center;
`

export const Value = styled(Subtitle2)`
    color: ${({ theme }: ThemeObject) => theme.colors.basic_600};
    font-weight: normal;
`