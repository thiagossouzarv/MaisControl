import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { PageBaseProps } from "../../components/core"
import { MessagerHandler, Messager } from "../../components/dialogs"
import { AppFlatList, Divider, NoItem, PageLoading, Separator } from "../../components/utils"
import useTrackingMounting from "../../hooks/core/useTrackingMounting"


import { useWindowDimensions } from 'react-native'
import { TabView, TabBar } from 'react-native-tab-view'

import * as UI from "./CadastroAbastecimentoScreenStyle"
import TanquesScreen, { TanquesScreenHandler } from "../tanques/TanquesScreen"
import { Dropdown, DropPeriod } from "../../components/form"
import Moment from "../../utils/date"
import EstoqueService, { Abastecimento } from "../../services/business/estoque"
import ArrayUtils from "../../utils/array"
import ReportUtils, { ReportGroup } from "../../utils/report"
import { Icon } from "../../components/ui"
import Item from "../clientes/components/item/Item"
import CadastroService, { Funcionarios, Veiculos } from "../../services/business/cadastro"


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

    const [dataInicial, setDataInicial] = useState<Date>(_startDataInicial.current)
    const [dataFinal, setDataFinal] = useState<Date>(_startDataFinal.current)
    const [funcionarioSelecao, setfuncionarioSelecao] = useState<Funcionarios[]>([])
    const [veiculosSelecao, setVeiculosSelecao] = useState<Veiculos[]>([])

    const [carregandoPagina, setCarregandoPagina] = useState(true)
    const [carregando, setCarregando] = useState(true)

    useEffect(function carregarPagina() {
        carregar()
    }, [])

    const carregar = async () => {
        try {
            setCarregando(true)
            const itens = await CadastroService.getCadastroBasicosAbastecimentos()
            setfuncionarioSelecao(itens?.Funcionarios)
            setVeiculosSelecao(itens?.Veiculos)
            console.log(veiculosSelecao)
        } catch (error: any) {
            execSafe(() => _messager.current?.setError(error.userMessage || "Falha ao carregar a página."))

        } finally {
            execSafe(() => {
                setCarregando(false)
                setCarregandoPagina(false)
            })
        }
    }



    return (
        <UI.Container>
            <UI.Main>
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

export default CadastroAbastecimentoScreen

interface Empresa {
    uid: string
    nome: string
}

interface Produto {
    uid: string
    nome: string
}