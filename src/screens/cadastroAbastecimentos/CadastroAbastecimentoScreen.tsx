import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { PageBaseProps } from "../../components/core"
import { MessagerHandler, Messager } from "../../components/dialogs"
import { Divider, PageLoading, Separator } from "../../components/utils"
import useTrackingMounting from "../../hooks/core/useTrackingMounting"
import * as UI from "./CadastroAbastecimentoScreenStyle"
import ArrayUtils from "../../utils/array"
import { Button, Dropdown, FixedButton, Input, StepIndicator } from "../../components/form"
import CadastroService, { Bicos, CentroDeCusto, Funcionarios, TiposOperacao, Veiculos } from "../../services/business/cadastro"


interface CadastroAbastecimentoScreenProps extends PageBaseProps { }


const CadastroAbastecimentoScreen: React.FC<PageBaseProps> = ({
    route,
    navigation
}) => {

    return (
        <AbastecimentosPage navigation={navigation} route={route} />
    )
}

const AbastecimentosPage: React.FC<CadastroAbastecimentoScreenProps> = ({
    navigation
}) => {
    const { execSafe } = useTrackingMounting()

    const _messager = useRef<MessagerHandler>()

    const [volume, setVolume] = useState<string>('')
    const [odometro, setOdometro] = useState<string>('')
    const [horimetro, setHorimetro] = useState<string>('')
    const [placaTerceiro, setPlacaTerceiro] = useState<string>('')

    const [observacao, setObservacao] = useState<string>('')
    
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
    const [stepPosition, setStepPosition] = useState(0)
    const [labelsStep, setLabelsStep] = useState(['Indentificação', 'Veículo', 'Abastecimento'])

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

    const handleChangeOdometro = useCallback((odometro: string) => {
        setOdometro(odometro)
    }, [])

    const handleChangeHorimetro = useCallback((horimetro: string) => {
        setHorimetro(horimetro)
    }, [])

    const handleChangePlacaTerceiro = useCallback((placaTerceiro: string) => {
        setPlacaTerceiro(placaTerceiro)
    }, [])

    const handleChangeObservacao = useCallback((observacao: string) => {
        setObservacao(observacao)
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
        if (validarDados(stepPosition))
            setStepPosition(stepPosition+1>=labelsStep.length? 0 : stepPosition+1)
    }

    const validarDados = (stepPosition:number|undefined) => {
        if ( stepPosition == 0 || stepPosition == undefined ){
            if (funcionarioSelecao == undefined){
                _messager.current?.setError("Selecionar o funcionário!")
                return false
            }       
        }

        if (stepPosition == 1 || stepPosition == undefined ){
            if (veiculoSelecao == undefined){
                _messager.current?.setError("Selecionar o Veículo!")
                return false
            }  

            if (odometro == ''){
                _messager.current?.setError("Informe o odometro do veículo!")
                return false
            }
        }

        if (stepPosition == 2 || stepPosition == undefined ){
            if (bicoSelecao == undefined){
                _messager.current?.setError("Selecionar o Bico!")
                return false
            }  

            if (volume == ''){
                _messager.current?.setError("Informe o volume em litros!")
                return false
            }
        }
        return true
    }

    const back = () => {
        setStepPosition(stepPosition-1)
    }

    const handleCadastrar = () => {
        
        if ( validarDados(undefined) ){
            return new Promise(async (resolve, reject) => {
                try {
                    setCarregando(true)
                    const response = await CadastroService.CadastrarAbastecimento(
                        bicoSelecao?.uid,
                        veiculoSelecao?.uid,
                        funcionarioSelecao?.uid,
                        volume,
                        odometro,
                        horimetro,
                        new Date().toISOString(),
                        centroCustoSelecao?.uid,
                        tipoOperacaoSelecao?.uid,
                        placaTerceiro,
                        observacao
                    )
                    setCarregando(false)
                    _messager.current?.setSuccess("Abastecimento foi criado com sucesso.", undefined, undefined, "full_page")
                    setStepPosition(0)
                    clearScreen()
                } catch (error: any) {
                    setCarregando(false)
                    reject(error)
                }
            })
        }
    }

    const clearScreen = () => {
        setFuncionarioSelecao(undefined)
        setCentroCustoSelecao(undefined)
        setTipoOperacaoSelecao(undefined)
        setVeiculoSelecao(undefined)
        setOdometro('')
        setHorimetro('')
        setPlacaTerceiro('')
        setBicoSelecao(undefined)
        setVolume('')
        setObservacao('')
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
                        <Separator />
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

                        <Separator />
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
                        <Separator />
                        <Input
                            initialValue={odometro}
                            placeholder="Odômetro"
                            onChange={handleChangeOdometro}
                            disabled={carregando}
                            hasErroText={false}
                            style={{marginLeft:20, marginRight:20}}
                            keyboard="number-pad"
                            submitButton="next"
                        />
                        <Separator />
                        <Input
                            initialValue={horimetro}
                            placeholder="Horimetro"
                            onChange={handleChangeHorimetro}
                            disabled={carregando}
                            hasErroText={false}
                            style={{marginLeft:20, marginRight:20}}
                            keyboard="number-pad"
                            submitButton="next"
                        />
                        <Separator />
                        <Input
                            initialValue={placaTerceiro}
                            placeholder="Placa terceiros"
                            onChange={handleChangePlacaTerceiro}
                            disabled={carregando}
                            hasErroText={false}
                            style={{marginLeft:20, marginRight:20}}
                            submitButton="next"
                        />
                    </UI.Main>
                : null }

                { stepPosition == 2 ?
                <UI.Main>
                    <Separator />
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
                    <Separator />
                    <Input    
                            initialValue={volume}  
                            placeholder="Volume Litros"
                            onChange={handleChangeVolume}
                            disabled={carregando}
                            hasErroText={false}
                            style={{marginLeft:20, marginRight:20}}
                            keyboard="number-pad"
                            submitButton="next"
                            />
                    <Separator />
                    <Input  
                            initialValue={observacao}
                            placeholder="Observacao"
                            onChange={handleChangeObservacao}
                            disabled={carregando}
                            hasErroText={false}
                            style={{marginLeft:20, marginRight:20}}
                            submitButton="next"
                            />
                    <Separator />
                    
                    <UI.ActionContainer>
                            <Button
                                type="submit"
                                icon="save"
                                iconFont="ant-design"
                                rounding
                                style={{marginLeft:20, marginRight:20}}
                                loading={carregando}
                                onClick={handleCadastrar}>
                                Cadastrar
                            </Button>
                    </UI.ActionContainer>

                    

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