import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { PageBaseProps } from "../../components/core"
import { MessagerHandler, Messager } from "../../components/dialogs"
import { AppFlatList, Divider, NoItem, PageLoading, Separator } from "../../components/utils"
import useTrackingMounting from "../../hooks/core/useTrackingMounting"


import { useWindowDimensions } from 'react-native'
import { TabView, TabBar } from 'react-native-tab-view'

import * as UI from "./AbastecimentosScreenStyle"
import TanquesScreen, { TanquesScreenHandler } from "../tanques/TanquesScreen"
import Sumario from "./components/sumario/Sumario"
import Grafico from "./components/grafico/Grafico"
import { Dropdown, DropPeriod } from "../../components/form"
import Moment from "../../utils/date"
import AbastecimentoItem from "./components/abastecimento/Abastecimento"
import EstoqueService, { Abastecimento } from "../../services/business/estoque"
import ArrayUtils from "../../utils/array"
import ReportUtils, { ReportGroup } from "../../utils/report"
import { Icon } from "../../components/ui"
import Item from "../clientes/components/item/Item"


interface AbastecimentosScreenProps extends PageBaseProps { }


const AbastecimentosScreen: React.FC<PageBaseProps> = ({
    route,
    navigation
}) => {
    const _tanquesScreen = useRef<TanquesScreenHandler>()

    const layout = useWindowDimensions()

    const [aba, setAba] = React.useState(0)
    const [abas] = React.useState([
        { key: 'abastecimentos', title: 'Abastecimentos' },
        { key: 'tanques', title: 'Tanques' },
    ])

    const paginacao = useCallback((props: any) => {
        switch (props.route.key) {
            case 'abastecimentos':
                return <AbastecimentosPage navigation={navigation} route={route} />
            case 'tanques':
                return <TanquesScreen ref={_tanquesScreen} navigation={navigation} route={route} />
            default:
                return null
        }
    }, [route, navigation])

    const handleChangeAba = useCallback(() => {
        _tanquesScreen.current?.resetScroll()
    }, [])

    return (
        <TabView
            navigationState={{ index: aba, routes: abas }}
            renderScene={paginacao}
            renderTabBar={renderTabBar}
            onIndexChange={setAba}
            initialLayout={{ width: layout.width }}
            onSwipeStart={handleChangeAba}
        />
    )
}

const AbastecimentosPage: React.FC<AbastecimentosScreenProps> = ({
    navigation
}) => {
    const { execSafe } = useTrackingMounting()

    const _messager = useRef<MessagerHandler>()
    const _startDataInicial = useRef(Moment.addDays(new Date(), -6))
    const _startDataFinal = useRef(new Date())

    const [listaAbastecimentos, setListaAbastecimentos] = useState<Abastecimento[]>([])
    const [dataInicial, setDataInicial] = useState<Date>(_startDataInicial.current)
    const [dataFinal, setDataFinal] = useState<Date>(_startDataFinal.current)
    const [empresasSelecao, setEmpresasSelecao] = useState<Empresa[]>([])
    const [produto, setProduto] = useState<Produto>()

    const [carregandoPagina, setCarregandoPagina] = useState(true)
    const [carregando, setCarregando] = useState(true)

    // useLayoutEffect(function inserirBotaoNovoAtendimento() {
    //     navigation.setOptions({
    //         headerRight: () => (
    //             <UI.NavIcons>
    //                 <Icon
    //                     onClick={gerarPDF}
    //                     icon="pdffile1"
    //                     iconSource="ant-design"
    //                     iconSize="md"
    //                     color="white" />
    //                 <Separator gap="lg" vertical />
    //             </UI.NavIcons>
    //         )
    //     })
    // }, [navigation])

    const carregar = async (dataInicio: Date, dataFim: Date) => {
        try {
            setCarregando(true)
            const itens = await EstoqueService.getAbastecimentos(dataInicio, dataFim)
            setListaAbastecimentos(itens)

        } catch (error: any) {
            execSafe(() => _messager.current?.setError(error.userMessage || "Falha ao carregar a página."))
            setListaAbastecimentos([])

        } finally {
            execSafe(() => {
                setCarregando(false)
                setCarregandoPagina(false)
            })
        }
    }

    useEffect(function carregarPagina() {
        if (!dataInicial || !dataFinal) return
        carregar(dataInicial, dataFinal)
    }, [])

    // useEffect(function carregarPagina() {        
    //     if (!dataInicial || !dataFinal || carregandoPagina) return
    //     carregar()
    // }, [Moment.formatDate(dataInicial), Moment.formatDate(dataFinal)])

    const handleChangePeriodo = useCallback((dataInicial: Date, dataFinal: Date) => {
        setDataInicial(dataInicial)
        setDataFinal(dataFinal)
        carregar(dataInicial, dataFinal)
    }, [])

    const handleChangeEmpresas = useCallback((empresas: Empresa[]) => {
        setEmpresasSelecao(empresas)
    }, [])

    const handleChangeProduto = useCallback((produto: Produto) => {
        setProduto(produto)
    }, [])

    const renderAbastecimento = ({ item }: any) => {
        return (
            <AbastecimentoItem
                info={item} />
        )
    }

    const empresas: Empresa[] = useMemo(() => {
        return ArrayUtils.removeDuplicates(listaAbastecimentos.map(o => ({
            uid: o.IdEmpresaGuid,
            nome: o.Empresa
        } as Empresa)), "uid")
    }, [listaAbastecimentos])

    const combustiveis: Produto[] = useMemo(() => {
        return ArrayUtils.removeDuplicates(listaAbastecimentos.map(o => ({
            uid: o.IdProduto,
            nome: o.Produto
        } as Empresa)), "uid")
    }, [listaAbastecimentos])

    const abastecimentosRender = useMemo(() => {
        return listaAbastecimentos.filter(o => {
            return (!produto || o.IdProduto == produto.uid) &&
                (empresasSelecao.length === 0 || empresasSelecao.some(e => e.uid == o.IdEmpresaGuid))
        })
    }, [listaAbastecimentos, produto?.uid, empresasSelecao])

    const { litragem, numeroAbastecimentos } = useMemo(() => {
        let litragem = 0
        let numeroAbastecimentos = 0

        for (let item of abastecimentosRender) {
            litragem += item.VolumeTotal
            numeroAbastecimentos++
        }

        return {
            litragem,
            numeroAbastecimentos
        }
    }, [abastecimentosRender])

    const gerarPDF = useCallback(async () => {
        try {
            setCarregando(true)
            const itens = abastecimentosRender
            let nomeProduto = produto ? produto.nome : (itens.length > 0 ? itens[0].Produto : "")
            
            if (nomeProduto.toLocaleLowerCase() === "produto") nomeProduto = ""

            const groups: ReportGroup[] = []
            const grupoEmpresas = ArrayUtils.removeDuplicates(itens, "IdEmpresaGuid").map(info => ({
                key: info.IdEmpresaGuid,
                title: info.Empresa
            }))

            if (grupoEmpresas.length > 1) {
                groups.push({
                    keyExtractor: item => item.IdEmpresaGuid,
                    type: "highlight",
                    agroupments: grupoEmpresas
                })
            }

            await ReportUtils.printAsync(itens, {
                title: `Abastecimentos ${nomeProduto}`,
                subtitle: `Período: ${Moment.formatDate(dataInicial)} à ${Moment.formatDate(dataFinal)}`,
                rowStyleClass: (item) => item.status === "F" ? "error" : (item.status === "R" ? "info" : "none"),
                columns: [                    
                    // {
                    //     name: "Placa",
                    //     render: (item: Abastecimento) => item.Placa || "-"
                    // },                   
                    {
                        name: "Placa",
                        render: (item: Abastecimento) => item.Placa || "-"
                    },
                    {
                        name: "Horário",
                        render: (item: Abastecimento) => item.Data
                    }
                    /*{
                        name: "Valor",
                        render: item => "R$ " + NumberUtils.format(item.montante),
                        align: "right",
                        totalizer: {
                            extractor: item => item.montante,
                            counterExtractor: item => 1,
                            operation: (total, counter) => "R$ " + NumberUtils.format(total) || ""
                        }
                    }*/
                ],
                groups,
                /*summary: {
                    title: "Totais Gerais",
                    totalizers: [
                        {
                            name: "Recebido",
                            mainExtractor: item => item.status === 'R' ? item.montante : 0,
                            mainTransform: total => `R$ ${NumberUtils.formatar(total)}`,
                            detailExtractor: item => item.status === 'R' ? 1 : 0,
                            detailTransform: (total, mainTotal) => `(${NumberUtils.formatar(total, 0, true)} ${StringUtils.pluralizar("plantão", "plantões", total)})`
                        },
                        {
                            name: "Faltas",
                            mainExtractor: item => item.status === 'F' ? item.montante : 0,
                            mainTransform: total => `R$ ${NumberUtils.formatar(total)}`,
                            detailExtractor: item => item.status === 'F' ? 1 : 0,
                            detailTransform: (total, mainTotal) => `(${NumberUtils.formatar(total, 0, true)} ${StringUtils.pluralizar("plantão", "plantões", total)})`
                        },
                        {
                            name: "Pendente",
                            mainExtractor: item => item.status === "P" ? item.montante : 0,
                            mainTransform: total => "R$ " + NumberUtils.formatar(total),
                            detailExtractor: item => item.status === "P" ? 1 : 0,
                            detailTransform: (total, mainTotal) => `(${NumberUtils.formatar(total, 0, true)} ${StringUtils.pluralizar("plantão", "plantões", total)})`
                        }
                    ]
                }*/
            })

        } catch (error: any) {
            execSafe(() => _messager.current?.setError(error?.userMessage || "Falha ao gerar relatório."))

        } finally {
            execSafe(() => setCarregando(false))
        }
    }, [abastecimentosRender, dataInicial?.toLocaleDateString(), dataFinal?.toLocaleDateString(), produto?.uid, empresasSelecao.map(a => a.uid).join("")])

    return (
        <UI.Container>
            <UI.Main>
                <AppFlatList
                    data={abastecimentosRender}
                    renderItem={renderAbastecimento}
                    keyExtractor={item => item.GUID}
                    ListHeaderComponent={(
                        <>
                            <Separator />
                            <Dropdown
                                variant="fit"
                                multiple
                                data={empresas}
                                map={{
                                    key: "uid",
                                    title: "nome",
                                    subtitle: "nome",
                                    icon: "map-marker-radius-outline",
                                    iconSource: "material-community",
                                    iconColor: "fg:main"
                                }}
                                label="Empresa"
                                labelMinWidth={80}
                                placeholder="selecione"
                                modalTitle="Empresas"
                                onChange={handleChangeEmpresas}
                                initialSelection={empresas}
                                error=""
                            />

                            <Divider gap="xs" margin="sm" />

                            <Dropdown
                                variant="fit"
                                data={combustiveis}
                                map={{
                                    key: "uid",
                                    title: "nome",
                                    subtitle: "nome",
                                    icon: "gas-station",
                                    iconSource: "material-community",
                                    iconColor: "fg:main"
                                }}
                                label="Combustível"
                                labelMinWidth={80}
                                placeholder="selecione"
                                modalTitle="Combustíveis"
                                onChange={handleChangeProduto}
                                initialSelection={combustiveis?.length ? combustiveis[0] : undefined}
                                error=""
                            />

                            <Divider gap="xs" margin="sm" />

                            <DropPeriod
                                variant="fit"
                                label="Período"
                                labelMinWidth={80}
                                onChange={handleChangePeriodo}
                                initialValueDataInicio={Moment.formatDate(_startDataInicial.current)}
                                initialValueDataFinal={Moment.formatDate(_startDataFinal.current)} />

                            <Separator />

                            <Divider />
                            <Sumario
                                litragem={litragem}
                                numeroAbastecimentos={numeroAbastecimentos} />
                            <Divider />

                            <Grafico
                                listaEmpresas={empresasSelecao.length > 0 ? empresasSelecao : empresas}
                                dataInicial={Moment.formatDate(dataInicial)}
                                dataFinal={Moment.formatDate(dataFinal)}
                                abastecimentos={abastecimentosRender} />

                            <Separator gap="xl" />
                            <UI.Content>
                                <UI.Subtitle>
                                    Abastecimentos
                                </UI.Subtitle>
                            </UI.Content>
                            <Divider gap="xs" margin="md" />
                        </>
                    )}
                    ListFooterComponent={abastecimentosRender.length === 0 ? (
                        <NoItem
                            size="lg"
                            sizeFactor={.8}
                            image="default"
                            title="Nenhum abastecimento"
                            message="Nenhum abastecimento encontrado no período informado" />
                    ) : undefined}
                />

                <Messager ref={_messager} />
                <PageLoading
                    visible={carregandoPagina || carregando}
                    white={carregando} />
            </UI.Main>

            <Divider vertical />
        </UI.Container>
    )
}

const renderTabBar = (props: any) => {
    return (
        <TabBar
            {...props}
            style={{ display: "none" }}
            scrollEnabled
        />
    )
}

export default AbastecimentosScreen

interface Empresa {
    uid: string
    nome: string
}

interface Produto {
    uid: string
    nome: string
}