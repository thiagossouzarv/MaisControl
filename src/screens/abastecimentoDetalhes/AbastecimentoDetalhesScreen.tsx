import React, { useEffect, useRef, useState } from "react"
import { PageBaseProps } from "../../components/core"
import { MessagerHandler, Messager } from "../../components/dialogs"
import { Divider, PageLoading, Separator } from "../../components/utils"
import useTrackingMounting from "../../hooks/core/useTrackingMounting"
import * as UI from "./AbastecimentoDetalhesScreenStyle"
import { FixedButton, InfoLabel} from "../../components/form"
import EstoqueService, { Abastecimento } from "../../services/business/estoque"
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';


interface AbastecimentoDetalhesScreenProps extends PageBaseProps { }


const AbastecimentoDetalhesScreen: React.FC<PageBaseProps> = ({
    route,
    navigation
}) => {

    return (
        <AbastecimentosPage navigation={navigation} route={route} />
    )
}


const AbastecimentosPage: React.FC<AbastecimentoDetalhesScreenProps> = ({
    navigation,
    route
}) => {
    const { execSafe } = useTrackingMounting()

    const _messager = useRef<MessagerHandler>()


    const [carregandoPagina, setCarregandoPagina] = useState(true)
    const [carregando, setCarregando] = useState(true)
    const [abastecimento, setAbastecimento] = useState<Abastecimento>()
    const [abastecimentoGUID, setAbastecimentoGUID] = useState<string>()


    useEffect(function carregarPagina() {
        carregar()
    }, [])

    const carregar = async () => {
        try {
            setCarregando(true)
            const abastecimento_para = route.params
            //console.log(abastecimento_para?.GUID)
            setAbastecimentoGUID(abastecimento_para?.GUID)
            const abastecimento = await EstoqueService.getAbastecimentosDetalhes(abastecimento_para?.GUID)
            //console.log(abastecimento)
            setAbastecimento(abastecimento)
        } catch (error: any) {
            execSafe(() => _messager.current?.setError(error.userMessage || "Falha ao carregar a página."))

        } finally {
            execSafe(() => {
                setCarregando(false)
                setCarregandoPagina(false)
            })
        }
    }

    const back = () => {
        navigation.goBack()
    }


    const salvar_pdf = async () => {
        try {
            // Cria o PDF
            setCarregando(true)
            const { uri } = await Print.printToFileAsync({ html: `<h1 style="text-align: center;">DETALHES DO ABASTECIMENTO</h1>
            <div style="border: groove; padding: 10px;" ><p><b>Data:</b> ${abastecimento?.DataHora}</p>
            <p><b>Veículo/Equipamento:</b> ${abastecimento?.VeiculoEquipamento != undefined ? abastecimento?.VeiculoEquipamento: ''}</p>
            <p><b>Grupo:</b> ${abastecimento?.GrupoVeiculo != undefined ? abastecimento?.GrupoVeiculo: ''}</p>
            <p><b>N° Frota:</b> ${abastecimento?.NumeroFrota != undefined ? abastecimento?.NumeroFrota: ''}</p>
            <p><b>Frentista:</b> ${abastecimento?.Frentista != undefined ? abastecimento?.Frentista: ''}</p>
            <p><b>Produto:</b> ${abastecimento?.Combustivel != undefined ? abastecimento?.Combustivel: ''}</p>
            <p><b>Litros:</b> ${abastecimento?.Litragem != undefined ? abastecimento?.Litragem: ''}</p>
            <p><b>Valor Total:</b> ${abastecimento?.ValorTotal != undefined ? abastecimento?.ValorTotal: ''}</p>
            <p><b>Custo por Litro:</b> ${abastecimento?.ValorPorLitro != undefined ? abastecimento?.ValorPorLitro: ''}</p>
            <p><b>KM:</b> ${abastecimento?.KM != undefined ? abastecimento?.KM: ''}</p>
            <p><b>Horímetro:</b> ${abastecimento?.Horimetro != undefined ? abastecimento?.Horimetro: ''}</p>
            <p><b>Centro de Custo:</b> ${abastecimento?.CentroDeCusto != undefined ? abastecimento?.CentroDeCusto: ''}</p>
            <p><b>Tipo de operação:</b> ${abastecimento?.TipoOperacao != undefined ? abastecimento?.TipoOperacao: ''}</p>
            <p><b>Observação:</b> ${abastecimento?.Observacao != undefined ? abastecimento?.Observacao: ''}</p>
            <p><b>Local Abastecimento:</b> ${abastecimento?.LocalAbastecimento != undefined ? abastecimento?.LocalAbastecimento: ''}</p>
            <p><b>NFe:</b> ${abastecimento?.NumeroNFe != undefined ? abastecimento?.NumeroNFe: ''}</p>
            <p><b>Tanque:</b> ${abastecimento?.Tanque != undefined ? abastecimento?.Tanque: ''}</p>
            <p><b>Bico:</b> ${abastecimento?.Bico != undefined ? abastecimento?.Bico: ''}</p>
            <div style="
                height: 5px;
            "></div>
            <p><b>Abastecimento Manual:</b> ${abastecimento?.AbastecimentoManual != undefined ? abastecimento?.AbastecimentoManual: ''}</p>
            <p><b>Mobile:</b> ${abastecimento?.AbastecimentoVeioDoMobile != undefined ? abastecimento?.AbastecimentoVeioDoMobile: ''}</p>
            <p><b>Cancelado:</b> ${abastecimento?.AbastecimentoCancelado != undefined ? abastecimento?.AbastecimentoCancelado: ''}</p>
            <p><b>Aferição:</b> ${abastecimento?.AbastecimentoAfericao != undefined ? abastecimento?.AbastecimentoAfericao: ''}</p>
            <p><b>Abastecimento Externo:</b> ${abastecimento?.AbastecimentoExterno != undefined ? abastecimento?.AbastecimentoExterno: ''}</p>
            </div>
            <p style="margin-left: 10px;"><b>Copyright:</b> MaisControl desenvolvimento@maiscontrol.com.br</p>` });

            // Define o nome do arquivo
            const fileName = `abastecimento-${abastecimentoGUID}.pdf`;

            // Verifica se o diretório de downloads está disponível
            const dirInfo = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'downloads/');
            if (!dirInfo.exists) {
                await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'downloads/');
            }

            // Cria o caminho completo para o arquivo
            const localUri = FileSystem.documentDirectory + 'downloads/' + fileName;

            // Move o arquivo para o diretório de downloads
            await FileSystem.moveAsync({
                from: uri,
                to: localUri,
            });

            // Compartilha o arquivo
            await Sharing.shareAsync(localUri);
            setCarregando(false)
        } catch (error) {
            setCarregando(false)
            console.error('Erro ao criar e baixar o arquivo:', error);
        }
    }


    return (
        <UI.Container>
            <UI.Main>
                <UI.Content>
                    <UI.Detalhes>
                        <InfoLabel title="Data:" subtitle={abastecimento?.DataHora}></InfoLabel>
                        <InfoLabel title="Veículo/Equipamento:" subtitle={abastecimento?.VeiculoEquipamento}></InfoLabel>
                        <InfoLabel title="Grupo:" subtitle={abastecimento?.GrupoVeiculo}></InfoLabel>
                        <InfoLabel title="N° Frota:" subtitle={abastecimento?.NumeroFrota}></InfoLabel>
                        <InfoLabel title="Frentista:" subtitle={abastecimento?.Frentista}></InfoLabel>
                        {/*<InfoLabel title="Motorista:" subtitle={abastecimento?.Motorista}></InfoLabel>*/}
                        <InfoLabel title="Produto:" subtitle={abastecimento?.Combustivel}></InfoLabel>
                        <InfoLabel title="Litros:" subtitle={abastecimento?.Litragem}></InfoLabel>
                        <InfoLabel title="Valor Total:" subtitle={abastecimento?.ValorTotal}></InfoLabel>
                        <InfoLabel title="Custo por Litro:" subtitle={abastecimento?.ValorPorLitro}></InfoLabel>
                        <InfoLabel title="KM:" subtitle={abastecimento?.KM}></InfoLabel>
                        <InfoLabel title="Horímetro:" subtitle={abastecimento?.Horimetro}></InfoLabel>
                        <InfoLabel title="Centro de Custo:" subtitle={abastecimento?.CentroDeCusto}></InfoLabel>
                        <InfoLabel title="Tipo de operação:" subtitle={abastecimento?.TipoOperacao}></InfoLabel>
                        <InfoLabel title="Observação:" subtitle={abastecimento?.Observacao}></InfoLabel>
                        <InfoLabel title="Local Abastecimento:" subtitle={abastecimento?.LocalAbastecimento}></InfoLabel>
                        <InfoLabel title="NFe:" subtitle={abastecimento?.NumeroNFe}></InfoLabel>
                        <InfoLabel title="Tanque:" subtitle={abastecimento?.Tanque}></InfoLabel>
                        <InfoLabel title="Bico:" subtitle={abastecimento?.Bico}></InfoLabel>
                        <Separator line={true} ></Separator>
                        <InfoLabel title="Abastecimento Manual:" subtitle={abastecimento?.AbastecimentoManual}></InfoLabel>
                        <InfoLabel title="Mobile:" subtitle={abastecimento?.AbastecimentoVeioDoMobile}></InfoLabel>
                        <InfoLabel title="Cancelado:" subtitle={abastecimento?.AbastecimentoCancelado}></InfoLabel>
                        <InfoLabel title="Aferição:" subtitle={abastecimento?.AbastecimentoAfericao}></InfoLabel>
                        <InfoLabel title="Abastecimento Externo:" subtitle={abastecimento?.AbastecimentoExterno}></InfoLabel>

                    </UI.Detalhes>
                </UI.Content>
                <Messager ref={_messager} />
                <PageLoading
                    visible={carregandoPagina || carregando}
                    white={carregando} />

                <FixedButton
                    type="back"
                    onPress={back}
                />
                <FixedButton
                    type="save"
                    onPress={salvar_pdf}
                />
            </UI.Main>

            <Divider vertical />
        </UI.Container>
    )
}


export default AbastecimentoDetalhesScreen
