import styled from "styled-components/native";
import { Header1, PageContainerFull, Paragraph1 } from "../../../../components/core";
import { ThemeObject } from "../../../../core/theme";

export const Container = styled(PageContainerFull)`
    justify-content: ${({ topo }: any) => topo ? "flex-start" : "center"};
    background-color: ${({ theme }: ThemeObject) => theme.login.bg.main};
`;

export const HeaderContainer = styled.View``;

export const Title = styled(Header1)`
    color: ${({ theme }: ThemeObject) => theme.login.fg.dark};
    font-weight: bold;
    text-align: center;
`;

export const TitleHighlight = styled(Title)`
    color: ${({ theme }: ThemeObject) => theme.colors.fg.main_dark};
`;

export const Info = styled(Paragraph1)`
    color: ${({ theme }: ThemeObject) => theme.login.fg.dark};
    margin-top: ${({ theme }: ThemeObject) => theme.metrics.spacing.md}px;
    text-align: center;
`;

export const Form = styled.View`
    margin-top: ${({ theme }: ThemeObject) => theme.metrics.spacing.xl}px;
`;

export const ActionContainer = styled.View`
    margin-top: ${({ theme }: ThemeObject) => theme.metrics.spacing.md}px;
`;