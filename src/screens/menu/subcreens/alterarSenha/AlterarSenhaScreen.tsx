import React, { useCallback, useEffect, useRef, useState } from "react"
import { FooterContainer, PageBaseProps } from "../../../../components/core"
import { Messager, MessagerHandler } from "../../../../components/dialogs"
import { Button, InfoHeader, Input, InputHandler } from "../../../../components/form"
import { AppScrollView, PageLoading } from "../../../../components/utils"
import useKeyboard from "../../../../hooks/core/useKeyboard"
import useTrackingMounting from "../../../../hooks/core/useTrackingMounting"
import AuthService from "../../../../services/core/auth"

import * as UI from "./AlterarSenhaScreenStyle"

interface AlterarSenhaScreenProps extends PageBaseProps {

}

const AlterarSenhaScreen: React.FC<AlterarSenhaScreenProps> = () => {
    const { execSafe } = useTrackingMounting()
    const { isKeyboardVisible } = useKeyboard()

    const _messager = useRef<MessagerHandler>()
    const _inputSenhaConfirmacao = useRef<InputHandler>()

    const [senha, setSenha] = useState<string>()
    const [senhaError, setSenhaError] = useState<string | null>(null)
    const [senhaConfirmacao, setSenhaConfirmacao] = useState<string>()
    const [senhaConfirmacaoError, setSenhaConfirmacaoError] = useState<string | null>(null)

    const [carregandoPagina, setCarregandoPagina] = useState(true)
    const [carregando, setCarregando] = useState(true)

    const handleChangeSenha = useCallback((senha: string) => {
        setSenha(senha)
        setSenhaError(null)
    }, [])

    const handleChangeSenhaConfirmacao = useCallback((senha: string) => {
        setSenhaConfirmacao(senha)
        setSenhaConfirmacaoError(null)
    }, [])

    const carregar = useCallback(() => {
        try {

        } catch (error: any) {
            execSafe(() => _messager.current?.setError(error.userMessage || "Falha ao carregar tela"))

        } finally {
            execSafe(() => {
                setCarregando(false)
                setCarregandoPagina(false)
            })
        }
    }, [])

    useEffect(function carregarPagina() {
        carregar()
    }, [carregar])

    const handleSubmit = useCallback(async () => {
        try {
            let valid = true

            if (!senha) {
                valid = false
                setSenhaError("Informe uma senha")
            }

            if (!senhaConfirmacao) {
                valid = false
                setSenhaConfirmacaoError("Confirme a senha")
            }

            if (!!senhaConfirmacao && senha !== senhaConfirmacao) {
                valid = false
                setSenhaConfirmacaoError("As senhas não conferem")
            }

            if (!valid) return

            setCarregando(true)
            await AuthService.updatePassword(senha as string)

        } catch (error: any) {
            execSafe(() => _messager.current?.setError(error?.userMessage || "Erro ao alterar a senha."))

        } finally {
            execSafe(() => setCarregando(false))
        }
    }, [senha, senhaConfirmacao])

    return (
        <UI.Container>
            <AppScrollView>
                <InfoHeader
                    title="Nova"
                    titleHighlight="Senha"
                    subtitle="Informe sua nova senha de acesso" />

                <Input
                    placeholder="Senha"
                    icon="lock"
                    onChange={handleChangeSenha}
                    disabled={carregando}
                    error={senhaError}
                    submitButton="next"
                    nextInput={_inputSenhaConfirmacao.current}
                    uppercase="none"
                    keyboard="default"
                    password
                />

                <Input
                    ref={_inputSenhaConfirmacao}
                    placeholder="Confirme a Senha"
                    icon="lock"
                    onChange={handleChangeSenhaConfirmacao}
                    disabled={carregando}
                    error={senhaConfirmacaoError}
                    submitButton="done"
                    onSubmit={handleSubmit}
                    uppercase="none"
                    keyboard="default"
                    password
                />
            </AppScrollView>

            <FooterContainer 
                visible={!isKeyboardVisible}
                noHorizontalPadding>
                <Button
                    type="submit"
                    rounding
                    onClick={handleSubmit}>
                    Salvar
                </Button>
            </FooterContainer>

            <Messager ref={_messager} />
            <PageLoading
                visible={carregandoPagina || carregando}
                white={carregando} />
        </UI.Container>
    )
}

export default AlterarSenhaScreen