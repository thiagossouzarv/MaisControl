import styled from "styled-components/native"
import { PageContainer, PageContainerLaterals, Subtitle1 } from "../../components/core"

export const Container = styled(PageContainer)`
    padding-left: 0px;
    padding-right: 0px;
    flex-direction: row;
`

export const Main = styled.View`
    flex: 1;
`

export const Content = styled(PageContainerLaterals)``

export const Subtitle = styled(Subtitle1)``

export const NavIcons = styled.View`
    flex-direction: row;
`