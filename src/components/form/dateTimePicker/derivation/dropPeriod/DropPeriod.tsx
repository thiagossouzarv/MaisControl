import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"

import * as UI from "./DropPeridStyle"
import * as DUI from "../../../dropdown/DropdownStyle"
import Separator from "../../../../utils/separator/Separator"
import InputError from "../../../inputError/InputError"
import { TouchableOpacity } from "react-native"
import ModalDateTimePicker from "../modalDateTimePicker/ModalDateTimePicker"
import Moment from "../../../../../utils/date"

interface DropPeriodProps {
    onChange: (dataInicial: Date, dataFinal: Date) => void
    label?: string
    variant?: "default" | "fit"
    error?: string
    labelMinWidth?: number
    initialValueDataInicio?: string
    initialValueDataFinal?: string
}

const DropPeriod: React.FC<DropPeriodProps> = ({
    label,
    variant = "default",
    error,
    labelMinWidth,
    onChange,
    initialValueDataFinal,
    initialValueDataInicio
}) => {
    const _diaFotoLabel = useRef<"data_inicial" | "data_final">("data_inicial")

    const comecoDataInicial = useMemo(() => {
        return !!initialValueDataInicio ? Moment.fromDateString(initialValueDataInicio) : undefined
    }, [initialValueDataInicio])

    const comecoDataFinal = useMemo(() => {
        return !!initialValueDataFinal ? Moment.fromDateString(initialValueDataFinal) : undefined
    }, [initialValueDataFinal])

    const [dataInicial, setDataInicial] = useState<Date>(Moment.addDays(comecoDataInicial || new Date(), -6))
    const [dataFinal, setDataFinal] = useState<Date>(comecoDataFinal || new Date())

    const [modalSelecaoAberto, setModalSelecaoAberto] = useState(false)

    useEffect(function atualizarValorInicialDataInicial() {
        if (initialValueDataInicio) setDataInicial(Moment.fromDateString(initialValueDataInicio))
    }, [initialValueDataInicio])

    useEffect(function atualizarValorInicialDataFinal() {
        if (initialValueDataFinal) setDataFinal(Moment.fromDateString(initialValueDataFinal))
    }, [initialValueDataFinal])

    useEffect(function repassarDatas() {
        onChange(dataInicial, dataFinal)
    }, [dataInicial, dataFinal])

    const handleCloseModalSelecao = useCallback(() => {
        setModalSelecaoAberto(false)
    }, [])

    const handleOpenModalSelecaoDataInicial = () => {
        _diaFotoLabel.current = "data_inicial"
        setModalSelecaoAberto(true)
    }

    const handleOpenModalSelecaoDataFinal = () => {
        _diaFotoLabel.current = "data_final"
        setModalSelecaoAberto(true)
    }

    const handleChangeData = useCallback((data?: Date) => {
        if (!data) return
        if (_diaFotoLabel.current === "data_inicial") setDataInicial(data)
        else setDataFinal(data)
    }, [])

    const isFit = variant === "fit"

    return (
        <>
            <DUI.Container disabled>
                {!!label && !isFit && <DUI.Label error={error}>{label}</DUI.Label>}
                <DUI.Content variant={variant}>
                    <DUI.TextContainer variant={variant}>
                        {!!label && isFit && <>
                            <DUI.Label minWidth={labelMinWidth} error={error}>{label}</DUI.Label>
                            <Separator gap="md" vertical />
                        </>}
                        <UI.Content>
                            <TouchableOpacity onPress={handleOpenModalSelecaoDataInicial}>
                                <DUI.Text variant={variant} error={error}>
                                    <UI.DatePicker>{Moment.formatDate(dataInicial)}</UI.DatePicker>
                                </DUI.Text>
                            </TouchableOpacity>

                            <UI.Separator variant={variant}>à</UI.Separator>

                            <TouchableOpacity onPress={handleOpenModalSelecaoDataFinal}>
                                <DUI.Text variant={variant} error={error}>
                                    <UI.DatePicker>{Moment.formatDate(dataFinal)}</UI.DatePicker>
                                </DUI.Text>
                            </TouchableOpacity>
                        </UI.Content>
                    </DUI.TextContainer>
                    <Separator gap={isFit ? "sm" : "md"} vertical />
                    <DUI.Icon
                        error={error}
                        icon="caret-down"
                        iconSource="font-awesome"
                        iconSize={isFit ? "xs" : "sm"}
                        variant={variant} />
                </DUI.Content>

                {!isFit && <DUI.Divider error={error} />}
                {!isFit && <InputError error={error} />}
            </DUI.Container>

            <ModalDateTimePicker
                visible={_diaFotoLabel.current === "data_inicial" && modalSelecaoAberto}
                handleClose={handleCloseModalSelecao}
                handleSubmit={handleChangeData}
                initialValue={initialValueDataInicio}
                maxDate={Moment.formatDate(dataFinal)} />

            <ModalDateTimePicker
                visible={_diaFotoLabel.current === "data_final" && modalSelecaoAberto}
                handleClose={handleCloseModalSelecao}
                handleSubmit={handleChangeData}
                initialValue={initialValueDataFinal}
                minDate={Moment.formatDate(dataInicial)} />
        </>
    )
}

export default DropPeriod