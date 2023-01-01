import { useNetInfo } from "@react-native-community/netinfo"
import React, { useEffect, useState } from "react"
import useTrackingMounting from "../../../hooks/core/useTrackingMounting"
import AsyncUtils from "../../../utils/async"

import * as UI from "./WarningStyle"

const Warning = () => {
    const connection = useNetInfo()
    const { execSafe } = useTrackingMounting()

    const [carregando, setCarregando] = useState(true)

    const error = !connection.isConnected ? "Sem conexão com internet!" : null

    useEffect(function carregar() {
        const load = async () => {
            await AsyncUtils.waitAMoment(2000)
            execSafe(() => setCarregando(false))
        }

        () => load()
    }, [])

    if (!error?.length || carregando) return null

    return (
        <UI.Container>
            <UI.Message>{error}</UI.Message>
        </UI.Container>
    )
}

export default Warning
