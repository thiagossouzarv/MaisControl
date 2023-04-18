import styled from "styled-components/native"
import { Icon } from "react-native-elements";
import { ThemeObject } from "../../../../core/theme";

export const Container = styled.View`
    flex-direction: row;
`

export const Info = styled.View`
    flex: 1;
`

export const StatusIcon = styled(Icon).attrs(({ color, icon, size, source }: ThemeObject) => ({
    color,
    name: icon,
    size,
    type: source,
}))``;