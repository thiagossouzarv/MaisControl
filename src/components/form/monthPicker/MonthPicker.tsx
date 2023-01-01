import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import Header from "./components/header/Header"
import Month, { EmptyRow } from "./components/month/Month"
import Moment from "../../../utils/date";

import * as UI from "./MonthPickerStyle"
import { Separator } from "../../utils";
import AsyncUtils from "../../../utils/async";

const MONTHS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"]

interface MonthPickerProps {
    initialValue?: Date,
    onChange: (dataMes?: Date) => void
}

const MonthPicker: React.FC<MonthPickerProps> = ({
    initialValue,
    onChange
}) => {

    const _ano = useRef((initialValue || new Date()).getFullYear())

    const [meses, setMeses] = useState<string[]>([])
    const [currentMonth, setCurrentMonth] = useState<Date | undefined>(initialValue)

    const [toggleDraw, setToggleDraw] = useState(false)

    useEffect(() => {
        const load = async () => {
            await AsyncUtils.waitAMoment(1)
            setMeses(MONTHS)
        }

        load()
    }, [])

    useLayoutEffect(function repassarMes() {
        onChange(currentMonth)
    }, [currentMonth])

    const handlePressMonth = useCallback((month: number) => {
        setCurrentMonth(new Date(_ano.current, month, 1))
    }, [])

    const handleChangeYear = useCallback((ano: number) => {
        _ano.current = ano
        setToggleDraw(val => !val)
    }, [])

    const emptyRows = new Array(4 - (meses.length / 3)).fill(null).map((i, idx) => idx.toString())

    return (
        <>
            <Header
                initialValue={initialValue?.getFullYear()}
                onChange={handleChangeYear} />
            <Separator />
            <UI.Container>
                {meses.map((month, idx) => (
                    <Month
                        onPress={handlePressMonth}
                        active={idx === currentMonth?.getMonth() && _ano.current === currentMonth?.getFullYear()}
                        month={idx}
                        label={month}
                        key={month} />
                ))}
            </UI.Container>

            {emptyRows.map(row => (
                <EmptyRow key={row} />
            ))}
        </>
    )
}

export default React.memo(MonthPicker)