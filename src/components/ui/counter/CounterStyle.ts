import styled from "styled-components/native"
import { ThemeObject } from "../../../core/theme"
import { Caption2, Header3 } from "../../core"

export const Container = styled.View`
    align-items: center;
`

export const Value = styled(Header3)``

export const Label = styled(Caption2)`
    font-size: ${({ theme }: ThemeObject) => theme.fonts.c2.size * 0.9}px;
    opacity: 0.85;
`