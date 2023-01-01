import styled from "styled-components/native"
import { ThemeObject } from "../../../../../core/theme"

export const Container = styled.View`
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color: white;
    border-radius: ${({ theme }: ThemeObject) => theme.modal.rounding}px;
`

export const Card = styled.View`
    flex: 1;
    border-radius: ${({ theme }: ThemeObject) => theme.modal.rounding}px;    
`