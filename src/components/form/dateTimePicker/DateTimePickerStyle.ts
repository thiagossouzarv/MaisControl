import styled from "styled-components/native"
import { ThemeObject } from "../../../core/theme"

export const Wrap = styled.View``

export const Container = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    padding: ${({ theme }: ThemeObject) => `0px ${100 / 8 / 2}%`};
`