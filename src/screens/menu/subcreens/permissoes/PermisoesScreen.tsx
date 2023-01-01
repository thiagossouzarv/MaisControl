import React, { useEffect, useRef, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Messager, MessagerHandler } from "../../../../components/dialogs"
import { AppScrollView } from "../../../../components/utils"
import useTrackingMounting from "../../../../hooks/core/useTrackingMounting"

import * as UI from "./PermissoesScreenStyle"
import { STORAGE_ID_USER_TOKEN } from "../../../../constants/globals"
import { useAuth } from "../../../../contexts/auth"
import AuthService from "../../../../services/core/auth"
import { ListItem, ListItemHandler } from "../../../../components/form"
import { AppConfig } from "../../../../core/config"

interface PermissoesScreenProps {

}

const PermissoesScreen: React.FC<PermissoesScreenProps> = () => {
    const { user } = useAuth()
    const { execSafe } = useTrackingMounting()

    const _messager = useRef<MessagerHandler>()
    const _toggleBioAuth = useRef<ListItemHandler>()

    const [toggleBioAuthEnabled, setToggleBioAuthEnabled] = useState(false)

    useEffect(function carregarPagina() {
        const load = async () => {
            try {
                if (AppConfig.auth.bioAuthentication) {
                    const bio = await AuthService.getBioAuthenticationStoraged()
                    execSafe(() => _toggleBioAuth.current?.setToggle(!!bio.cpf && user?.cpf === bio.cpf))
                    if (!!bio.cpf && user?.cpf != bio.cpf) AuthService.storageBioAuthentication({ cpf: null, token: null })
                }

            } finally {
                execSafe(() => setToggleBioAuthEnabled(true))
            }
        }

        load()
    }, [])

    const toggleBioEnabled = async (bioAuthActive: boolean) => {
        try {
            setToggleBioAuthEnabled(false)

            const token = (await AsyncStorage.getItem(STORAGE_ID_USER_TOKEN)) || ""
            let bioAuth = bioAuthActive ? { cpf: user?.cpf || null, token: token as string } : { cpf: null, token: null }
            await AuthService.storageBioAuthentication(bioAuth)

        } catch (error: any) {
            _toggleBioAuth.current?.setToggle(val => !val)
            execSafe(() => _messager.current?.setError(error?.userMessage || "Falha ao alterar configuração de autenticação."))

        } finally {
            execSafe(() => setToggleBioAuthEnabled(true))
        }
    }

    return (
        <UI.Container>
            <AppScrollView>
                {AppConfig.auth.bioAuthentication &&
                    <ListItem
                        ref={_toggleBioAuth}
                        title="Autenticação Biométrica"
                        subtitle="Autentique-se pela digital"
                        disabled={!toggleBioAuthEnabled}
                        onPress={toggleBioEnabled}
                        toggleEnabled />
                }
            </AppScrollView>

            <Messager ref={_messager} />
        </UI.Container>

    )
}

export default PermissoesScreen