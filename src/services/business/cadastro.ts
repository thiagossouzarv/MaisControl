import checkInternetConnection from "../../utils/isConection"
import api from "../core/api"
import Http, { HttpBaseResponse } from "../core/http"
import DataOffline from "../core/DataOffline"

export default class CadastroService {
    static getCadastroBasicosAbastecimentos(): Promise<Dados> {
        return new Promise(async (resolve, reject) => {
            try {

                checkInternetConnection().then( async isConnected => {
                    if (isConnected) {
                        const resp: GetCadastroBasicosAbastecimentosResponse = await api.get("CadastrosBasicos/GetCadastroBasicosAbastecimentos")
                        const validate = Http.validate(resp)
        
                        if (validate.hasError)
                            return reject(validate.rejection)
        
                        resolve(resp.Data)
                    } else {
                        console.log('carregou offline')
                        resolve(
                            DataOffline.getDadosCadastroOffline()
                        )
                    }
                })

                

            } catch (error: any) {
                reject(Http.processError(error))
            }
        })
    }

    static CadastrarAbastecimento(
        IdBicoGuid: string,
        IdTagVeiculoGuid: string,
        IdTagFuncionarioGuid: string,
        VolumeTotal: number,
        Odometro: number,
        Horimetro: number,
        Data: string,
        IdCentroCustoGuid: string,
        IdTipoOperacaoGuid: string,
        DescricaoTerceiro: string,
        Observacao: string
    ): Promise<CadastroResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                var post = {
                    IdBicoGuid: IdBicoGuid,
                    IdTagVeiculoGuid: IdTagVeiculoGuid,
                    IdTagFuncionarioGuid: IdTagFuncionarioGuid,
                    VolumeTotal: VolumeTotal,
                    Odometro: Odometro,
                    Horimetro: Horimetro,
                    Data: Data,
                    IdCentroCustoGuid: IdCentroCustoGuid,
                    IdTipoOperacaoGuid: IdTipoOperacaoGuid,
                    DescricaoTerceiro: DescricaoTerceiro,
                    Observacao: Observacao
                }
                checkInternetConnection().then( async isConnected => {
                    if (isConnected) {
                        console.log('gravou online')
                        const resp: CadastroResponse = await api.post("abastecimento/GravarAbastecimentoInterno", post)

                        const validate = Http.validate(resp)

                        if (validate.hasError)
                            return reject(validate.rejection)

                        resolve(resp)
                    } else {
                        console.log('gravou offline')
                        resolve(
                            DataOffline.setCadastroAbastecimentoOffline(post)
                        )
                    }
                })

            } catch (error: any) {
                reject(Http.processError(error))
            }
        })
    }
}

interface CadastroResponse {
    Codigo: number,
    Mensagem: string,
    Data: {
        GUID: string,
        DataSincronizadoWeb: string
    }
}

interface GetCadastroBasicosAbastecimentosResponse extends HttpBaseResponse {
    Data: {
        CentroDeCusto: CentroDeCusto[],
        Bicos:Bicos[],
        Funcionarios: Funcionarios[],
        Veiculos: Veiculos[],
        TipoOperacao: TiposOperacao[],
    }
}

export interface Dados {
    CentroDeCusto: CentroDeCusto[]
    Bicos:Bicos[]
    Funcionarios: Funcionarios[]
    Veiculos: Veiculos[]
    TipoOperacao: TiposOperacao[]
}

export interface Bicos {
    GUID: string
    CodigoIntegrador: string
    DataSincronizadoWeb: string
    Descricao: string
    IdBico: number
    IdBombaGuid: string
    IdEmpresa: number
    IdEmpresaGuid: string
    IdTanqueGUID: string
    Inativo: boolean
    ListEmpresasFilha: []
    MacConcentradorEmpresaOrigem: string
    ValorVenda: number
}

export interface TiposOperacao {
    GUID: string
    Descricao: string
}

export interface Veiculos {
    Aferidor: boolean,
    AnoModelo: string,
    Atualizar: boolean,
    CapacidadeTanque: number,
    CartaoTerceiro: boolean,
    CodigoCartao: string,
    CodigoIntegrador: string,
    DataCadastro: string,
    DataSincronizadoWeb: string,
    DescricaoGrupoVeiculos: string,
    DescricaoVeiculo: string,
    DistanciaPercorrida: number,
    GUID: string,
    HorimetroInicial: number,
    IdCartao: number,
    IdEmpresa: number,
    IdEmpresaOrigem: number,
    IdGrupoVeiculos: number,
    IdGuidGrupoVeiculo: string,
    IdTanqueComboio: number,
    IdTanqueComboioGuid: string,
    Inativo: boolean,
    IsAutorizadoAutotrac: boolean,
    IsComboio: boolean,
    IsTWC: boolean,
    ListEmpresasFilha: string,
    MacConcentradorEmpresa: string,
    MacConcentradorEmpresaOrigem: string,
    Media: number,
    MediaConsumo: number,
    MediaGeral: number,
    NomeFuncionario: string,
    NomeMotorista: string,
    NumeroFrota: string,
    Observacao: string,
    OdometroFinal: number,
    OdometroInicial: number,
    OdometroInicialVeiculo: number,
    Placa: string,
    PlacaDescricao: string,
    PosicaoMemoria: string,
    Selecionar: boolean,
    SomenteAbastecimentoExterno: boolean,
    Tipo: string,
    TipoApontamentoMedia: number,
    TipoTelemetria: string,
    VolumeAbastecido: number,
}

export interface Funcionarios {
    GUID: string
    Aferidor: boolean
    AnoModelo: string
    Atualizar: boolean
    CapacidadeTanque: number
    CartaoTerceiro: boolean
    CodigoCartao: string
    CodigoIntegrador: string
    DataCadastro: string
    DataSincronizadoWeb: string
    DescricaoGrupoVeiculos: string
    DescricaoVeiculo: string
    DistanciaPercorrida: number
    IsServico: boolean
    HorimetroInicial: number
    IdCartao: number,
    IdEmpresa: number,
    IdEmpresaOrigem: number,
    IdGrupoVeiculos: number,
    IdGuidGrupoVeiculo: string,
    IdTanqueComboio: number,
    IdTanqueComboioGuid: null,
    Inativo: boolean,
    IsAutorizadoAutotrac: boolean,
    IsComboio: boolean,
    IsTWC: boolean,
    ListEmpresasFilha: null,
    MacConcentradorEmpresa: null,
    MacConcentradorEmpresaOrigem: null,
    Media: number,
    MediaConsumo: number,
    MediaGeral: number,
    NomeFuncionario: string,
    NomeMotorista: null,
    NumeroFrota: string,
    Observacao: string,
    OdometroFinal: number,
    OdometroInicial: number,
    OdometroInicialVeiculo: number,
    Placa: string,
    PlacaDescricao: string,
    PosicaoMemoria: null,
    Selecionar: boolean,
    SomenteAbastecimentoExterno: boolean,
    Tipo: string,
    TipoApontamentoMedia: number,
    TipoTelemetria: null,
    VolumeAbastecido: number,
}

interface Empresa {
    IdEmpresa: number,
    NomeFantasia: string,
    RazaoSocial: string
}

export interface CentroDeCusto {
    GUID: string
    CodigoIdentificador: string
    Descricao: string
    DataSincronizadoWeb: string
    IdCentroCusto: number
    IdEmpresa: number
    IdEmpresaGuid: string
    Inativo: boolean
    ListEmpresasFilha: string
    MacConcentradorEmpresaOrigem: string
}