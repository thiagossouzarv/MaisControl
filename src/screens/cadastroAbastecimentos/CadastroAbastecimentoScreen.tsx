import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { PageBaseProps } from "../../components/core"
import { MessagerHandler, Messager } from "../../components/dialogs"
import { AppFlatList, Divider, NoItem, PageLoading, Separator } from "../../components/utils"
import useTrackingMounting from "../../hooks/core/useTrackingMounting"


import { useWindowDimensions } from 'react-native'
import { TabView, TabBar } from 'react-native-tab-view'

import * as UI from "./CadastroAbastecimentoScreenStyle"
import TanquesScreen, { TanquesScreenHandler } from "../tanques/TanquesScreen"
import { Dropdown, DropPeriod, FixedButton, Input, InputHandler, StepIndicator } from "../../components/form"
import Moment from "../../utils/date"
import ArrayUtils from "../../utils/array"
import ReportUtils, { ReportGroup } from "../../utils/report"
import { Icon } from "../../components/ui"
import Item from "../clientes/components/item/Item"
import CadastroService, { Bicos, CentroDeCusto, Funcionarios, TiposOperacao, Veiculos } from "../../services/business/cadastro"
import { Masks } from "react-native-mask-input"


interface CadastroAbastecimentoScreenProps extends PageBaseProps { }


const CadastroAbastecimentoScreen: React.FC<PageBaseProps> = ({
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

const AbastecimentosPage: React.FC<CadastroAbastecimentoScreenProps> = ({
    navigation
}) => {
    const { execSafe } = useTrackingMounting()

    const _messager = useRef<MessagerHandler>()
    const _startDataInicial = useRef(Moment.addDays(new Date(), -6))
    const _startDataFinal = useRef(new Date())

    const _inputVolume = useRef<InputHandler>(null)
    const [volume, setVolume] = useState<string>('')

    const [dataInicial, setDataInicial] = useState<Date>(_startDataInicial.current)
    const [dataFinal, setDataFinal] = useState<Date>(_startDataFinal.current)
    
    const [listaFuncionarios, setListafuncionarios] = useState<Funcionarios[]>([])
    const [listaVeiculos, setListaVeiculos] = useState<Veiculos[]>([])

    const [veiculoSelecao, setVeiculoSelecao] = useState<Veiculo>()
    const [funcionarioSelecao, setFuncionarioSelecao] = useState<Funcionario>()

    const [listaBicos, setListaBicos] = useState<Bicos[]>([])
    const [bicoSelecao, setBicoSelecao] = useState<Bico>()

    const [listaCentroCusto, setListaCentroCusto] = useState<CentroDeCusto[]>([])
    const [centroCustoSelecao, setCentroCustoSelecao] = useState<CentroCusto>()

    const [listaTipoOperacao, setListaTipoOperacao] = useState<TiposOperacao[]>([])
    const [tipoOperacaoSelecao, setTipoOperacaoSelecao] = useState<TipoOperacao>()


    const [carregandoPagina, setCarregandoPagina] = useState(true)
    const [carregando, setCarregando] = useState(true)
    const [stepPosition, setStepPosition] = useState(2)
    const [labelsStep, setLabelsStep] = useState(['Indentificação', 'Funcionario/Veiculo', 'Abastecimento'])

    const veiculos: Veiculo[] = useMemo(() => {
        return ArrayUtils.removeDuplicates(listaVeiculos.map(o => ({
            uid: o.GUID,
            nome: o.PlacaDescricao
        } as Veiculo)), "uid")
    }, [listaVeiculos])

    const funcionarios: Funcionario[] = useMemo(() => {
        return ArrayUtils.removeDuplicates(listaFuncionarios.map(o => ({
            uid: o.GUID,
            nome: o.NomeFuncionario
        } as Funcionario)), "uid")
    }, [listaFuncionarios])

    const bicos: Bico[] = useMemo(() => {
        return ArrayUtils.removeDuplicates(listaBicos.map(o => ({
            uid: o.GUID,
            nome: o.Descricao
        } as Bico)), "uid")
    }, [listaBicos])

    const centrosCusto: CentroCusto[] = useMemo(() => {
        return ArrayUtils.removeDuplicates(listaCentroCusto.map(o => ({
            uid: o.GUID,
            nome: o.Descricao
        } as CentroCusto)), "uid")
    }, [listaCentroCusto])

    const tiposOperacao: TipoOperacao[] = useMemo(() => {
        return ArrayUtils.removeDuplicates(listaTipoOperacao.map(o => ({
            uid: o.GUID,
            nome: o.Descricao
        } as TipoOperacao)), "uid")
    }, [listaTipoOperacao])

    const handleChangeVeiculo = useCallback((veiculo: Veiculo) => {
        setVeiculoSelecao(veiculo)
    }, [])

    const handleChangeFuncionario = useCallback((funcionario: Funcionario) => {
        setFuncionarioSelecao(funcionario)
    }, [])

    const handleChangeBico = useCallback((bico: Bico) => {
        setBicoSelecao(bico)
    }, [])

    const handleChangeCentroCusto = useCallback((centroCusto: CentroCusto) => {
        setCentroCustoSelecao(centroCusto)
    }, [])

    const handleChangeTipoOperacao = useCallback((tipoOperacao: TipoOperacao) => {
        setTipoOperacaoSelecao(tipoOperacao)
    }, [])

    const handleChangeVolume = useCallback((volume: string) => {
        setVolume(volume)
    }, [])

    useEffect(function carregarPagina() {
        carregar()
    }, [])

    const carregar = async () => {
        try {
            setCarregando(true)
            const itens = await CadastroService.getCadastroBasicosAbastecimentos()
            setListafuncionarios(itens?.Funcionarios)
            setListaVeiculos(itens?.Veiculos)
            setListaBicos(itens?.Bicos)
            setListaCentroCusto(itens?.CentroDeCusto)
            setListaTipoOperacao(itens?.TipoOperacao)
        } catch (error: any) {
            execSafe(() => _messager.current?.setError(error.userMessage || "Falha ao carregar a página."))

        } finally {
            execSafe(() => {
                setCarregando(false)
                setCarregandoPagina(false)
            })
        }
    }

    const next = () => {
        setStepPosition(stepPosition+1>=labelsStep.length? 0 : stepPosition+1)
    }

    const back = () => {
        setStepPosition(stepPosition-1)
    }


    return (
        <UI.Container>
            <UI.Main>
                <StepIndicator currentPosition={stepPosition} 
                               key={1} 
                               labels={labelsStep}
                               stepCount={labelsStep.length}/>
                
                
                
                
                { stepPosition == 0 ?
                    <UI.Main>
                        <Separator />
                        <Dropdown
                            variant="fit"
                            data={funcionarios}
                            map={{
                                key: "uid",
                                title: "nome",
                                subtitle: "nome",
                                icon: "map-marker-radius-outline",
                                iconSource: "material-community",
                                iconColor: "fg:main"
                            }}
                            label="Funcionario"
                            labelMinWidth={125}
                            placeholder="selecione"
                            modalTitle="Funcionarios"
                            onChange={handleChangeFuncionario}
                            initialSelection={0}
                            error=""
                        />
                        <Divider gap="xs" margin="sm" />
                        <Dropdown
                            variant="fit"
                            data={centrosCusto}
                            map={{
                                key: "uid",
                                title: "nome",
                                subtitle: "nome",
                                icon: "map-marker-radius-outline",
                                iconSource: "material-community",
                                iconColor: "fg:main"
                            }}
                            label="Centro de custo"
                            labelMinWidth={125}
                            placeholder="selecione"
                            modalTitle="Centros de custo"
                            onChange={handleChangeCentroCusto}
                            initialSelection={0}
                            error=""
                        />

                        <Divider gap="xs" margin="sm" />
                        <Dropdown
                            variant="fit"
                            data={tiposOperacao}
                            map={{
                                key: "uid",
                                title: "nome",
                                subtitle: "nome",
                                icon: "map-marker-radius-outline",
                                iconSource: "material-community",
                                iconColor: "fg:main"
                            }}
                            label="Tipo de operação"
                            labelMinWidth={125}
                            placeholder="selecione"
                            modalTitle="Tipos de operação"
                            onChange={handleChangeTipoOperacao}
                            initialSelection={0}
                            error=""
                        />

                    </UI.Main>
                : null }

                { stepPosition == 1 ?
                    <UI.Main>
                        <Separator />
                        <Dropdown
                            variant="fit"
                            data={veiculos}
                            map={{
                                key: "uid",
                                title: "nome",
                                subtitle: "nome",
                                icon: "map-marker-radius-outline",
                                iconSource: "material-community",
                                iconColor: "fg:main"
                            }}
                            label="Veículo/Equipamento"
                            labelMinWidth={125}
                            placeholder="selecione"
                            modalTitle="Veículos/Equipamentos"
                            onChange={handleChangeVeiculo}
                            initialSelection={0}
                            error=""
                        />
                        <Divider gap="xs" margin="sm" />
                        <Input
                            ref={_inputVolume}
                            placeholder="Odômetro"
                            onChange={handleChangeVolume}
                            disabled={carregando}
                            keyboard="number-pad"
                            submitButton="next"
                        />

                        <Input
                            ref={_inputVolume}
                            placeholder="Horimetro"
                            onChange={handleChangeVolume}
                            disabled={carregando}
                            keyboard="number-pad"
                            submitButton="next"
                        />
                        <Input
                            ref={_inputVolume}
                            placeholder="Placa terceiros"
                            onChange={handleChangeVolume}
                            disabled={carregando}
                            keyboard="number-pad"
                            submitButton="next"
                        />
                    </UI.Main>
                : null }

                { stepPosition == 2 ?
                <UI.Main>

                    <Divider gap="xs" margin="sm" />
                    <Dropdown
                        variant="fit"
                        data={bicos}
                        map={{
                            key: "uid",
                            title: "nome",
                            subtitle: "nome",
                            icon: "map-marker-radius-outline",
                            iconSource: "material-community",
                            iconColor: "fg:main"
                        }}
                        label="Bico"
                        labelMinWidth={125}
                        placeholder="selecione"
                        modalTitle="Bicos"
                        onChange={handleChangeBico}
                        initialSelection={0}
                        error=""
                    />

                    <Input
                                ref={_inputVolume}
                                placeholder="Volume Litros"
                                onChange={handleChangeVolume}
                                disabled={carregando}
                                keyboard="number-pad"
                                submitButton="next"
                            />

                    

                    

                </UI.Main>
                : null }
                
                <Messager ref={_messager} />
                
                <FixedButton
                    type="back"
                    onPress={back}
                    visible={stepPosition>0} />
                <FixedButton
                    type="next"
                    onPress={next}
                    visible={stepPosition+1<labelsStep.length} />
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

export default CadastroAbastecimentoScreen

interface Veiculo {
    uid: string
    nome: string
}

interface Funcionario {
    uid: string
    nome: string
}

interface Bico {
    uid: string
    nome: string
}

interface CentroCusto {
    uid: string
    nome: string
}

interface TipoOperacao {
    uid: string
    nome: string
}