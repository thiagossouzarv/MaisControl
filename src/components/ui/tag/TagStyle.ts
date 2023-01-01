import styled from "styled-components/native";
import { Icon } from "react-native-elements";
import { ThemeObject } from "../../../core/theme";
import { BaseText } from "../../core";

export const Container = styled.View`
    align-items: center;
    align-self: flex-start;
    background-color: ${({ color }: any) => color};
    border-radius: ${({ theme }: ThemeObject) => theme.metrics.rouding.xl}px;
    flex-direction: row;
    flex-grow: ${({ grow }: any) => grow};
    flex-shrink: 1;
    padding: ${({factor, theme}: ThemeObject) => factor * theme.metrics.spacing.sm}px ${({factor, theme}: ThemeObject) => factor * theme.metrics.spacing.md}px;
`;

export const Marker = styled(Icon).attrs(({ color, mini, space, theme }: ThemeObject) => ({
    color: color || "#FFF",
    name: "circle",
    size: mini ? theme.metrics.text.c2 * 0.8 : theme.metrics.text.c1,
    type: "font-awesome",

    containerStyle: {
        marginRight: space,
    }
}))`
`;

export const Label = styled(BaseText)`
    color: ${({ color }: any) => color};
    font-size: ${({ mini, theme }: ThemeObject) => mini ? theme.metrics.text.c2 * 0.8 : theme.metrics.text.c1}px;
    flex-grow:  ${({ grow }: any) => grow};
    flex-shrink: 1;
    font-weight: bold;
    text-align: center;
`;