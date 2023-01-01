import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from "react"
import { FlatList } from "react-native-gesture-handler"
import { PageBaseProps } from "../../components/core"
import { Messager, MessagerHandler } from "../../components/dialogs"
import { NoItemList } from "../../components/form"
import { AppFlatList, AppFlatListHandler, PageLoading } from "../../components/utils"
import useTrackingMounting from "../../hooks/core/useTrackingMounting"
import EstoqueService, { Tanque } from "../../services/business/estoque"
import Moment from "../../utils/date"
import Item from "./components/item/Item"
import TanqueItem from "./components/tanque/Tanque"

import * as UI from "./TanquesScreenStyle"

export interface TanquesScreenHandler {
    resetScroll: () => void
}

interface TanquesScreenProps extends PageBaseProps {

}

const TanquesScreen = React.forwardRef<TanquesScreenHandler, TanquesScreenProps>((props, ref) => {
    const { execSafe } = useTrackingMounting()

    const _messager = useRef<MessagerHandler>()
    const _lista = useRef<AppFlatListHandler>()

    const [tanques, setTanques] = useState<Tanque[]>([])

    const [carregandoPagina, setCarregandoPagina] = useState(true)
    const [carregando, setCarregando] = useState(true)

    useEffect(function atualizarTanques() {
        const loop = setInterval(carregarTanques, Moment.msFromMinutes(5))

        return () => clearInterval(loop)
    }, [])

    const carregarTanques = useCallback(async () => {
        try {
            const resp = await EstoqueService.getTanques()
            setTanques(resp)         

        } catch(error: any) {
            execSafe(() => _messager.current?.setError(error.userMessage || ""))

        } finally {
            execSafe(() => {
                setCarregando(false)
                setCarregandoPagina(false)
            })
        }
    }, [])

    useEffect(function carregarPagina() {
        carregarTanques()
    }, [carregarTanques])

    const resetScroll = useCallback(() => {
        _lista.current?.scrollToTop()
    }, [])

    const renderItem = ({ item }: any) => {
        return <Item tanque={item} />
    }

    useImperativeHandle(ref, (): TanquesScreenHandler => {
        return {
            resetScroll
        }
    })
    
    return (
        <UI.Container>            
            <AppFlatList
                ref={_lista}
                data={tanques}
                renderItem={renderItem}
                ListEmptyComponent={NoItemList} />        

            <Messager ref={_messager} />
            <PageLoading 
                visible={carregandoPagina || carregando}
                white={carregandoPagina} />
        </UI.Container>
    )
})

export default TanquesScreen