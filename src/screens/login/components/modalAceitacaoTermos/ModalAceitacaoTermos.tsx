import React, { useEffect, useState } from "react"
import { Linking } from "react-native"
import { useTheme } from "styled-components/native"
import { Bold } from "../../../../components/core"
import { Button, Check } from "../../../../components/form"

import { Icon } from "../../../../components/ui"
import { AppModal, AppScrollView, Separator } from "../../../../components/utils"
import { AppTheme } from "../../../../core/theme"

import * as UI from "./ModalAceitacaoTermosStyle"

interface AceitacaoTermosModalProps {
    visible: boolean
    handleDeny: () => void
    handleAccept: () => void
}

const AceitacaoTermosModal: React.FC<AceitacaoTermosModalProps> = ({
    visible,
    handleDeny,
    handleAccept,
}) => {

    const theme: AppTheme = useTheme()

    const [termosAceito, setTermosAceito] = useState(false)
    const [politicaAceita, setPoliticaAceita] = useState(false)

    useEffect(function verificarAceite() {
        if (termosAceito && politicaAceita) handleAccept()
    }, [termosAceito, politicaAceita])

    function abrirTermosUso() {
        Linking.openURL("https://lutcode.com.br/apps/drtask/termodeuso/")
    }

    function abrirPoliticaPrivacidade() {
        Linking.openURL("https://lutcode.com.br/apps/drtask/politicaprivacidade/")
    }

    return (
        <AppModal
            animationType="slide"
            visible={visible} >
            <UI.Container>
                <AppScrollView>
                    <Separator gap="md" />
                    <UI.Header>
                        <Icon
                            icon="shield-checkmark-outline"
                            iconSource="ionicon"
                            iconSize={theme.metrics.icon.xl}
                            color={theme.login.icon.fg}
                            style={{ marginBottom: theme.metrics.spacing.md }} />

                        <Separator />

                        <UI.Title>Termos de <Bold style={{ color: theme.colors.fg.main_dark }}>Uso</Bold></UI.Title>
                        <UI.Subtitle>Para acessar o aplicativo <Bold>leia</Bold> e <Bold>aceite</Bold> nossos Termos de Uso!</UI.Subtitle>
                    </UI.Header>

                    <UI.Link onPress={abrirTermosUso}>
                        <UI.LinkText>Ler termos de uso</UI.LinkText>
                    </UI.Link>

                    <UI.CheckContainer>
                        <Check
                            onChange={setTermosAceito}
                            startChecked={false}
                            value={1}
                            dark
                        >
                            <UI.Label>Aceitar Termos de Uso</UI.Label>
                        </Check>
                    </UI.CheckContainer>

                    <Separator gap="xl" />

                    <UI.Header>
                        <UI.Title>Potílica de <Bold style={{ color: theme.colors.fg.main_dark }}>Privacidade</Bold></UI.Title>
                        <UI.Subtitle>Para acessar o aplicativo <Bold>leia</Bold> e <Bold>aceite</Bold> nossa Política de Privacidade!</UI.Subtitle>
                    </UI.Header>

                    <UI.Link onPress={abrirPoliticaPrivacidade}>
                        <UI.LinkText>Ler política de privacidade</UI.LinkText>
                    </UI.Link>

                    <UI.CheckContainer>
                        <Check
                            onChange={setPoliticaAceita}
                            startChecked={false}
                            value={1}
                            dark
                        >
                            <UI.Label>Aceitar Política de Privacidade</UI.Label>
                        </Check>
                    </UI.CheckContainer>
                </AppScrollView>

                <UI.Footer>
                    <Button
                        type="basic"
                        onClick={handleDeny}
                        rounding>
                        Cancelar
                    </Button>
                </UI.Footer>
            </UI.Container>
        </AppModal >
    )
}

export default React.memo(AceitacaoTermosModal)