import React, { useCallback, useImperativeHandle, useLayoutEffect, useState } from "react"
import { TouchableOpacity } from "react-native"
import AsyncUtils from "../../../../../utils/async"
import Moment from "../../../../../utils/date"
import HeaderNavigator from "../../../../utils/navigator/headerNavigator/HeaderNavigator"
import ModalMonthPicker from "../../../monthPicker/derivation/modalMonthPicker/ModalMonthPicker"

import * as UI from "./HeaderStyle"

export interface DateTimePickerHeaderHandler {
    setMonth: (dataMes: Date) => void
}

interface HeaderProps {
    initialValue?: Date
    onChange: (mes?: Date) => void
    onToggleMonthModal?: (opened: boolean) => void
    variant: "modal" | "default"
}

const Header = React.forwardRef<DateTimePickerHeaderHandler, HeaderProps>(({
    initialValue,
    onChange,
    onToggleMonthModal,
    variant
}, ref) => {
    const [mes, setMes] = useState<Date | undefined>(initialValue || Moment.firstDayOfMonth())

    const [modalMesVisivel, setModalMesVisivel] = useState(false)

    useLayoutEffect(function repassarMes() {
        onChange(mes)
    }, [mes])

    useLayoutEffect(function repassarFechamentoMonthModal() {
        if (!modalMesVisivel && onToggleMonthModal) onToggleMonthModal(false)
    }, [modalMesVisivel])

    const openModalMes = useCallback(async () => {
        if (onToggleMonthModal) onToggleMonthModal(true)
        await AsyncUtils.waitAMoment()
        setModalMesVisivel(true)
    }, [])

    const closeModalMes = useCallback(() => {
        setModalMesVisivel(false)
    }, [])

    const handleChangeMes = useCallback((dataMes?: Date) => {
        if (dataMes) setMes(dataMes)
    }, [])

    const next = useCallback(() => {
        setMes(mes => !mes ? mes : Moment.nextMonth(mes))
    }, [])

    const previous = useCallback(() => {
        setMes(mes => !mes ? mes : Moment.previousMonth(mes))
    }, [])

    useImperativeHandle(ref, (): DateTimePickerHeaderHandler => {
        return {
            setMonth: setMes
        }
    })

    return (
        <HeaderNavigator
            handleNext={next}
            handlePrevius={previous}>
            <TouchableOpacity onPress={openModalMes}>
                <UI.Container>
                    <UI.Label>{mes ? Moment.formatMonthYear(mes) : "-"}</UI.Label>
                </UI.Container>
            </TouchableOpacity>
            {variant != "modal" &&
                <ModalMonthPicker
                    handleClose={closeModalMes}
                    handleSubmit={handleChangeMes}
                    visible={modalMesVisivel} />
            }
        </HeaderNavigator>
    )
})

export default React.memo(Header)