import styled from "styled-components/native";

import { CheckBox } from "react-native-elements";
import { ThemeObject } from "../../../core/theme";

export const Container = styled.Pressable``;

export const Check = styled(CheckBox).attrs(({ children, fit = false, dark, theme }: ThemeObject) => ({
    checkedColor: dark ? theme.colors.fg.main_dark : theme.colors.fg.main,
    title: children,

    containerStyle: {
        backgroundColor: "transparent",
        borderWidth: 0,
        margin: 0,
        ...(fit ? { padding: 0 } : {})
    },
    textStyle: {
        color: theme.colors.fg.main,
    }
}))``;