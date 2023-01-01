import styled from "styled-components/native"
import { ThemeObject } from "../../../../../../../core/theme"

export const Container = styled.View`
    padding: ${({ theme }: ThemeObject) => `${theme.modal.footer.padding.vertical}px ${theme.modal.footer.padding.horizontal}px`};
    padding-top: 0px;
    flex-direction: row;
    justify-content: flex-end;
`