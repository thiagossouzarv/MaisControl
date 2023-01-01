import styled from "styled-components/native"
import { ThemeObject } from "../../../core/theme"

export const Container = styled.View`
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme, white }: ThemeObject) => white ? "white" : "rgba(255,255,255,0.5)"};
    z-index: 999;
`

export const Loader = styled.ActivityIndicator.attrs(({ theme }: ThemeObject) => ({
    color: theme.colors.main_600,
    size: 45
}))``