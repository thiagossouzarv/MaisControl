import { APP_SCREENS, AUTH_SCREENS } from "./screens";

export const LinkingMaping = {
    [AUTH_SCREENS.Login]: {
        baseUrl: "login",
        tela: AUTH_SCREENS.Login,
        rota: "login/:title/:message",
        mapeamentoParametrosServidor: {
            title: "title",
            message: "message"
        }
    } as LinkingMapingItem,    
}

export function obterUrl(dados: DadosTelaAcao): string | null {
    try {
        if (!dados) return null;

        const tela = dados.tela;
        const infoLink = LinkingMaping[tela];
        const baseUrl = infoLink?.baseUrl;

        if (!baseUrl?.length) return null;

        const parametros = extrairListaParametros(tela);

        const parametrosTratados = Object.keys(dados.parametros || {}).reduce((obj, parametro) => {
            const nomeParametro = infoLink.mapeamentoParametrosServidor[parametro];
            if (nomeParametro?.length) obj[nomeParametro] = dados.parametros[parametro];
            return obj;
        }, {});

        const urlParametros = parametros?.map(p => parametrosTratados[p]).join("/").replace(/\/{1,}$/, "");

        return baseUrl + (urlParametros?.length ? "/" + urlParametros : "");

    } catch (error) {
        return null;
    }
}

export function obterDadosTelaAcao(url: string): DadosTelaAcao | null {
    try {
        if (!url?.length) return null;

        const base: string[] = url.split("/");
        const tela = obeterTelaFromURL(url);

        if (!tela?.length) return null;
        if (base.length === 1) return { tela, parametros: {} };

        const valoresParametros = base.slice(1);
        const parametros = extrairListaParametros(tela);

        if (!parametros?.length) return { tela, parametros: {} };

        const objetoParametros = parametros.reduce((obj, parametro, posicao) => {
            obj[parametro] = valoresParametros[posicao];
            return obj;
        }, {});

        return { tela, parametros: objetoParametros };

    } catch (error) {
        return null;
    }
}

function extrairListaParametros(tela: string): string[] | null {
    const base = LinkingMaping[tela];
    if (!base) return null;

    const [nomeRota, ...parametrosBrutos] = base.rota.split("/");

    const lista = parametrosBrutos.map(dado => {
        const match = dado.match(/^:(.*[^?])\??$/);
        return match ? match[1] : "null";
    }).filter(o => o !== "null");

    return lista.length ? lista : null;
}

export function deserializarObjetoParametros(objeto: DadosTelaAcao): DadosTelaAcao {
    try {
        if (!objeto) return objeto;

        const infoLink = LinkingMaping[objeto.tela];
        if (!infoLink?.tela?.length) return objeto;

        let resposta: DadosTelaAcao = { tela: objeto.tela, parametros: {} };

        if (objeto.parametros) {
            resposta.parametros = Object.keys(objeto.parametros).reduce((obj, parametro) => {
                const nomeParametro = infoLink.mapeamentoParametrosServidor[parametro];
                if (nomeParametro?.length) obj[nomeParametro] = objeto.parametros[parametro];
                return obj;
            }, {})
        }

        return resposta;

    } catch (error) {
        return objeto;
    }
}

export function validarUrl(url: string | null | undefined, isSigned: boolean): string | null | undefined {
    try {
        const tela = obeterTelaFromURL(url);
        if (!tela?.length) return null;

        const ehTelaAutenticada = Object.keys(APP_SCREENS).findIndex(screen => screen === tela) >= 0;
        const rotaValida = (ehTelaAutenticada && isSigned) || (!ehTelaAutenticada && !isSigned);

        return rotaValida ? url : null;

    } catch (error) {
        return null;
    }
}

function obeterTelaFromURL(url: string | null | undefined): string | null | undefined {
    try {
        if (!url?.length) return null;

        const base: string[] = url.split("/");
        const tela = Object.values(LinkingMaping).find(o => o.baseUrl === base[0])?.tela;

        return tela;

    } catch (error) {
        return null;
    }
}


export interface AcaoLink {
    url: string
}

export interface DadosTelaAcao {
    tela: string,
    parametros: object
}

interface LinkingMapingItem {
    baseUrl: string,
    tela: string,
    rota: string,
    mapeamentoParametrosServidor: object | null
}