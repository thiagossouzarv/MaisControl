import React, { useCallback, useRef, useState } from "react"

import * as UI from "./RedefinirSenhaScreenStyle"

import { Bold, PageBaseProps } from "../../../../components/core"
import Messager, { getAction, MessagerHandler, MessagerHandleSubmit } from "../../../../components/dialogs/messager/Messager"
import Input, { InputHandler } from "../../../../components/form/input/Input"
import { useAuth } from "../../../../contexts/auth"
import { usePermissions } from "../../../../contexts/permissions"
import useKeyboard from "../../../../hooks/core/useKeyboard"
import useTrackingMounting from "../../../../hooks/core/useTrackingMounting"
import { AUTH_SCREENS } from "../../../../routes/screens"
import AuthService from "../../../../services/core/auth"
import { AppScrollView, PageLoading, Separator } from "../../../../components/utils"
import { Button } from "../../../../components/form"
import { Warning } from "../../../../components/dialogs"

const ACOES = {
    alterarSenha: getAction("alterarSenha", ""),
    logar: getAction("logar", "")
}

const RedefinirSenhaScreen: React.FC<PageBaseProps> = ({
    navigation,
    route,
}) => {

    const { cpf, token } = route.params || {}

    const { isKeyboardVisible } = useKeyboard()
    const { execSafe } = useTrackingMounting()
    const { signIn } = useAuth()
    const { requiredPermissionsAllEnabled } = usePermissions()

    const _messager = useRef<MessagerHandler>()
    const _inputSenhaConfirmacao = useRef<InputHandler>(null)

    const [carregando, setCarregando] = useState(false)
    const [carregandoPagina, setCarregandoPagina] = useState(false)
    const [senha, setSenha] = useState<string | null>(null)
    const [senhaError, setSenhaError] = useState<string | null>(null)
    const [senhaConfirmacao, setSenhaConfirmacao] = useState<string | null>(null)
    const [senhaConfirmacaoError, setSenhaConfirmacaoError] = useState<string | null>(null)

    const handleChangeSenha = useCallback((senha: string) => {
        setSenha(senha)
        setSenhaError(null)
    }, [])

    const handleChangeSenhaConfirmacao = useCallback((senha: string) => {
        setSenhaConfirmacao(senha)
        setSenhaConfirmacaoError(null)
    }, [])

    async function alterarSenha() {
        try {
            let valid = true

            if ((senha?.length || 0) < 6) {
                valid = false
                setSenhaError("A senha deve ter no mínimo 6 caracteres")
            }

            if (!senhaConfirmacao?.length) {
                valid = false
                setSenhaConfirmacaoError("Confirme sua nova senha")
            }

            if (!!senhaConfirmacao && senha !== senhaConfirmacao) {
                valid = false
                setSenhaConfirmacaoError("As senhas não conferem")
            }

            if (!valid) return
            setCarregando(true)

            await AuthService.updatePassword(senha as string, token)
            execSafe(() => _messager.current?.setInfo("A senha foi alterada com sucesso.", undefined, ACOES.logar))

        } catch (error: any) {
            _messager.current?.setError(error.userMessage || "Houve um erro ao redefinir a senha.", undefined, ACOES.alterarSenha)

        } finally {
            execSafe(() => setCarregando(false))
        }
    }

    const logar = useCallback(async () => {
        try {
            setCarregandoPagina(true)
            await signIn(cpf, senha as string, false, false)

            execSafe(() => {
                setCarregando(false)
                if (!requiredPermissionsAllEnabled) navigation.navigate(AUTH_SCREENS.RequisicaoPermissoes)
            })

        } catch (error: any) {
            setCarregandoPagina(false)
            _messager.current?.setError(error.userMessage || "Houve erro ao realizar o login.", undefined, ACOES.logar)

        } finally {
            execSafe(() => {
                try {
                    setCarregando(false)
                    setCarregandoPagina(false)
                } catch (err) { }
            })
        }
    }, [signIn, cpf, senha, navigation, requiredPermissionsAllEnabled])

    const handleSubmit: MessagerHandleSubmit = (type, action) => {
        const ehLogin = action?.code === ACOES.logar.code

        if (type === "error" && ehLogin)
            return navigation.navigate(AUTH_SCREENS.Login, { limparSenha: true })

        if (ehLogin) logar()
    }

    return (
        <AppScrollView>
            <UI.Container topo={isKeyboardVisible}>
                <UI.HeaderContainer>
                    <UI.Title>Caro <UI.TitleHighlight>usuário</UI.TitleHighlight></UI.Title>
                    {!isKeyboardVisible && (
                        <UI.Info>Você precisa <Bold>alterar</Bold> sua <Bold>senha</Bold> de acesso para garantir a sua <Bold>segurança</Bold>.</UI.Info>
                    )}
                </UI.HeaderContainer>

                <UI.Form>
                    <Input
                        placeholder="Nova Senha"
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
                        onSubmit={alterarSenha}
                        uppercase="none"
                        keyboard="default"
                        password
                    />
                </UI.Form>

                <UI.ActionContainer>
                    <Button
                        type="submit"
                        icon="check"
                        iconFont="ant-design"
                        rounding
                        loading={carregando}
                        onClick={alterarSenha}>
                        Salvar
                    </Button>

                    <Separator />

                    <Button
                        type="basic"
                        icon="chevron-left"
                        iconFont="font-awesome"
                        rounding
                        onClick={() => navigation.goBack()}>
                        Voltar
                    </Button>
                </UI.ActionContainer>

                <Messager
                    ref={_messager}
                    handleSubmit={handleSubmit} />

                <PageLoading visible={carregandoPagina} white={carregandoPagina} />

                <Warning />
            </UI.Container>
        </AppScrollView>
    )
}

export default RedefinirSenhaScreen