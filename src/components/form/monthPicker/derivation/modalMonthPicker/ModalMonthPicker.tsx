import React, { useCallback, useEffect, useRef, useState } from "react"
import { AppModal, Divider, Separator } from "../../../../utils"
import Footer from "../../../../utils/appModal/components/footer/Footer"
import MonthPicker from "../../MonthPicker"

import * as UI from "./ModalMonthPickerStyle"

interface ModalMonthPickerProps {
    visible: boolean
    handleClose: () => void
    handleSubmit: (dataMes?: Date) => void
}

const ModalMonthPicker: React.FC<ModalMonthPickerProps> = ({
    visible,
    handleClose,
    handleSubmit
}) => {
    const _mesInicial = useRef<Date>()

    const [mes, setMes] = useState<Date>()

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

    return (
        <AppModal
            visible={visible}
            onRequestClose={cancel}                        
            transparent
            animationType="fade">
            <UI.Container>
                <UI.Card>
                    <Separator gap="xs" />
                    <MonthPicker 
                        onChange={setMes}
                        initialValue={_mesInicial.current} />
                    <Separator />
                    <Divider gap="xs" margin="md" />
                    <Footer
                        handleCancel={cancel}
                        handleSubmit={submit} />
                </UI.Card>
            </UI.Container>
        </AppModal>
    )
}

export default React.memo(ModalMonthPicker)