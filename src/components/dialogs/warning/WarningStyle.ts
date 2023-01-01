import styled from "styled-components/native";
import { ThemeObject } from "../../../core/theme";
import { BaseText } from "../../core";

export const Container = styled.View`
    align-items: center;
    background-color: ${({ theme }: ThemeObject) => theme.dialogs.warning.bg};
    flex-direction: row;
    padding: ${({ theme }: ThemeObject) => `${theme.dialogs.warning.padding.vertical}px ${theme.dialogs.warning.padding.horizontal}px`};
`;

export const Message = styled(BaseText)`
    color: ${({ theme }: ThemeObject) => theme.dialogs.warning.message.fg};
    font-size: ${({ theme }: ThemeObject) => theme.dialogs.warning.message.size}px;
    flex: 1;
    font-weight: bold;
    text-align: center;
`;