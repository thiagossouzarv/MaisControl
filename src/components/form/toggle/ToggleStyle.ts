import styled from "styled-components/native";
import { ThemeObject } from "../../../core/theme";
import { Paragraph1 } from "../../core";

export const Container = styled.Pressable`    
    border-radius: ${({ theme }: ThemeObject) => theme.metrics.spacing.sm}px;

    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0px ${({ theme }: ThemeObject) => theme.metrics.spacing.lg}px;
`;

export const Label = styled(Paragraph1)`
    color: ${({ theme }: ThemeObject) => theme.colors.fg.light};
`;

export const Toggle = styled.Switch.attrs(({ theme }: ThemeObject) => ({
    thumbColor: theme.colors.basic_100,
    trackColor: {
        true: theme.colors.info,
        false: theme.colors.basic_200
    }
}))``;