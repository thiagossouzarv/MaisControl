import styled from "styled-components/native"
import { ThemeObject } from "../../../../core/theme"
import Div from "../../../utils/divider/Divider"

export const Container = styled.Pressable`
    background-color: ${({ pressed, theme }: ThemeObject) => pressed ? theme.list.item.bg.pressed : theme.list.item.bg.default};
    flex-direction: row;
    align-items: center;    
`

export const AvatarContainer = styled.View`
    margin-left: ${({ theme }: ThemeObject) => theme.list.item.padding.horizontal}px; 
    margin-right: ${({ theme }: ThemeObject) => theme.metrics.spacing.md}px; 
    margin-top: ${({ theme }: ThemeObject) => theme.metrics.spacing.md}px;
    margin-bottom: ${({ theme }: ThemeObject) => theme.metrics.spacing.md}px;   
`

export const IconContainer = styled.View`
    width: ${({ theme }: ThemeObject) => theme.metrics.icon.sm}px;
    margin-right: ${({ theme }: ThemeObject) => theme.metrics.spacing.lg}px;
    align-items: center;
    justify-content: center;
    padding: ${({ theme }: ThemeObject) => `${theme.list.item.padding.vertical}px 0px`};
    margin-left: ${({ theme }: ThemeObject) => theme.list.item.padding.horizontal}px;
`

export const Main = styled.View`
    flex: 1;
    align-self: stretch;
`

export const Content = styled.View`
    flex-grow: 1; 
    flex-direction: row;
    align-items: center;
    padding: ${({ theme }: ThemeObject) => `${theme.list.item.padding.vertical}px ${theme.list.item.padding.horizontal}px`};
    padding-left: 0;    
`

export const InnerContent = styled.View`
    flex: 1;
`

export const DividerContainer = styled.View`
    flex-direction: row;
`

export const Divider = styled(Div).attrs({
    gap: 'sm',
})``

export const Toggle = styled.Switch.attrs(({ theme }: ThemeObject) => ({
    thumbColor: theme.colors.basic_100,
    trackColor: {
        true: theme.colors.info,
        false: theme.colors.basic_200
    },
}))``;

export const SelectedMarker = styled.View`
    position: absolute;
    right: ${({ theme }: ThemeObject) => theme.metrics.spacing.md}px;
    top: ${({ theme }: ThemeObject) => theme.metrics.spacing.md}px;
    bottom: ${({ theme }: ThemeObject) => theme.metrics.spacing.md}px;
    background-color: ${({ theme }: ThemeObject) => theme.colors.main};
    border-radius: ${({ theme }: ThemeObject) => theme.metrics.rouding.md}px;
    width: 3px;
`