import styled from "styled-components/native"
import { PageContainer, PageContainerLaterals, Subtitle1, Header1, Bold } from "../../components/core"

export const Container = styled(PageContainer)`
    padding-left: 0px;
    padding-right: 0px;
    flex-direction: row;
`

export const Main = styled.View`
    flex: 1;
`

export const Content = styled(PageContainerLaterals)`
    background-color: transparent;
`

export const Subtitle = styled(Subtitle1)``

export const Header = styled(Header1)``

export const NavIcons = styled.View`
    flex-direction: row;
`

export const ActionContainer = styled.View`
    margin-top: 6px;
`

export const Detalhes = styled.View`
    margin-top: 20px;
    background-color: #ffffcc; /* Define a cor de fundo como amarelo claro */
    color: #000; /* Define a cor do texto como preto */
    padding: 20px; /* Adiciona um espaçamento interno ao elemento */
    border: 1px solid #999; 
    
`

export const PapelCortadoTriangulo1 = styled.View`
  position: absolute;
  top: -20px;
  left: -20px;
  border-style: solid;
  border-width: 20px;
  border-color: #ccc transparent transparent transparent;
  transform: rotate(-180deg);
`;

export const PapelCortadoTriangulo2 = styled.View`
  position: absolute;
  bottom: -20px;
  right: -20px;
  border-style: solid;
  border-width: 20px;
  border-color: transparent transparent #ccc transparent;
  transform: rotate(-180deg);
`;

