import React, { useCallback, useEffect, useState } from "react"
import NumberUtils from "../../../utils/number"
import { Divider, Separator } from "../../utils"
import InputError from "../inputError/InputError"
import ModalSelecao, { DropdownMap } from "./components/modalSelecao/ModalSelecao"

import * as UI from "./DropdownStyle"

interface DropdownProps {
    label?: string
    labelMinWidth?: number
    modalTitle: string
    onChange: (selection?: any[] | any) => void
    placeholder?: string
    data: any[]
    error?: string
    map: DropdownMap
    multiple?: boolean
    initialSelection?: any[] | any
    variant?: "fit" | "default"
}

const Dropdown: React.FC<DropdownProps> = ({
    label,
    labelMinWidth,
    modalTitle,
    placeholder,
    error,
    data,
    map,
    multiple,
    onChange,
    initialSelection,
    variant = "default"
}) => {

    const [selection, setSelection] = useState<any[]>([])

    const [modalSelecaoAberto, setModalSelecaoAberto] = useState(false)

    useEffect(function atualizarSelecaoInicial() {
        setSelection(initialSelection ? Array.isArray(initialSelection) ? initialSelection : [initialSelection] : [])
    }, [initialSelection])

    const handleCloseModalSelecao = useCallback(() => {
        setModalSelecaoAberto(false)
    }, [])

    const submitSelection = useCallback((itens: any[]) => {
        setSelection(itens)
        onChange(multiple ? itens : itens.length ? itens[0] : undefined)
    }, [multiple])

    const isFit = variant === "fit"

    return (
        <>
            <UI.Container onPress={() => setModalSelecaoAberto(true)}>
                {!!label && !isFit && <UI.Label error={error}>{label}</UI.Label>}

                <UI.InputContainer
                disabled={false}
                error={!!error}>
                <UI.Content variant={variant}>
                    <UI.TextContainer variant={variant}>
                        {!!label && isFit && <>
                            <UI.Label minWidth={labelMinWidth} error={error}>{label}</UI.Label>
                            <Separator gap="md" vertical />
                        </>}
                        {selection.length ?
                            <UI.Text variant={variant} error={error}>{selection.map(o => o[map.title]).join(", ")}</UI.Text> :
                            <UI.Placeholder variant={variant} error={error}>{placeholder}</UI.Placeholder>
                        }
                    </UI.TextContainer>
                    <Separator gap={isFit ? "sm" : "md"} vertical />
                    <UI.Icon
                        error={error}
                        icon="caret-down"
                        iconSource="font-awesome"
                        iconSize={isFit ? "xs" : "sm"}
                        variant={variant} />
                </UI.Content>

                </UI.InputContainer>

                {!isFit && <UI.Divider error={error} />}

                {!isFit && <InputError error={error} />}
            </UI.Container>

            <ModalSelecao
                visible={modalSelecaoAberto}
                handleClose={handleCloseModalSelecao}
                onSubmit={submitSelection}
                title={modalTitle}
                data={data}
                map={map}
                multiple={multiple} />
        </>
    )
}

export default Dropdown