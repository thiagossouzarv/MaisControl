import ArrayUtils from "../../utils/array"
import Moment from "../../utils/date"
import checkInternetConnection from "../../utils/isConection"
import api from "../core/api"
import Http, { HttpBaseResponse } from "../core/http"

export default class EstoqueService {
    static getTanques(): Promise<Tanque[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const resp: GetTanquesResponse = await api.get("estoque/GetTanques")
                const validate = Http.validate(resp)

                if (validate.hasError)
                    return reject(validate.rejection)

                if (resp.Data.TanquesCadastrados?.length)
                    resp.Data.TanquesCadastrados = ArrayUtils.sort(resp.Data.TanquesCadastrados, item => [[(item.EstoqueAtual - item.EstoqueMinimo) / ((item.Capacidade - item.EstoqueMinimo) || 1), "asc"]])

                resolve(resp.Data.TanquesCadastrados.filter(item => !!item && !item.Inativo))

            } catch (error: any) {
                reject(Http.processError(error))
            }
        })
    }

    static getAbastecimentos(dataInicial: Date, dataFinal: Date): Promise<Abastecimento[]> {
        const errorMessage = ""
        return new Promise(async (resolve, reject) => {
            try {  
                const is_connect = await checkInternetConnection().then()
                if (is_connect){
                    const resp: HttpBaseResponse = await api.get(`abastecimento/GetAbastecimentos?dataInicial=${Moment.formatDate(dataInicial)}&dataFinal=${Moment.formatDate(dataFinal)}`)
                    const validate = Http.validate(resp, errorMessage)

                    if (validate.hasError)
                        return reject(validate.rejection)

                    const abastecimentos: Abastecimento[] = (resp.Data.ListaAbastecimentos || []).filter(o => !o.Cancelado).map((o: Abastecimento) => {
                        o.Data = o.Data ? Moment.formatDateTime(Moment.fromDateString(o.Data.replace("T", " ")), false) : o.Data
                        o.Empresa = o.Empresa || "Não Identificado"
                        o.IdEmpresaGuid = (o.IdEmpresaGuid || "-1").toString()
                        o.Produto = o.Produto || "Não Identificado"
                        o.IdProduto = (o.IdProduto || "-1").toString()
                        return o
                    })
                    resolve(abastecimentos)
                    /*resolve(ArrayUtils.sort(abastecimentos, item => [
                        [item.Data ? Moment.fromDateString(item.Data).getTime() : -1, "asc"]
                    ]))*/
                } else {
                    resolve([])
                }

            } catch (error: any) {
                reject(Http.processError(error, errorMessage))
            }
        })
    }
}


interface GetTanquesResponse extends HttpBaseResponse {
    Data: {
        TanquesCadastrados: Tanque[]
    }
}

export interface Tanque {
    IdTanque?: number
    //IdProduto: number
    //IdEmpresa?: string
    Descricao: string
    Capacidade: number
    Combustivel: boolean
    EstoqueAtual: number
    EstoqueInicial: number
    EstoqueMinimo: number
    Inativo: boolean

    Produto: Produto,
    Empresa: Empresa,
}

export interface Produto {
    IdProduto: number
    Produto: string
    EstoqueAtual: number
    IdEmpresa: number
    Inativo: boolean
    IsCombustivel: boolean
    IsServico: boolean
}

interface Empresa {
    IdEmpresa: number,
    NomeFantasia: string,
    RazaoSocial: string
}

export interface Abastecimento {
    GUID: string
    IdAbastecimento: string
    Cancelado: boolean
    Data: string //"2022-07-05T07:59:00",
    IdEmpresaGuid: string
    Empresa: string
    Placa?: string
    DescricaoVeiculo?: string
    VeiculoEquipamento:string
    GrupoVeiculo: string
    NumeroFrota: string
    Frentista: string
    Motorista: string

    Litragem:number
	ValorTotal:string
	ValorPorLitro:string
	KM:number
	Horimetro:number
	CentroDeCusto:string
	TipoOperacao:string
	Observacao:string
	LocalAbastecimento:string
	NumeroNFe:string
	Tanque:string
	Bico:string
	AbastecimentoManual:string
	AbastecimentoExterno:string
	AbastecimentoCancelado:string
	AbastecimentoVeioDoMobile:string
	AbastecimentoAfericao:string

    IdProduto: string
    Produto: string
    DescricaoProduto?: string
    Combustivel?: string
    VolumeTotal: number,
    CentroCusto?: string,
    /*
    ValorTotal":1000.846,
    ValorPorLitro?: number,
    IdEmpresaPai?: number
    DescricaoTanque: string
    Bomba: number
    BombaDescricao: string
    Bico: number
    DescricaoBico: string
    Tanque: number
    Cpf_Motorista?: string
    NomeFuncionario?: string
    NomeMotorista?: string
    DescricaoTerceiro?: string
    AbastecimentoExterno: boolean,
    AbastecimentoManual: boolean,
    Afericao: boolean,
    Autonomia?: string,
    CNPJ?: string,    
    CartaoFuncionario?: string,
    CartaoVeiculo?: string,
    
    ChaveAcessoNFe?: string,
    CnpjPostoExterno?: string,
    CodigoCartaoFuncionario?: string,
    CodigoCartaoVeiculo?: string,
    CodigoIntegrador?: string,        
    DataCaptura?: string,
    DataHoraIntegracao?: string,
    DataSincronizadoWeb?: string,
    DepositoIntegracao?: string,    
    DescricaoVeiculoMobile?: string,
    DiferencaEncerrante: number,    
    EncerranteFinal: number,
    EncerranteInicial: number,
    ErroEncerrante: boolean,
    EstoqueAtual: number,
    Exportado: boolean,
    ExportadoWeb: boolean,
    FilialIntegracao?: string,
    ForaDoPadrao: boolean,
    HorasTrabalhadas: number,
    Horimetro?: number,
    IdBicoGuid":null,
    IdBomba":null,
    IdCentroCustoGuid":null,
    IdConcentrador":null,
    IdConcentradorGuid":null,
    IdCusto":null,
    IdMotorista":null,
    IdMotoristaGuid:",
    IdOrdemAbastecimentoGuid":null,    
    IdProdutoIntegracaoAtua":0,
    IdRegistroWeb":0,
    IdTagFrentista":null,
    IdTagFuncionarioGuid":null,
    IdTagVeiculo":null,
    IdTagVeiculoGuid":null,
    IdTanqueGuid":null,
    IdTipoOperacao":null,
    IdWeb":659,
    IsCartaoTerceiro":false,
    IsPago":false,
    IsTerceiro":false,
    IsZerado":false,
    ListEmpresasFilha":null,
    LitrosAfericao":0,
    MacConcentradorFilha":null,
    MacConcentradorPai":null,
    MediaPorKm":0,
    MediaPorKmGeral":0,
    NomeFilial:FAZENDA BRASILANDA",    
    Observacao:",
    Odometro":25110,
    PossivelErro":0,
    ProdutoIntegracao:",
    RazaoSocial:FAZENDA BRASILANDA",
    Registro":null,
    StringOriginal":null,    
    TempoDuracao":177,
    TipoApontamento":0,
    TipoOperacaoDescricao":null,
    ValorCustoMedio":null,    
    VirgulaPrecoUnitario":null,
    VirgulaTotal":null,
    VirgulaVolume":null,
    codexterno:"*/
}