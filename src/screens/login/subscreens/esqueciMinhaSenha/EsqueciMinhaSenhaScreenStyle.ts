import styled from "styled-components/native"
import { Header3,  HighlightDark, PageContainerFull, Paragraph1 } from "../../../../components/core"
import { ThemeObject } from "../../../../core/theme";

export const Container = styled(PageContainerFull)`
    background-color: ${({ theme }: ThemeObject) => theme.login.bg.main};
    justify-content: ${({ topo }: ThemeObject) => topo ? "flex-start" : "center"};
    padding-bottom: ${({ topo, theme }: ThemeObject) => topo ? theme.metrics.spacing.md : theme.metrics.spacing.xl}px;
`

export const OrientationContainer = styled.View`
    align-items: center;
    justify-content: center;
    margin-bottom: ${({ theme }: ThemeObject) => theme.metrics.spacing.xl}px;
    margin-left: 20px;
    margin-right: 20px;
`;

export const Question = styled(Header3)`
    color: ${({ theme }: ThemeObject) => theme.login.fg.dark};
    text-align: center;
`;

export const TextHighlight = styled(HighlightDark)``;

export const Orientation = styled(Paragraph1)`
    color: ${({ theme }: ThemeObject) => theme.login.fg.dark};
    flex-shrink: 1;
    margin-top: ${({ theme }: ThemeObject) => theme.metrics.spacing.md}px;
    text-align: center;
`;

//#region FORM

export const Form = styled.View``;

export const ActionContainer = styled.View`
    margin-top: ${({ theme }: ThemeObject) => theme.metrics.spacing.md}px;
`;

//#endregion