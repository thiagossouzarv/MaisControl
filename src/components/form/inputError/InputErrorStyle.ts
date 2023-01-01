import styled from "styled-components";
import { ThemeObject } from "../../../core/theme";
import { BaseText } from "../../core";

export const ErrorContainer = styled.View`
  align-items: center;
  opacity: ${({ error }: ThemeObject) => error ? "1" : "0"};
  flex-direction: row;
  margin: 0 7px 0 0px;
`;

export const ErrorText = styled(BaseText)`
  color: ${({ theme }: ThemeObject) => theme.input.fg.error};
  flex: 1;
  font-size: ${({ theme }: ThemeObject) => theme.metrics.text.p2}px;
  font-weight: bold;
  margin: 3px 0px 5px 10px;
  text-align: left;
`;