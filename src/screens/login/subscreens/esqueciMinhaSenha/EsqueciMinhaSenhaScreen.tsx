import React, { useCallback, useRef, useState } from "react"
import { useTheme } from "styled-components/native"

import Messager, { MessagerHandler, MessagerHandleSubmit } from "../../../../components/dialogs/messager/Messager"
import { Masks } from "react-native-mask-input"
import { Bold, PageBaseProps } from "../../../../components/core"
import { Warning } from "../../../../components/dialogs"
import { Button, Input } from "../../../../components/form"
import { Icon } from "../../../../components/ui"
import { AppScrollView, Separator } from "../../../../components/utils"
import { useAuth } from "../../../../contexts/auth"
import useKeyboard from "../../../../hooks/core/useKeyboard"
import useTrackingMounting from "../../../../hooks/core/useTrackingMounting"

import * as UI from "./EsqueciMinhaSenhaScreenStyle"
import { AppTheme } from "../../../../core/theme"
import ResponseModal from "./components/responseModal/ResponseModal"
import InfoUtils from "../../../../utils/info"

const EsqueciMinhaSenhaScreen: React.FC<PageBaseProps> = ({ navigation }) => {
    
    const { execSafe } = useTrackingMounting()
    const { isKeyboardVisible } = useKeyboard()
    const { requestNewPassword } = useAuth()
    const theme: AppTheme = useTheme()

    const _messager = useRef<MessagerHandler>()

    const [isCarregando, setIsCarregando] = useState(false)
    const [cpf, setCPF] = useState("")
    const [cpfError, setCPFError] = useState<string | null>(null)

    const [emailEnviado, setEmailEnviado] = useState<string | null>(null)

    const handleChangeCPF = useCallback((cpf: string) => {
        setCPF(cpf)
        setCPFError(null)
    }, [])

    const enviarLink = useCallback(async () => {
        try {
            const cpfError = !InfoUtils.isValidCPF(cpf)

            if (cpfError)
                return setCPFError("Informe um CPF válido")

            setIsCarregando(true)
            const email = await requestNewPassword(cpf)
            setEmailEnviado(email)

        } catch (error: any) {
            const message = error.userMessage || "Erro inesperado ao enviar link."
            execSafe(() => _messager.current?.setError(message))

        } finally {
            execSafe(() => setIsCarregando(false))
        }
    }, [cpf])

    const handleSubmit: MessagerHandleSubmit = useCallback((tipoMensagem, action) => {
        if (tipoMensagem !== "error")
            return navigation.goBack()
    }, [])

    return (
        <AppScrollView>
            <UI.Container topo={isKeyboardVisible}>
                <UI.OrientationContainer>
                    <Separator visible={isKeyboardVisible} />
                    <Icon
                        visible={!isKeyboardVisible}
                        icon="emoticon-cry-outline"
                        iconSource="material-community"
                        iconSize={theme.metrics.icon.xl}
                        color={theme.login.icon.fg} />
                    <UI.Question>Esqueceu sua <UI.TextHighlight>senha?</UI.TextHighlight></UI.Question>
                    {!isKeyboardVisible &&
                        <UI.Orientation>Informe seu <Bold>CPF</Bold> para enviarmos um <Bold>link</Bold> no seu <Bold>email</Bold> para você alterá-la!</UI.Orientation>
                    }
                </UI.OrientationContainer>

                <UI.Form>
                    <Input
                        placeholder="CPF"
                        icon="finger-print"
                        iconSource="ionicon"
                        onChange={handleChangeCPF}
                        disabled={isCarregando}
                        error={cpfError}
                        mask={Masks.BRL_CPF}
                        keyboard="number-pad"
                        submitButton="done"
                        onSubmit={enviarLink}
                    />

                    <UI.ActionContainer>
                        <Button
                            rounding
                            type="submit"
                            icon="send"
                            iconFont="font-awesome"
                            loading={isCarregando}
                            onClick={enviarLink}>
                            Enviar Link
                        </Button>

                        <Separator />

                        <Button
                            rounding
                            type="basic"
                            icon="chevron-left"
                            iconFont="font-awesome"
                            onClick={() => navigation.goBack()}>
                            Voltar
                        </Button>
                    </UI.ActionContainer>
                </UI.Form>

                <ResponseModal 
                    email={emailEnviado}
                    handleSubmit={navigation.goBack} />

                <Messager
                    ref={_messager}
                    handleSubmit={handleSubmit} />
                <Warning />
            </UI.Container>
        </AppScrollView>
    )
}

export default EsqueciMinhaSenhaScreen