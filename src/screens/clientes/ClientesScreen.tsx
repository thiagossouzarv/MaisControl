import { NavigationProp, useFocusEffect } from "@react-navigation/native"
import React, { useCallback, useRef, useState } from "react"
import { FlatList } from "react-native"
import { PageBaseProps } from "../../components/core"
import { Messager, MessagerHandler } from "../../components/dialogs"
import { AppScrollView, PageLoading } from "../../components/utils"
import { useAuth } from "../../contexts/auth"
import useTrackingMounting from "../../hooks/core/useTrackingMounting"
import { APP_SCREENS } from "../../routes/screens"
import { Cliente } from "../../services/core/auth"
import UIUtils from "../../utils/ui"

import * as UI from "./ClientesScreenStyle"
import Item from "./components/item/Item"

interface ClientesScreenProps extends PageBaseProps {    
}

const ClientesScreen: React.FC<ClientesScreenProps> = ({
    navigation,
    route
}) => {
    const { cpf, senha } = route.params || {}
    const { user, signIn, clientes } = useAuth()
    const { execSafe } = useTrackingMounting()

    const _messager = useRef<MessagerHandler>()
    const _lista = useRef<FlatList<Cliente>>()

    const [carregando, setCarregando] = useState(false)

    useFocusEffect(useCallback(function resetarScroll() {
        UIUtils.scrollFlatlistToTop(_lista.current)
    }, []))

    const changeClient = useCallback(async (cliente: Cliente) => {
        try {
            setCarregando(true)
            await signIn(cpf, senha, false, false, cliente.IdCliente)            

        } catch(error: any) {
            execSafe(() => _messager.current?.setError(error?.userMessage || "Falha ao atualizar o cliente."))

        } finally {
            execSafe(() => setCarregando(false))
        }     
    }, [navigation, cpf, senha])

    const renderItem = ({ item: cliente }: { item: Cliente }) => {
        return <Item
            key={cliente.IdCliente}
            cliente={cliente}
            onPress={changeClient} />
    }

    return (
        <UI.Container>
            <FlatList
                ref={_lista}
                renderItem={renderItem}
                data={clientes || []}
                keyExtractor={cliente => cliente.IdCliente.toString()} />  

            <Messager ref={_messager} />   
            <PageLoading visible={carregando} />       
        </UI.Container>
    )
}

export default ClientesScreen