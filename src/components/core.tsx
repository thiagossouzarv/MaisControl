import styled from "styled-components/native"
import { Dimensions, Platform } from "react-native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RouteProp } from "@react-navigation/native"
import { ThemeObject } from "../core/theme"

const { height } = Dimensions.get("window")

export const PageContainer = styled.View`
    background-color: ${({ theme }: ThemeObject) => theme.page.bg};
    padding: 0px ${({ theme }: ThemeObject) => theme.page.padding.horizontal}px;
    flex: 1;
`

export const PageContainerFull = styled(PageContainer)`
    min-height: ${height}px;
`

export const PageContainerLaterals = styled.View`
    padding-left: ${({ theme }: ThemeObject) => theme.page.padding.horizontal}px;
    padding-right: ${({ theme }: ThemeObject) => theme.page.padding.horizontal}px;
`

export const PageContainerVertical = styled.View`
    padding-top: ${({ theme }: ThemeObject) => theme.page.padding.vertical}px;
    padding-bottom: ${({ theme }: ThemeObject) => theme.page.padding.vertical}px;
`

export const PageFooter = styled.View`
    padding: ${({ theme }: ThemeObject) => `${theme.page.padding.vertical}px 0px`};
`

export const PageContainerTopPadding = styled.View`
    padding-top: ${({ theme }: ThemeObject) => theme.page.padding.vertical}px;
`

export const PageContainerBottomPadding = styled.View`
    padding-bottom: ${({ theme }: ThemeObject) => theme.page.padding.vertical}px;
`

export const FooterContainer = styled.View`
    display: ${({ theme, visible = true }: ThemeObject) => visible ? "flex" : "none"};
    padding: ${({ theme, noHorizontalPadding }: ThemeObject) => `${theme.page.padding.vertical}px ${noHorizontalPadding ? 0 : theme.page.padding.horizontal}px`};
`

export const Bold = styled.Text`
    font-weight: bold;
`

export const Highlight = styled(Bold)`
    color: ${({ theme }: ThemeObject) => theme.colors.fg.main};
`

export const HighlightDark = styled(Bold)`
    color: ${({ theme }: ThemeObject) => theme.colors.fg.main_dark};
`

const _FloatButtonSpace = styled.View`
    height: ${({ theme, visivel }: ThemeObject) => visivel ? "90px" : "0px"};
`
export const FloatButtonSpace = ({ visivel = true }: { visivel?: boolean }) => <_FloatButtonSpace visivel={visivel} />

export const Grow = styled.View`
    flex-grow: 1;
`

export interface PageBaseProps {
    navigation: NativeStackNavigationProp<any, any>;
    route: RouteProp<any, any>;
}


/* Tipografia
***********************************/

export const BaseText = styled.Text`
    font-family: ${({ theme }: ThemeObject) => theme.fonts.fontFamily};
`

//headers

export const Header1 = styled(BaseText)`
    color: ${({ theme }: ThemeObject) => theme.fonts.h1.fg};
    font-size: ${({ theme }: ThemeObject) => theme.fonts.h1.size}px;
    font-family: ${({ theme }: ThemeObject) => theme.fonts.h1.family};
    font-weight: ${({ theme }: ThemeObject) => theme.fonts.h1.weight};
`

export const Header2 = styled(BaseText)`
    color: ${({ theme }: ThemeObject) => theme.fonts.h2.fg};
    font-size: ${({ theme }: ThemeObject) => theme.fonts.h2.size}px;
    font-family: ${({ theme }: ThemeObject) => theme.fonts.h2.family};
    font-weight: ${({ theme }: ThemeObject) => theme.fonts.h2.weight};
`

export const Header3 = styled(BaseText)`
    color: ${({ theme }: ThemeObject) => theme.fonts.h3.fg};
    font-size: ${({ theme }: ThemeObject) => theme.fonts.h3.size}px;
    font-family: ${({ theme }: ThemeObject) => theme.fonts.h3.family};
    font-weight: ${({ theme }: ThemeObject) => theme.fonts.h3.weight};
`

export const Header4 = styled(BaseText)`
    color: ${({ theme }: ThemeObject) => theme.fonts.h4.fg};
    font-size: ${({ theme }: ThemeObject) => theme.fonts.h4.size}px;
    font-family: ${({ theme }: ThemeObject) => theme.fonts.h4.family};
    font-weight: ${({ theme }: ThemeObject) => theme.fonts.h4.weight};
`

export const Header5 = styled(BaseText)`
    color: ${({ theme }: ThemeObject) => theme.fonts.h5.fg};
    font-size: ${({ theme }: ThemeObject) => theme.fonts.h5.size}px;
    font-family: ${({ theme }: ThemeObject) => theme.fonts.h5.family};
    font-weight: ${({ theme }: ThemeObject) => theme.fonts.h5.weight};
`

export const Header6 = styled(BaseText)`
    color: ${({ theme }: ThemeObject) => theme.fonts.h6.fg};
    font-size: ${({ theme }: ThemeObject) => theme.fonts.h6.size}px;
    font-family: ${({ theme }: ThemeObject) => theme.fonts.h6.family};
    font-weight: ${({ theme }: ThemeObject) => theme.fonts.h6.weight};
`

//subtitles

export const Subtitle1 = styled(BaseText)`
    color: ${({ theme }: ThemeObject) => theme.fonts.s1.fg};
    font-size: ${({ theme }: ThemeObject) => theme.fonts.s1.size}px;
    font-family: ${({ theme }: ThemeObject) => theme.fonts.s1.family};
    font-weight: ${({ theme }: ThemeObject) => theme.fonts.s1.weight};
`

export const Subtitle2 = styled(BaseText)`
    color: ${({ theme }: ThemeObject) => theme.fonts.s2.fg};
    font-size: ${({ theme }: ThemeObject) => theme.fonts.s2.size}px;
    font-family: ${({ theme }: ThemeObject) => theme.fonts.s2.family};
    font-weight: ${({ theme }: ThemeObject) => theme.fonts.s2.weight};
`

//paragraphs

export const Paragraph1 = styled(BaseText)`
    color: ${({ theme }: ThemeObject) => theme.fonts.p1.fg};
    font-size: ${({ theme }: ThemeObject) => theme.fonts.p1.size}px;
    font-family: ${({ theme }: ThemeObject) => theme.fonts.p1.family};
    font-weight: ${({ theme }: ThemeObject) => theme.fonts.p1.weight};
`

export const Paragraph2 = styled(BaseText)`
    color: ${({ theme }: ThemeObject) => theme.fonts.p2.fg};
    font-size: ${({ theme }: ThemeObject) => theme.fonts.p2.size}px;
    font-family: ${({ theme }: ThemeObject) => theme.fonts.p2.family};
    font-weight: ${({ theme }: ThemeObject) => theme.fonts.p2.weight};
`

//captions

export const Caption1 = styled(BaseText)`
    color: ${({ theme }: ThemeObject) => theme.fonts.c1.fg};
    font-size: ${({ theme }: ThemeObject) => theme.fonts.c1.size}px;
    font-family: ${({ theme }: ThemeObject) => theme.fonts.c1.family};
    font-weight: ${({ theme }: ThemeObject) => theme.fonts.c1.weight};
`

export const Caption2 = styled(BaseText)`
    color: ${({ theme }: ThemeObject) => theme.fonts.c2.fg};
    font-size: ${({ theme }: ThemeObject) => theme.fonts.c2.size}px;
    font-family: ${({ theme }: ThemeObject) => theme.fonts.c2.family};
    font-weight: ${({ theme }: ThemeObject) => theme.fonts.c2.weight};
`

//labels

export const Label = styled(BaseText)`
    color: ${({ theme }: ThemeObject) => theme.fonts.lb.fg};
    font-size: ${({ theme }: ThemeObject) => theme.fonts.lb.size}px;
    font-family: ${({ theme }: ThemeObject) => theme.fonts.lb.family};
    font-weight: ${({ theme }: ThemeObject) => theme.fonts.lb.weight};
`

//link

export const Link = styled(BaseText)`
    font-size: ${({ theme }: ThemeObject) => theme.metrics.text.p1}px;
    font-family: ${({ theme }: ThemeObject) => theme.fonts.p1.family};
    font-weight: bold;
    color: ${({ color, theme }: ThemeObject) => color || theme.colors.fg.link};
    text-decoration: underline;
    text-decoration-color: ${({ color, theme }: ThemeObject) => color || theme.colors.fg.link};
`