import styled from "styled-components/native";

import { Icon } from "react-native-elements";
import { Header4, Header5 } from "../../core";
import { ThemeObject } from "../../../core/theme";

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: ${({ fit, noMarging }: any) => noMarging ? "0px" : fit ? "10px 0px 20px 0px" : "0 0 0px 0"};  
`;

export const LoginIcon = styled(Icon).attrs(({ size }: any) => ({
  color: "white",
  name: "leaf",
  size,
  type: "font-awesome",
}))``;

export const Content = styled.View``

export const Title = styled(Header4)`
  color: ${({ theme }: ThemeObject) => theme.colors.main};
  font-size: ${({ size }: any) => size}px;
`;

export const TitleHighlight = styled(Header5)`
    color: ${({ theme }: ThemeObject) => theme.colors.basic};
    padding-left: ${({ theme }: ThemeObject) => theme.metrics.spacing.xl * 1.3}px;
    line-height: ${({ size }: any) => size}px;
    font-size: ${({ size }: any) => size}px;
    font-style: italic;
    font-weight: bold;
`;