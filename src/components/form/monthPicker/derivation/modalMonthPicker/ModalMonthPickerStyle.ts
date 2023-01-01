import styled from "styled-components/native"
import { ThemeObject } from "../../../../../core/theme"

export const Container = styled.View`
    background-color: ${({ theme }: ThemeObject) => theme.modal.bg};
    flex: 1;
    justify-content: center;
`

export const Card = styled.View`
    background-color: white;
    margin: ${({ theme }: ThemeObject) => `${theme.modal.margin.vertical}px ${theme.modal.margin.horizontal}px`};
    border-radius: ${({ theme }: ThemeObject) => theme.modal.rounding}px;
    border: 1px solid ${({ theme }: ThemeObject) => theme.colors.basic_200};    
`