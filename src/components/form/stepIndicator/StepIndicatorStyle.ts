import styled from "styled-components/native"
import { ThemeObject } from "../../../core/theme"

export const Container = styled.View`
    bottom: 0px;
    right: 0px;
    padding: ${({ theme }: ThemeObject) => theme.metrics.spacing.md}px;
`


