import styled from "styled-components/native";
import { ThemeObject } from "../../../core/theme";
import { Header4, Paragraph1 } from "../../core";

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme, variant, color }: ThemeObject) => variant === "full_page" ? color : theme.modal.bg};    
    justify-content: center;
    width: 100%;
    padding: ${({ theme }: ThemeObject) => theme.metrics.spacing.lg}px;
`;

export const Content = styled.View`
    background-color: ${({ theme, color }: ThemeObject) => color};
    border-radius: ${({ theme }: ThemeObject) => theme.modal.rounding}px;
`;

export const Header = styled.View`
    padding: ${({ theme }: ThemeObject) => `${theme.modal.header.padding.vertical}px ${theme.modal.header.padding.horizontal}px`};
    padding-bottom: 0px;
    border-top-left-radius: ${({ theme }: ThemeObject) => theme.metrics.rouding.md}px;
    border-top-right-radius: ${({ theme }: ThemeObject) => theme.metrics.rouding.md}px;
`;

export const Title = styled(Header4)`
    text-align: center;
    color: ${({ theme, color }: ThemeObject) => color};
    font-size: ${({ theme }: ThemeObject) => theme.modal.header.title.size}px;
    font-family: ${({ theme }: ThemeObject) => theme.modal.header.title.family};
    font-weight: ${({ theme }: ThemeObject) => theme.modal.header.title.weight};
`;

export const Body = styled.View`
    padding: ${({ theme }: ThemeObject) => `${theme.modal.body.padding.vertical}px ${theme.modal.body.padding.horizontal}px`};
`;

export const Label = styled(Paragraph1)`
    text-align: center;
    color: ${({ theme, variant }: ThemeObject) => variant === "full_page" ? "white" : theme.modal.body.text.fg};
    font-size: ${({ theme }: ThemeObject) => theme.modal.body.text.size}px;
    font-family: ${({ theme }: ThemeObject) => theme.modal.body.text.family};
    font-weight: ${({ theme }: ThemeObject) => theme.modal.body.text.weight};
`;

export const Footer = styled.View`
    justify-content: center;
    /* flex-direction: row; */
    padding: ${({ theme }: ThemeObject) => `${theme.modal.footer.padding.vertical}px ${theme.modal.footer.padding.horizontal}px`};
    /* padding-bottom: ${({ theme }: ThemeObject) => theme.metrics.spacing.md}px; */
`;


export const Button = styled.TouchableOpacity``

export const SubmitText = styled.Text`
    color: ${({ theme }: ThemeObject) => theme.modal.footer.button.fg.submit};
    font-size: ${({ theme }: ThemeObject) => theme.modal.footer.button.size}px;
    font-family: ${({ theme }: ThemeObject) => theme.modal.footer.button.family};
    font-weight: ${({ theme }: ThemeObject) => theme.modal.footer.button.weight};
`

export const CancelText = styled(SubmitText)`
    color: ${({ theme }: ThemeObject) => theme.modal.footer.button.fg.cancel};
`
