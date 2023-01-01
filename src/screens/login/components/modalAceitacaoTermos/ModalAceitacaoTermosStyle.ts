import styled from "styled-components/native";
import { Header5, PageContainer, PageFooter, Paragraph1, Paragraph2, Link as Lnk } from "../../../../components/core";
import { ThemeObject } from "../../../../core/theme";

export const Container = styled(PageContainer)`
    background-color: ${({ theme }: ThemeObject) => theme.login.bg.main};
`;

export const Header = styled.View`
    padding: ${({ theme }: ThemeObject) => theme.metrics.spacing.md * 0}px;
`;

export const Title = styled(Header5)`
    color: ${({ theme }: ThemeObject) => theme.login.fg.dark};
    text-align: center;
`;

export const Subtitle = styled(Paragraph1)`
    color: ${({ theme }: ThemeObject) => theme.login.fg.dark};
    text-align: center;
    opacity: 0.7;
    margin-top: ${({ theme }: ThemeObject) => theme.metrics.spacing.xs}px;
`;

export const Content = styled.View``;

export const Link = styled.TouchableOpacity`
    padding: ${({ theme }: ThemeObject) => theme.metrics.spacing.xs}px;
    align-self: center;
    border-radius: ${({ theme }: ThemeObject) => theme.metrics.spacing.md}px;
    margin-top: ${({ theme }: ThemeObject) => theme.metrics.spacing.lg}px;
    margin-bottom: ${({ theme }: ThemeObject) => theme.metrics.spacing.md}px;
`;

export const LinkText = styled(Lnk)`
    text-align: center;
`;

export const Label = styled(Paragraph2)`
    color: ${({ theme }: ThemeObject) => theme.login.fg.dark};
    text-align: center;
    font-weight: bold;
`;

export const CheckContainer = styled.View`
    align-items: center;
    justify-content: center;
`;

export const Footer = styled(PageFooter)``;