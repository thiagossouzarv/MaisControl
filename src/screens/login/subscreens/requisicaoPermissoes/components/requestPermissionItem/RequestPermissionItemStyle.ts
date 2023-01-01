import styled from "styled-components";
import { Paragraph2, Subtitle1, Link as Lnk, Caption1, Caption2 } from "../../../../../../components/core";
import { ThemeObject } from "../../../../../../core/theme";

export const Container = styled.Pressable`
    background-color: ${({ theme }: ThemeObject) => theme.login.bg.medium};
    padding: ${({ theme }: ThemeObject) => `${theme.metrics.spacing.md}px ${theme.metrics.spacing.lg}px`};
    margin: ${({ theme }: ThemeObject) => theme.metrics.spacing.md}px 0px;
    border-radius: ${({ theme }: ThemeObject) => theme.metrics.spacing.md}px;
`;

export const Title = styled(Subtitle1)`
    color: ${({ theme }: ThemeObject) => theme.login.fg.dark};
    margin-bottom: ${({ theme }: ThemeObject) => theme.metrics.spacing.md}px;
`;

export const Message = styled(Caption2)`
    color: ${({ theme }: ThemeObject) => theme.login.fg.dark};
    text-align: justify;
`;

export const Footer = styled.View`
    margin-top: ${({ theme }: ThemeObject) => theme.metrics.spacing.md}px;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
`;

export const Link = styled.TouchableOpacity``;
export const LinkLabel = styled(Lnk).attrs(({ theme }: ThemeObject) => ({
    color: theme.colors.info_700
}))`
    font-size: ${({ theme }: ThemeObject) => theme.fonts.c1.size}px;
    padding: 0px 5px;
`;