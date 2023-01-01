import styled from "styled-components/native"
import { ThemeObject } from "../../../core/theme"

export const Container = styled.TouchableOpacity`
    padding: ${({ theme }: ThemeObject) => `${theme.metrics.spacing.md}px ${theme.metrics.spacing.lg}px`};
`

export const Label = styled.Text`
    color: ${({ theme }: ThemeObject) => theme.modal.footer.button.fg.submit};
    font-size: ${({ theme }: ThemeObject) => theme.modal.footer.button.size}px;
    font-family: ${({ theme }: ThemeObject) => theme.modal.footer.button.family};
    font-weight: ${({ theme }: ThemeObject) => theme.modal.footer.button.weight};
`