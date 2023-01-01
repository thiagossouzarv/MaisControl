import ArrayUtils from "../../utils/array"
import Moment from "../../utils/date"
import api from "../core/api"
import Http, { HttpBaseResponse } from "../core/http"

export default class CadastroService {
    static getCadastroBasicosAbastecimentos(): Promise<Dados[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const resp: GetCadastroBasicosAbastecimentosResponse = await api.get("CadastrosBasicos/GetCadastroBasicosAbastecimentos")
                const validate = Http.validate(resp)

                if (validate.hasError)
                    return reject(validate.rejection)

                resolve(resp.Data)

            } catch (error: any) {
                reject(Http.processError(error))
            }
        })
    }
}


interface GetCadastroBasicosAbastecimentosResponse extends HttpBaseResponse {
    Data: {
        CentroDeCusto: CentroDeCusto[],
        Bicos:Bicos[],
        Funcionarios: Funcionarios[],
        Veiculos: Veiculos[]
    }
}

export interface Dados {
    CentroDeCusto: CentroDeCusto[]
    Bicos:Bicos[]
    Funcionarios: Funcionarios[]
    Veiculos: Veiculos[]
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