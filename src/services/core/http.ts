const MSG_ERRO_PADRAO = "Aconteceu um erro desconhecido.";

export default class Http {
    static validate(response: HttpBaseResponse, errorMessage?: string): HttpValidationResponse {
        let { Codigo, Mensagem } = response;

        if (Codigo !== "sucesso")
            return {
                hasError: true,
                rejection: Http.processError({ response }, Mensagem || errorMessage || MSG_ERRO_PADRAO, { code: Codigo })
            }

        return { hasError: false };
    }

    static processError(error: any, userMessage?: string, detail?: ErrorDetail): ErrorResponse {
        return {
            code: detail?.code || error.Codigo || error.code,
            userMessage: error.userMessage || userMessage || MSG_ERRO_PADRAO,
            error
        }
    }
}

export interface HttpBaseResponse {
    Codigo?: string | number;
    Mensagem: string | null;
    Data?: any;
}

interface Response {
    code?: string | number;
    data?: any;
}

interface HttpValidationResponse {
    hasError: boolean;
    rejection?: ErrorResponse
}

export interface ErrorResponse extends Response {
    userMessage: string;
    error: any;
}

interface ErrorDetail {
    code?: number | string;
}