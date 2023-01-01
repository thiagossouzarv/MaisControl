import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useTheme } from "styled-components/native"
import { AppTheme } from "../../../../../core/theme"
import useKeyboard from "../../../../../hooks/core/useKeyboard"
import Moment from "../../../../../utils/date"
import { AppModal, Divider, Separator } from "../../../../utils"
import Footer from "../../../../utils/appModal/components/footer/Footer"
import InlineMonthPicker, { InlineMonthPickerHandler } from "../../../monthPicker/derivation/inlineMonthPicker/InlineMonthPicker"
import DateTimePicker, { DateTimePickerHandler } from "../../DateTimePicker"

import * as UI from "./ModalDateTimePickerStyle"

interface ModalDateTimePickerProps {
    visible: boolean
    handleClose: () => void
    handleSubmit: (dataMes?: Date) => void
    minDate?: string
    maxDate?: string
    initialValue?: string
}

const ModalDateTimePicker: React.FC<ModalDateTimePickerProps> = ({
    visible,
    handleClose,
    handleSubmit,
    minDate,
    maxDate,
    initialValue
}) => {
    const theme: AppTheme = useTheme()

    const dataComeco: (Date | undefined) = useMemo(() => {
        return !!initialValue ? Moment.fromDateString(initialValue) : undefined
    }, [initialValue])

    const _monthPicker = useRef<InlineMonthPickerHandler>()
    const _datePicker = useRef<DateTimePickerHandler>()
    const _diaInicial = useRef<Date>(dataComeco || new Date())

    const [dia, setDia] = useState<Date | undefined>(dataComeco || new Date())

    const [modalMesAberto, setModalMesAberto] = useState(false)

    useEffect(function atualizarMesInicial() {
        if (!visible)
            _diaInicial.current = dia

    }, [visible])

    useEffect(function atualizarValorInicial() {
        setDia(dataComeco)
    }, [Moment.formatDate(dataComeco)])

    const cancel = useCallback(() => {
        setDia(_diaInicial.current)
        handleClose()
    }, [handleClose])

    const submit = useCallback(() => {
        handleSubmit(dia)
        handleClose()
    }, [dia, handleClose, handleSubmit])

    const handlePressDay = useCallback((data?: Date) => {
        if (data) {
            setDia(data)
            handleSubmit(data)
            handleClose()
        }
    }, [handleClose, handleSubmit])

    const handleToggleModal = useCallback((opened: boolean) => {
        setModalMesAberto(opened)
    }, [])

    const closeModalMes = useCallback(() => {
        setModalMesAberto(false)
    }, [])

    const handleChangeMonth = useCallback((data?: Date) => {
        _monthPicker.current?.setMes(data)
    }, [])

    const handleSubmitMonth = useCallback((dataMes?: Date) => {
        _datePicker.current?.navigateToMonth(dataMes || new Date())
    }, [])

    const handleClickHoje = useCallback(() => {
        const hoje = new Date()
        setDia(hoje)
        _datePicker.current?.setData(hoje)
        _datePicker.current?.navigateToMonth(hoje)
    }, [])

    return (
        <AppModal
            visible={visible}
            onRequestClose={cancel}
            transparent
            animationType="fade">
            <UI.Container>
                <UI.Card>
                    <Separator gap="sm" />
                    <DateTimePicker
                        ref={_datePicker}
                        onChange={setDia}
                        onChangeMonth={handleChangeMonth}
                        onToggleMonthModal={handleToggleModal}
                        onPressDay={handlePressDay}
                        initialValue={_diaInicial.current}
                        minDate={minDate}
                        maxDate={maxDate}
                        variant="modal" />
                    <Divider gap="xs" margin="md" />
                    <Footer
                        handleCancel={cancel}
                        handleSubmit={submit}
                        extraButtonSubmit={handleClickHoje}
                        extraButton="Hoje" />

                    <InlineMonthPicker
                        ref={_monthPicker}
                        handleClose={closeModalMes}
                        handleSubmit={handleSubmitMonth}
                        visible={modalMesAberto}
                        initialValue={_diaInicial.current} />
                </UI.Card>
            </UI.Container>
        </AppModal>
    )
}

export default React.memo(ModalDateTimePicker)