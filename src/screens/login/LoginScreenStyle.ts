import styled from "styled-components/native"
import { BaseText, Caption1, Header1, PageContainerFull } from "../../components/core"
import { ThemeObject } from "../../core/theme"

export const Container = styled(PageContainerFull)`
    background-color: ${({ theme }: ThemeObject) => theme.login.bg.main};
    justify-content: ${({ begin }: ThemeObject) => begin ? "flex-start" : "center"};    
`

export const Header = styled.View``

export const Title = styled(Header1)`
    text-align: center;
    color: ${({ theme }: ThemeObject) => theme.login.fg.dark};
`

export const MessageContainer = styled.View`
    background-color: ${({ theme }: ThemeObject) => theme.login.bg.medium};
    padding: ${({ theme }: ThemeObject) => `${theme.metrics.spacing.md}px ${theme.metrics.spacing.lg}px`};
    border-radius: ${({ theme }: ThemeObject) => theme.metrics.rouding.md}px;
`

export const Message = styled(Caption1)`
    text-align: justify;
    color: ${({ theme }: ThemeObject) => theme.login.fg.dark};
`

export const Form = styled.View``

export const ActionContainer = styled.View`
    margin-top: 6px;
`

export const LinkContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

export const LinkText = styled(BaseText)`
    color: ${({ theme }: ThemeObject) => theme.login.fg.dark};
    text-align: center;
`

export const Link = styled.TouchableOpacity``;
export const LinkLabel = styled(BaseText)`
    color: ${({ theme }: ThemeObject) => theme.colors.fg.main_dark};
    font-weight: bold;
    padding: 8px 5px;
    text-decoration: underline;
    text-decoration-color: ${({ theme }: ThemeObject) => theme.colors.fg.main_dark};
`

export const Links = styled.View`
    margin-top: ${({ theme }: ThemeObject) => theme.metrics.spacing.lg}px;
`

export const LinkAlternate = styled(Link)`
    background-color: rgba(255,255,255,0.1);
    border-radius: ${({ theme }: ThemeObject) => theme.metrics.rouding.md}px;
`;
export const LinkLabelAlternate = styled(LinkLabel)`
    color: "${({ theme }: ThemeObject) => theme.login.fg.dark}";
    font-weight: normal;
    text-align: center;
    text-decoration: none;
`;