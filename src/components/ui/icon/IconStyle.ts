import styled from "styled-components/native";

import { Icon } from "react-native-elements";
import { Label as LB } from "../../core";
import { ThemeObject } from "../../../core/theme";

export const Container = styled.View`
    align-items: center;
    justify-content: center;
`;

export const IconContainer = styled.Pressable`
    align-items: center;
    background-color: ${({ color }: ThemeObject) => color};
    border: 1px solid ${({ borderColor }: ThemeObject) => borderColor};
    border-radius:  ${({ size }: ThemeObject) => (size / 2)}px;
    height: ${({ size }: ThemeObject) => size}px;
    justify-content: center;
    width: ${({ size }: ThemeObject) => size}px;
`;

export const IconBackground = styled.View`
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    border-radius: 500px;
`

export const StatusIcon = styled(Icon).attrs(({ color, icon, size, source }: ThemeObject) => ({
    color,
    name: icon,
    size,
    type: source,
}))``;

export const LabelContainer = styled.View`
    background-color: ${({ backgroundColor }: ThemeObject) => backgroundColor};
    border-radius: ${({ theme }: ThemeObject) => theme.metrics.rouding.md}px;
    padding: 0px ${({ theme }: ThemeObject) => theme.metrics.rouding.md}px;
`;

export const Label = styled(LB)`
    color: ${({ color }: ThemeObject) => color};
    font-size: ${({ small, theme }: ThemeObject) => small ? theme.metrics.text.c1 : theme.metrics.text.p1}px;
`;