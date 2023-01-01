import styled from "styled-components/native"
import { ThemeObject } from "../../../../../core/theme"
import { Paragraph1 } from "../../../../core"

export const Container = styled.View``

export const Label = styled(Paragraph1)`
    color: ${({ theme }: ThemeObject) => theme.colors.fg.main};
    font-weight: bold;
    text-align: center;
`