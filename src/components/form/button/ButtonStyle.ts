import styled from "styled-components"
import { ThemeObject } from "../../../core/theme"
import { BaseText } from "../../core"

export const Container = styled.TouchableOpacity`
    height: ${({ theme, sizeFactor }: ThemeObject) => theme.button.minHeight * sizeFactor}px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: ${({ type, variant, theme, disabled }: ThemeObject) => disabled ? theme.colors.bg.light : theme.button.bg[variant][type] };
    border-radius: ${({ theme, rouding }: ThemeObject) => rouding ? 100 : theme.button.rouding}px;
    border: ${({ theme, variant, type, borderColor }: ThemeObject) => `1.5px ${variant === "dashed" ? "dotted" : "solid"} ${borderColor ? borderColor : ["outline", "dashed"].some(item  => item === variant) ? theme.colors.basic_300 : theme.button.bg[variant][type]}` };
    padding: ${({ theme, sizeFactor }: ThemeObject) => `${theme.button.padding.vertical * sizeFactor}px ${theme.button.padding.horizontal * sizeFactor}px`}; 
    flex-grow: ${({ grow }: ThemeObject) => grow ? 1 : 0};
`

export const Label = styled(BaseText)`
    color: ${({ theme, type, disabled, variant, color }: ThemeObject) => disabled ? theme.colors.fg.light : (color ? color : theme.button.fg[variant][type])};
    text-transform: ${({ theme }: ThemeObject) => theme.button.uppercase ? "uppercase" : "none"};    
    font-size: ${({ theme, sizeFactor }: ThemeObject) => theme.button.fontSize * sizeFactor}px;
    font-weight: ${({ theme }: ThemeObject) => theme.button.bold ? "bold" : "normal"};
`

export type ButtonType = "submit" | "basic" | "info" | "error"