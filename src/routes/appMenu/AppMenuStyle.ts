import styled from "styled-components/native"
import { Subtitle2, Paragraph1, Subtitle1 } from "../../components/core";
import { ThemeObject } from "../../core/theme";

export const Container = styled.View`
    flex: 1;
`;

export const Header = styled.View``;

export const Background = styled.ImageBackground.attrs({
    resizeMode: "cover"
})`
    padding: 20px;
`;

export const Avatar = styled.Image`
    width: 80px;
    height: 80px;
    border-radius: 40px;
    margin-bottom: 10px;
`;

export const LogoContainer = styled.View`
    background-color: white;
    align-items: center;
    justify-content: center;
`;

export const Logo = styled.Image.attrs({
    resizeMode: "center"
})`
    width: 180px;
    height: 90px;
    margin-bottom: 10px;
`;

export const Title = styled(Subtitle1)`
    color: white;
`;

export const Subtitle = styled(Subtitle2)`
    font-weight: bold;
    text-transform: uppercase;
    color: white;
`;

export const ListContainer = styled.View`
    flex: 1;
    background-color: white;
    padding-top: ${({ theme }: ThemeObject) => theme.metrics.spacing.md}px;
`;

export const Footer = styled.View`
    background-color: ${({ theme }: ThemeObject) => theme.colors.bg.light};
    padding: ${({ theme }: ThemeObject) => theme.metrics.spacing.sm}px 0px;
`;



/**
 *  MenuItem
 *******************************************/

export const MenuItemContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    padding: ${({ theme }: ThemeObject) => `${theme.metrics.spacing.md}px ${theme.metrics.spacing.lg}px`};
`;

export const Label = styled(Paragraph1)`
    margin-left: ${({ theme }: ThemeObject) => theme.metrics.spacing.sm * 1.5}px;
`;