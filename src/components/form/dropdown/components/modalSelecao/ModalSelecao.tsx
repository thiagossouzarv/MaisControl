import React, { useCallback, useEffect, useRef, useState } from "react"
import { ForegroundColors } from "../../../../../core/theme"
import useTrackingMounting from "../../../../../hooks/core/useTrackingMounting"
import ArrayUtils from "../../../../../utils/array"
import AsyncUtils from "../../../../../utils/async"
import { ImagePlaceholder } from "../../../../../utils/midia"
import { FloatButtonSpace } from "../../../../core"
import { Messager, MessagerHandler } from "../../../../dialogs"
import { IconType } from "../../../../ui"
import { AppFlatList, AppFlatListHandler, AppModal, NoItem, PageHeaderNavigator, PageLoading, Separator } from "../../../../utils"
import FixedButton from "../../../fixedButton/FixedButton"
import ListItem from "../../../list/listItem/ListItem"
import SwipeLoaderList from "../../../list/swipeLoader/SwipeLoader"
import Search from "../../../search/Search"

import * as UI from "./ModalSelecaoStyle"

interface ModalSelecaoProps {
    visible: boolean
    handleClose: () => void
    onSubmit: (itens: any[]) => void
    title: string
    data: any[]
    map: DropdownMap
    multiple?: boolean
}

const ModalSelecao: React.FC<ModalSelecaoProps> = ({
    visible,
    handleClose,
    onSubmit,
    title,
    data,
    map,
    multiple = false
}) => {
    const { execSafe } = useTrackingMounting()

    const _pesquisa = useRef("")
    const _messager = useRef<MessagerHandler>()
    const _lista = useRef<AppFlatListHandler>()
    const _lastSelection = useRef<any[]>([])

    const [itens, setItens] = useState<any[]>([])
    const [selection, setSelection] = useState<any[]>([])

    const [carregando, setCarregando] = useState(true)
    const [carregandoPagina, setCarregandoPagina] = useState(true)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(function carregarPagina() {
        carregar("load")
    }, [data])

    const carregar = async (tipo: "load" | "search" | "refresh") => {
        try {
            if (tipo === "search") setRefreshing(true)

            setItens(_pesquisa.current ? data.filter(item => {
                const sources = [
                    typeof map.title === "function" ? map.title(item) : item[map.title],
                    map.detail ? (typeof map.detail === "function" ? map.detail(item) : item[map.detail]) : "",
                    map.subtitle ? (typeof map.subtitle === "function" ? map.subtitle(item) : item[map.subtitle]) : ""]
                    .filter(str => !!str.length)

                return ArrayUtils.containsMany(_pesquisa.current, sources)
            }) : data)

        } catch (error: any) {
            execSafe(() => _messager.current?.setError(error.userMessage || "Falha ao carregar itens."))

        } finally {
            execSafe(() => {
                setCarregando(false)
                setCarregandoPagina(false)
                setRefreshing(false)

                if (tipo === "search" || "load") _lista.current?.scrollToTop()
            })
        }
    }

    const cancel = () => {
        setSelection(_lastSelection.current)
        handleClose()
    }

    const submit = () => {
        _lastSelection.current = selection
        onSubmit(selection)
        handleClose()
    }

    const submitSingle = useCallback((selection: any[]) => {
        _lastSelection.current = selection
        onSubmit(selection)
        handleClose()
    }, [onSubmit, handleClose])

    const handleChangePesquisa = useCallback(AsyncUtils.debounce((texto: string) => {
        _pesquisa.current = texto
        carregar("search")

    }, 600), [carregar])

    const handleSubmitPesquisa = useCallback(() => {
        carregar("search")
    }, [carregar])

    const handlePressItem = useCallback((item: any) => {
        if (!multiple)
            return submitSingle([item])

        setSelection(preselecao => {
            const idx = preselecao.findIndex(obj => obj[map.key] === item[map.key])
            let newSelection = [...preselecao]

            if (idx >= 0) newSelection.splice(idx, 1)
            else if (multiple) newSelection.push(item)
            else newSelection = [item]

            return newSelection
        })
    }, [multiple, submitSingle])

    const renderItem = ({ item }: any) => {
        return (
            <ListItem
                onPress={handlePressItem}
                dataItem={item}
                selected={multiple && selection.some(obj => obj[map.key] === item[map.key])}
                title={typeof map.title === "function" ? map.title(item) : item[map.title]}
                subtitle={map.subtitle ? (typeof map.subtitle === "function" ? map.subtitle(item) : item[map.subtitle]) : undefined}
                detail={map.detail ? (typeof map.detail === "function" ? map.detail(item) : item[map.detail]) : undefined}
                avatarURI={map.image ? item[map.image] : undefined}
                avatarPlaceholder={map.image ? (map.imagePlaceholder || "picture") : undefined}
                avatarExternalURI={map.imageExternalURI || false}
                icon={map.icon}
                iconSource={map.iconSource}
                iconColor={map.iconColor}
                avatarSize="sm" />
        )
    }

    return (
        <AppModal
            visible={visible}
            transparent={false}
            animationType="slide"
            onRequestClose={cancel} >
            <UI.Container>
                <PageHeaderNavigator
                    onBackPress={cancel}
                    title={title} />

                <Separator gap="lg" />
                <UI.SearchContainer>
                    <Search
                        onChange={handleChangePesquisa}
                        placeholder="Pesquise aqui..."
                        icon="search"
                        iconSource="ionicon"
                        iconButton
                        onPressButton={handleSubmitPesquisa}
                        errorMessageEnabled={false} />
                </UI.SearchContainer>
                <Separator />

                {!!itens?.length &&
                    <AppFlatList
                        ref={_lista}
                        style={{ flex: 1 }}
                        data={itens}
                        keyExtractor={item => item[map.key]}
                        renderItem={renderItem}
                        refreshControl={(
                            <SwipeLoaderList
                                refreshing={refreshing}
                                onRefresh={() => carregar("refresh")} />
                        )}
                        ListFooterComponent={multiple ? <FloatButtonSpace /> : undefined}
                    />
                }

                {!itens?.length && !carregandoPagina &&
                    <NoItem
                        image="default"
                        title="Nenhum item encontrado!"
                        message="Faça uma nova busca para encontrar o item pretendido." />
                }
            </UI.Container>

            <FixedButton
                type="confirm"
                onPress={submit}
                visible={multiple && !!selection.length} />

            <PageLoading visible={carregando || carregandoPagina} white={carregandoPagina} />
            <Messager ref={_messager} />
        </AppModal>
    )
}

export default ModalSelecao

export interface DropdownMap {
    key: string
    title: string | ((item: any) => (string | undefined))
    subtitle?: string | ((item: any) => (string | undefined))
    detail?: string | ((item: any) => (string | undefined))
    image?: string
    imageExternalURI?: boolean
    imagePlaceholder?: ImagePlaceholder
    icon?: string
    iconSource?: IconType
    iconColor?: ForegroundColors
}