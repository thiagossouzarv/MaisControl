import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from "react"
import useKeyboard from "../../../../../hooks/core/useKeyboard"
import { Grow } from "../../../../core"
import { Divider, Separator } from "../../../../utils"
import Footer from "../../../../utils/appModal/components/footer/Footer"
import MonthPicker from "../../MonthPicker"

import * as UI from "./InlineMonthPickerStyle"

export interface InlineMonthPickerHandler {
    setMes: (dataMes?: Date) => void
}

interface InlineMonthPickerProps {
    visible: boolean
    handleClose: () => void
    handleSubmit: (dataMes?: Date) => void
    initialValue?: Date
}

const InlineMonthPicker = React.forwardRef<InlineMonthPickerHandler, InlineMonthPickerProps>(({
    visible,
    handleClose,
    handleSubmit,
    initialValue
}, ref) => {
    const { isKeyboardVisible } = useKeyboard()

    const _mesInicial = useRef<Date | undefined>(initialValue || new Date())

    const [mes, setMes] = useState<Date | undefined>(initialValue || new Date())

    useEffect(function atualizarMesInicial() {
        if (!visible)
            _mesInicial.current = mes

    }, [visible])

    const cancel = useCallback(() => {
        setMes(_mesInicial.current)
        handleClose()
    }, [handleClose])

    const submit = useCallback(() => {
        handleSubmit(mes)
        handleClose()
    }, [mes, handleClose, handleSubmit])

    const forceSetMes = useCallback((dataMes?: Date) => {
        setMes(dataMes)
        _mesInicial.current = dataMes
    }, [])

    useImperativeHandle(ref, (): InlineMonthPickerHandler => {
        return {
            setMes: forceSetMes
        }
    })

    if (!visible) return null

    return (
        <UI.Container>
            <UI.Card style={isKeyboardVisible ? { flex: 0, justifyContent: "center" } : {}}>
                <Separator gap="xs" />
                <MonthPicker
                    onChange={setMes}
                    initialValue={_mesInicial.current} />
                <Separator />
                {!isKeyboardVisible && <Grow />}
                <Divider gap="xs" margin="md" />
                {!isKeyboardVisible &&
                    <Footer
                        handleCancel={cancel}
                        handleSubmit={submit} />
                }
            </UI.Card>
        </UI.Container>
    )
})

export default InlineMonthPicker