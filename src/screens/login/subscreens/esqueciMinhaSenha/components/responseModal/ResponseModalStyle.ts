import styled from "styled-components/native"
import { PageContainerFull, Paragraph1 } from "../../../../../../components/core"
import { ThemeObject } from "../../../../../../core/theme"

export const Container = styled(PageContainerFull)`
    background-color: ${({ theme }: ThemeObject) => theme.login.bg.main};
    justify-content: center;
    padding-bottom: ${({ theme }: ThemeObject) => theme.metrics.spacing.xl * 3}px;
`

export const StatusContainer = styled.View`
    margin-bottom: ${({ theme }: ThemeObject) => theme.metrics.spacing.xl}px;
`

export const Message = styled(Paragraph1)`
    text-align: center;
    color: ${({ theme }: ThemeObject) => theme.login.fg.dark};
`

export const MailContainer = styled.TouchableOpacity`
    align-items: center;
    background-color: ${({ theme }: ThemeObject) => theme.colors.basic_transparent_200};
    border-radius: ${({ theme }: ThemeObject) => theme.metrics.rouding.md}px;
    margin: ${({ theme }: ThemeObject) => theme.metrics.spacing.md}px;
    padding: ${({ theme }: ThemeObject) => `${theme.metrics.spacing.lg}px ${theme.metrics.spacing.md}px`};
`

export const Mail = styled(Paragraph1)`
    color: ${({ theme }: ThemeObject) => theme.colors.main};
`