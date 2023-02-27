import AsyncStorage from "@react-native-async-storage/async-storage"
import { STORAGE_ABASTECIMENTOS, STORAGE_BICOS, STORAGE_CENTRO_CUSTO, STORAGE_FUNCIONARIOS, STORAGE_TIPO_OPERACAO, STORAGE_VEICULOS } from "../../constants/globals"
import CadastroService from "../business/cadastro"


export default class DataOffline {

    static async carregarDadosOffline(){
        try {
            const itens = await CadastroService.getCadastroBasicosAbastecimentos()
            console.log('gravando dados offline')
            await AsyncStorage.setItem(STORAGE_BICOS, JSON.stringify(itens.Bicos))
            await AsyncStorage.setItem(STORAGE_CENTRO_CUSTO, JSON.stringify(itens.CentroDeCusto))
            await AsyncStorage.setItem(STORAGE_FUNCIONARIOS, JSON.stringify(itens.Funcionarios))
            await AsyncStorage.setItem(STORAGE_VEICULOS, JSON.stringify(itens.Veiculos))
            await AsyncStorage.setItem(STORAGE_TIPO_OPERACAO, JSON.stringify(itens.TipoOperacao))
        } catch (error) {
            
        }
    }

    static async getDadosCadastroOffline(){
        var CentroDeCustoDB = await AsyncStorage.getItem(STORAGE_CENTRO_CUSTO)
        var BicosDB         = await AsyncStorage.getItem(STORAGE_BICOS)
        var FuncionariosDB  = await AsyncStorage.getItem(STORAGE_FUNCIONARIOS)
        var VeiculosDB      = await AsyncStorage.getItem(STORAGE_VEICULOS)
        var TipoOperacaoDB  = await AsyncStorage.getItem(STORAGE_TIPO_OPERACAO)

        var AbastecimentosDB = await AsyncStorage.getItem(STORAGE_ABASTECIMENTOS)
        console.log(AbastecimentosDB == null? [] : JSON.parse(AbastecimentosDB))

        return({
                CentroDeCusto: CentroDeCustoDB == null? [] : JSON.parse(CentroDeCustoDB),
                Bicos: BicosDB == null? [] : JSON.parse(BicosDB),
                Funcionarios: FuncionariosDB == null? [] : JSON.parse(FuncionariosDB),
                Veiculos: VeiculosDB == null? [] :JSON.parse(VeiculosDB),
                TipoOperacao: TipoOperacaoDB == null? [] :JSON.parse(TipoOperacaoDB)
            }
        )

    }

    static async setCadastroAbastecimentoOffline(abastecimento){
        var AbastecimentosDB = await AsyncStorage.getItem(STORAGE_ABASTECIMENTOS)
        var abastecimentos   = AbastecimentosDB == null? [] : JSON.parse(AbastecimentosDB)
        abastecimentos.push(abastecimento)
        await AsyncStorage.setItem(STORAGE_ABASTECIMENTOS, JSON.stringify(abastecimentos))
        return(
            {
                Codigo: 200,
                Mensagem: 'Abastecimento foi criado com sucesso.',
                Data: {
                    GUID: '',
                    DataSincronizadoWeb: ''
                }
            }
        )
    }


}