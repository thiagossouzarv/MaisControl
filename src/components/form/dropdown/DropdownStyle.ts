import styled from "styled-components/native"
import { ThemeObject } from "../../../core/theme"
import { Caption2, Paragraph1, Paragraph2 } from "../../core"
import { Icon as AppIcon } from "../../ui"

export const Container = styled.TouchableOpacity`
    padding: ${({ theme }: ThemeObject) => `0px ${theme.page.padding.horizontal}px`};
`

export const Content = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: ${({ theme, variant }: ThemeObject) => variant === "fit" ? "flex-start" : "space-between"};
    padding: ${({ theme }: ThemeObject) => `${theme.metrics.spacing.mdl}px 0px`};
    
`

export const TextContainer = styled.View`  
    flex-direction: ${({ theme, variant }: ThemeObject) => variant === "fit" ? "row" : "column"};  
    flex: ${({ theme, variant }: ThemeObject) => variant === "fit" ? "none" : 1 };
    flex-shrink: 1;
    align-items: ${({ theme, variant }: ThemeObject) => variant === "fit" ? "center" : "flex-start"};
`

export const Placeholder = styled(Paragraph1)`
    font-size: ${({ theme, variant }: ThemeObject) => variant === "fit" ? theme.fonts.p2.size : theme.input.fontSize}px;
    color: ${({ theme, error, variant }: ThemeObject) => !error && variant === "fit" ? theme.colors.fg.dark :  theme.input.placeholder.fg[error ? "error" : "default"]};
    flex-shrink: 1;
    flex-grow: ${({ theme, variant }: ThemeObject) => variant === "fit" ? 1 : 0};
    font-weight: bold;
`

export const Text = styled(Paragraph1)`
    font-size: ${({ theme, variant }: ThemeObject) => variant === "fit" ? theme.fonts.p2.size : theme.input.fontSize}px;
    color: ${({ theme, error, variant }: ThemeObject) => !error && variant === "fit" ? theme.colors.fg.dark : theme.input.fg[error ? "error" : "default"]};
    flex: 1;
    font-weight: bold;
`

export const Label = styled(Paragraph2)`
    min-width: ${({ theme, minWidth }: ThemeObject) => minWidth ? minWidth + "px" : "auto"}; 
`

export const PlusItens = styled(Caption2)`
    font-size: ${({ theme }: ThemeObject) => theme.input.fontSize}px;
`

export const Divider = styled.View`
    height: 1px;
    background-color: ${({ theme, error }: ThemeObject) => theme.input.border.bg[error ? "error" : "default"]};
`

export const Icon = styled(AppIcon).attrs(({ theme, error, variant }: ThemeObject) => ({
    color: error ? theme.input.icon.bg.error : variant === "fit" ? theme.colors.fg.light :theme.colors.fg.dark
}))`    
    font-size: ${({ theme }: ThemeObject) => theme.input.icon.size}px;
    opacity: 0.8;
`


export const InputContainer = styled.View`
  background-color: ${({ error, disabled, theme }: ThemeObject) => 
    error ? theme.input.bg.error
    : (disabled 
        ? theme.input.bg.disabled 
        : theme.input.bg.default)};
  border: ${({ error, disabled, theme }: ThemeObject) => 
    `${theme.input.border.size}px solid ${ 
        disabled ? theme.input.border.bg.disabled 
        : error ? theme.input.border.bg.error 
            : theme.input.border.bg.default}`};
  border-radius: ${({ theme }: ThemeObject) => theme.input.border.rouding}px;
  padding: ${({ theme }: ThemeObject) => 
    `${theme.input.padding.vertical}px ${theme.input.padding.horizontal}px`};
  padding-left: ${({ iconButton, theme }: ThemeObject) => 
    iconButton ? theme.input.padding.horizontal : 13}px;
`;