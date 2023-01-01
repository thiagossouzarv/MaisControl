import styled from "styled-components/native";

import { Icon } from "react-native-elements";
import MaskInput from 'react-native-mask-input';
import { ThemeObject } from "../../../core/theme";

export const Container = styled.View`
    margin: 0px;
    padding: 0px;
`;

export const InputContainer = styled.View`
  background-color: ${({ error, disabled, theme }: ThemeObject) => 
    error ? theme.input.bg.error
    : (disabled 
        ? theme.input.bg.disabled 
        : theme.input.bg.default)};
  border: ${({ error, disabled, theme }: ThemeObject) => 
    `${theme.input.border.size}px solid ${ 
        disabled ? theme.input.border.bg.disabled 
        : error ? theme.input.border.bg.error 
            : theme.input.border.bg.default}`};
  border-radius: ${({ theme }: ThemeObject) => theme.input.border.rouding}px;
  padding: ${({ theme }: ThemeObject) => 
    `${theme.input.padding.vertical}px ${theme.input.padding.horizontal}px`};
  padding-left: ${({ iconButton, theme }: ThemeObject) => 
    iconButton ? theme.input.padding.horizontal : 13}px;
`;

export const Main = styled.View`
    align-items: ${({ multiline }: ThemeObject) => multiline ? "flex-start" : "center"};
    flex-direction: row;
`;

export const InputIcon = styled(Icon).attrs(({ iconName, source, error, disabled, theme }: ThemeObject) => ({
    color: error ? theme.input.icon.bg.error 
        : disabled ? theme.input.icon.bg.disabled 
        : theme.input.icon.bg.default,
    name: iconName,
    size: theme.input.icon.size,
    type: source,
    disabled: false,
}))`
    background-color: transparent;
    margin-right: 9px;
    width: 26px;
`;

export const Input = styled(MaskInput).attrs(({ error, disabled, theme }: ThemeObject) => ({
    editable: !disabled,
    placeholderTextColor: error ? theme.input.placeholder.fg.error 
        : disabled ? theme.input.placeholder.fg.disabled 
        : theme.input.placeholder.fg.default,
}))`
    color: ${({ error, disabled, theme }: ThemeObject) => error ? theme.input.fg.error 
        : disabled ? theme.input.fg.disabled 
        : theme.input.fg.default};
    flex: 1;  
    font-size: ${({ theme }: ThemeObject) => theme.input.fontSize}px;
    min-height: ${({ theme }: ThemeObject) => theme.input.minHeight}px;
`;

export const ClearButton = styled(Icon).attrs(({ error, disabled, theme }: ThemeObject) => ({
    color: error ? theme.input.icon.bg.error 
        : disabled ? theme.input.icon.bg.disabled 
        : theme.input.icon.bg.default,
    name: "x",
    size: theme.input.icon.size,
    type: "feather",

    containerStyle: {
        marginLeft: theme.metrics.spacing.md,
    },
    iconStyle: {
        padding: 3,
    },
    disabled: false,
}))``;

export const IconButton = styled(Icon).attrs(({ iconName, error, disabled, theme }: ThemeObject) => ({
    color: error ? theme.input.icon.bg.error 
        : disabled ? theme.input.icon.bg.disabled 
        : theme.input.icon.bg.default,
    name: iconName,
    size: 20,
    type: "feather",

    containerStyle: {
        marginLeft: 12,
    },
    iconStyle: {
        padding: 2,
    }
}))``;