import React, { useCallback, useState, useRef, useEffect } from "react"
import { useTheme } from "styled-components/native"

import { useAuth } from "../../contexts/auth"

import * as UI from "./LoginScreenStyle"
import { Bold, PageBaseProps } from "../../components/core"
import { usePermissions } from "../../contexts/permissions"
import Messager, { getAction, MessagerHandler } from "../../components/dialogs/messager/Messager"
import useTrackingMounting from "../../hooks/core/useTrackingMounting"
import Input, { InputHandler } from "../../components/form/input/Input"
import useKeyboard from "../../hooks/core/useKeyboard"
import { AppState } from "react-native"
import InfoUtils from "../../utils/info"
import { AUTH_SCREENS } from "../../routes/screens"
import { AppScrollView, Separator } from "../../components/utils"
import { AppLogo } from "../../components/app"
import { Masks } from "react-native-mask-input"
import { Button } from "../../components/form"
import ModalAceitacaoTermos from "./components/modalAceitacaoTermos/ModalAceitacaoTermos"
import { Warning } from "../../components/dialogs"
import AuthService, { ERROS } from "../../services/core/auth"
import useBiometrics from "../../hooks/auth/useBiometrics"
import { AppConfig } from "../../core/config"
import { Icon } from "../../components/ui"
import { AppTheme } from "../../core/theme"

const ACOES = {
    notificacao: getAction("notificacao", "")
}

const LoginScreen: React.FC<PageBaseProps> = ({
    route,
    navigation
}) => {
    const theme: AppTheme = useTheme()

    const onBioAuthenticate = () => {
        handleSignIn(false, true)
    }

    const {
        bioInfo,
        bioEnabled,
        bioAuthenticate,
        bioAuthInvalidate,
        bioAuthConfirmed,
    } = useBiometrics(onBioAuthenticate)

    const { requiredPermissionsAllEnabled, updateAllPermissionStatus, setIgnorePermissions } = usePermissions()
    const { signIn, signOut, isSigned, updateClientes } = useAuth()
    const { execSafe } = useTrackingMounting()
    const { isKeyboardVisible } = useKeyboard()

    const _messager = useRef<MessagerHandler>()
    const _inputCPF = useRef<InputHandler>(null)
    const _inputPassword = useRef<InputHandler>(null)

    const [isCarregando, setIsCarregando] = useState(false)
    const [cpf, setCPF] = useState("")
    const [senha, setSenha] = useState("")
    const [cpfError, setCPFError] = useState<string | null>(null)
    const [senhaError, setSenhaError] = useState<string | null>(null)

    const [modalAceitacaoTermosVisivel, setModalAceitacaoTermosVisivel] = useState(false)

    const handleSignIn = useCallback(async (ignorarTermos = false, bioAutenticacao = false) => {
        try {
            const cpfValido = InfoUtils.isValidCPF(cpf)
            const senhaValida = !!senha?.length

            updateClientes([])

            if (!bioAutenticacao && !cpfValido)
                setCPFError("Informe um CPF válido")

            if (!bioAutenticacao && !senhaValida)
                setSenhaError("Infome uma senha")

            if (!bioAutenticacao && (!cpfValido || !senhaValida)) return

            setIsCarregando(true)

            const appTermsAccepted = !AppConfig.auth.termsAndPolicies || await AuthService.isAppTermsAccepted(bioAutenticacao ? bioInfo.current?.cpf as string : cpf as string)

            if (!ignorarTermos && !appTermsAccepted)
                return setModalAceitacaoTermosVisivel(true)

            if (bioAutenticacao) {
                if (!bioAuthConfirmed.current) return execSafe(() => _messager.current?.setError("Falha na autenticação biométrica."))
                await signIn(bioInfo.current?.cpf || "", bioInfo.current?.token || "", !appTermsAccepted, true)
            } else {
                await signIn(cpf || "", senha || "", !appTermsAccepted, false)
            }

            execSafe(() => {
                setIsCarregando(false)
                if (!requiredPermissionsAllEnabled) navigation.navigate(AUTH_SCREENS.RequisicaoPermissoes)
            })

        } catch (error: any) {
            execSafe(() => setIsCarregando(false))

            if (error.code === ERROS.escolherCliente) {
                updateClientes(error.data.clientes || [])
                return navigation.navigate(AUTH_SCREENS.Clientes, { cpf, senha })
            }

            if (error.code === ERROS.redefinirSenha)
                return navigation.navigate(AUTH_SCREENS.RedefinirSenha, { cpf, token: error.data.token })

            execSafe(() => _messager.current?.setError(error?.userMessage || "Houve erro ao realizar o login."))

        } finally { execSafe(() => setIsCarregando(false)) }
    }, [signIn, cpf, senha, navigation, requiredPermissionsAllEnabled])

    useEffect(function iniciarTela() {
        try {
            if (isSigned) signOut()

        } catch (error) { }
    }, [])

    useEffect(function monitorarAppStatus() {
        const listener = AppState.addEventListener('change', updateAllPermissionStatus)

        return () => listener.remove()
    }, [])

    useEffect(function focoTela() {
        const desabilitarFoco = navigation.addListener("focus", () => {
            setIgnorePermissions(false)
            updateAllPermissionStatus()

            const { limparSenha, cpfInicial } = route.params || {}

            if (cpfInicial?.length) _inputCPF.current?.update(cpfInicial)
            if (limparSenha) _inputPassword.current?.clear()
        })

        const desabilitarDesfoco = navigation.addListener("blur", () => {
            if (route.params) {
                try {
                    delete route.params.limparSenha
                    delete route.params.cpfInicial
                    delete route.params.title
                    delete route.params.message
                } catch (error) { }
            }
        })

        return () => {
            desabilitarFoco()
            desabilitarDesfoco()
        }
    }, [navigation, route])

    useEffect(function mostrarNotificacao() {
        try {
            const { title, message } = route.params || {}

            if (!isSigned && message?.length)
                execSafe(() => abrirNotificacao(title, message))

        } catch (error) { }
    }, [route?.params])

    const handleChangeCPF = useCallback((cpf: string) => {
        setCPF(cpf)
        setCPFError(null)
    }, [])

    const handleChangeSenha = useCallback((senha: string) => {
        setSenha(senha)
        setSenhaError(null)
    }, [])

    // async function solicitarPreCadastro() {
    //     try {
    //         if (InfoUtils.isValidCPF(cpf)) {
    //             setIsCarregando(true)
    //             const status = await CadastroService.verificarPreCadastro(cpf)

    //             if (status.id === STATUS_PRE_CADASTRO.novoUsuario.id) //||
    //                 // status.id === STATUS_PRE_CADASTRO.pendente.id)
    //                 return navigation.navigate(AUTH_SCREENS.FormPreCadastro, { cpf })

    //             messager.setWarn(status.mensagem)
    //             return
    //         }

    //         navigation.navigate(AUTH_SCREENS.FormPreCadastro)

    //     } catch (error: any) {
    //         messager.setError(error.userMessage || "Erro ao abrir pré-cadastro.")

    //     } finally {
    //         setIsCarregando(false)
    //     }
    // }

    function abrirNotificacao(title: string, message: string) {
        ACOES.notificacao.title = title
        ACOES.notificacao.message = message

        execSafe(() => {
            _messager.current?.setInfo(message, title)
        })
    }

    const rejeitarTermos = useCallback(() => {
        setModalAceitacaoTermosVisivel(false)
        setIsCarregando(false)
    }, [])

    const aceitarTermos = useCallback(() => {
        setModalAceitacaoTermosVisivel(false)
        handleSignIn(true, bioAuthConfirmed.current)
    }, [handleSignIn, bioAuthConfirmed])

    const fazerAutenticacaoBiometrica = async () => {
        try {
            await bioAuthenticate()

        } catch (error: any) {
            execSafe(() => _messager.current?.setError(error))
        }
    }

    const handleAcessar = () => {
        bioAuthInvalidate()
        handleSignIn(false)
    }

    return (
        <>
            <AppScrollView>
                <UI.Container begin={isKeyboardVisible}>
                    <UI.Header>
                        <Separator visible={isKeyboardVisible} />
                        <AppLogo />
                        <Separator gap="lg" />

                        <UI.Title>Login</UI.Title>

                        {!isKeyboardVisible &&
                            <>
                                <Separator gap="md" />

                                <UI.MessageContainer>
                                    <UI.Message>
                                        Informe seu <Bold category='s2'>CPF</Bold> e sua <Bold>senha</Bold> para acessar o aplicativo!
                                    </UI.Message>
                                </UI.MessageContainer>
                            </>
                        }
                    </UI.Header>

                    <Separator gap="xl" />

                    <UI.Form>
                        {bioEnabled &&
                            <UI.LinkContainer>
                                <UI.LinkText>Autenticação Biométrica?</UI.LinkText>

                                <UI.Link onPress={fazerAutenticacaoBiometrica}>
                                    <UI.LinkLabel>Clique aqui.</UI.LinkLabel>
                                </UI.Link>
                            </UI.LinkContainer>
                        }

                        <Input
                            ref={_inputCPF}
                            placeholder="CPF"
                            icon="finger-print"
                            iconSource="ionicon"
                            onChange={handleChangeCPF}
                            disabled={isCarregando}
                            error={cpfError}
                            mask={Masks.BRL_CPF}
                            keyboard="number-pad"
                            nextInput={_inputPassword.current}
                            submitButton="next"
                        />

                        <Input
                            ref={_inputPassword}
                            placeholder="Senha"
                            icon="lock"
                            onChange={handleChangeSenha}
                            disabled={isCarregando}
                            error={senhaError}
                            submitButton="done"
                            onSubmit={handleAcessar}
                            uppercase="none"
                            keyboard="default"
                            password
                        />

                        <Separator />

                        <UI.ActionContainer>
                            <Button
                                type="submit"
                                icon="login"
                                iconFont="ant-design"
                                rounding
                                loading={isCarregando}
                                onClick={handleAcessar}>
                                Acessar
                            </Button>
                        </UI.ActionContainer>
                    </UI.Form>

                    {!isKeyboardVisible && AppConfig.auth.forgotPassword &&
                        <UI.Links>
                            <UI.LinkContainer>
                                <UI.LinkText>Esqueceu sua senha?</UI.LinkText>

                                <UI.Link onPress={() => navigation.navigate(AUTH_SCREENS.EsqueciMinhaSenha)}>
                                    <UI.LinkLabel>Clique aqui.</UI.LinkLabel>
                                </UI.Link>
                            </UI.LinkContainer>

                            {/* <Separator />

                            <UI.LinkAlternate onPress={solicitarPreCadastro}>
                                <UI.LinkLabelAlternate>Fazer cadastro</UI.LinkLabelAlternate>
                            </UI.LinkAlternate> */}
                        </UI.Links>
                    }
                </UI.Container >
            </AppScrollView>

            <ModalAceitacaoTermos
                visible={modalAceitacaoTermosVisivel}
                handleDeny={rejeitarTermos}
                handleAccept={aceitarTermos} />

            <Messager ref={_messager} />
            <Warning />
        </>
    )
}

export default LoginScreen