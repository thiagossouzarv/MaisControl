import styled from "styled-components/native"
import { Header4, PageContainerFull, Paragraph1, Paragraph2, Link as Lnk, PageContainerTopPadding } from "../../../../components/core"
import { ThemeObject } from "../../../../core/theme";

export const Container = styled(PageContainerFull)`
    background-color: ${({ theme }: ThemeObject) => theme.login.bg.main};
    justify-content: space-between;
`

export const Main = styled(PageContainerTopPadding)``

export const Header = styled.View`
    width: 100%;
    margin-bottom: ${({ theme }: ThemeObject) => theme.metrics.spacing.xs}px;
`;

export const Title = styled(Header4)`
    color: ${({ theme }: ThemeObject) => theme.login.fg.dark};
    text-align: center;
`;

export const Content = styled.View`
    width: 100%;
    padding: ${({ theme }: ThemeObject) => `${theme.metrics.spacing.md}px 0px`};
`;

export const Message = styled(Paragraph1)`
    color: ${({ theme }: ThemeObject) => theme.login.fg.dark};
    text-align: justify;
    margin-bottom: ${({ theme }: ThemeObject) => theme.metrics.spacing.md}px;
`;

export const Action = styled.View`
    padding: ${({ theme }: ThemeObject) => `${theme.metrics.spacing.md}px 0px`};
`;

export const Footer = styled.Pressable`
    background-color: ${({ theme }: ThemeObject) => theme.colors.fg.light};
    padding: ${({ theme }: ThemeObject) => `${theme.metrics.spacing.md}px 0px`};
`;

export const Warn = styled(Paragraph2)`
    text-align: center;
    color: ${({ theme }: ThemeObject) => theme.colors.fg.light};
    padding: 0 ${({ theme }: ThemeObject) => theme.metrics.spacing.xl}px;
`;

export const Link = styled.TouchableOpacity`
    padding: ${({ theme }: ThemeObject) => `${theme.metrics.spacing.md}px ${theme.metrics.spacing.xl}px`};
    padding-top: ${({ theme }: ThemeObject) => theme.metrics.spacing.md}px;
    border-radius: ${({ theme }: ThemeObject) => theme.metrics.spacing.md}px;
`;

export const LinkLabel = styled(Lnk)`
  text-align: center;
`;