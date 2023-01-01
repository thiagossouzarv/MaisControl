import React, { useCallback, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from "react"
import AsyncUtils from "../../../utils/async"
import Moment, { WeekDay } from "../../../utils/date"
import { Separator } from "../../utils"
import Day, { EmptyRow } from "./components/day/Day"
import Header, { DateTimePickerHeaderHandler } from "./components/header/Header"
import WeekHeader from "./components/weekHeader/WeekHeader"

import * as UI from "./DateTimePickerStyle"

export interface DateTimePickerHandler {
    navigateToMonth: (dataMes: Date) => void,
    setData: (data: Date) => void
}

interface DateTimePickerProps {
    initialValue?: Date
    onChange: (date?: Date) => void
    onChangeMonth?: (date?: Date) => void
    onToggleMonthModal?: (opened: boolean) => void
    onPressDay?: (data?: Date) => void
    variant: "modal" | "default"
    minDate?: string
    maxDate?: string
}

const DateTimePicker = React.forwardRef<DateTimePickerHandler, DateTimePickerProps>(({
    initialValue,
    onChange,
    onChangeMonth,
    onToggleMonthModal,
    onPressDay,
    variant,
    minDate,
    maxDate,
}, ref) => {
    const _mesRef = useRef<Date | undefined>(initialValue)
    const _firstLoad = useRef(true)
    const _monthNavigator = useRef<DateTimePickerHeaderHandler>()

    const [weeks, setWeeks] = useState<WeekDay[][]>([])
    const [currentDate, setCurrentDate] = useState<Date | undefined>(initialValue)
    const [mes, setMes] = useState<Date | undefined>(initialValue)

    useEffect(function carregar() {
        const load = async () => {
            const weeks = !!mes ? Moment.getMonthWeekDays(mes.getFullYear(), mes.getMonth()) : []
            if (_firstLoad.current) {
                await AsyncUtils.waitAMoment(1)
                _firstLoad.current = false
            }

            setWeeks(weeks)
        }

        load()
    }, [mes?.getFullYear(), mes?.getMonth()])

    useEffect(function repassarDia() {
        onChange(currentDate)
    }, [currentDate])

    const handlePressDay = useCallback((dia: number) => {
        if (!!_mesRef.current) {
            const data = Moment.setDay(_mesRef.current, dia)
            setCurrentDate(data)
            if (onPressDay) onPressDay(data)
        }
    }, [])

    const handleChangeMes = useCallback((dataMes?: Date) => {
        _mesRef.current = dataMes
        setMes(dataMes)
        if (onChangeMonth) onChangeMonth(dataMes)
    }, [onChangeMonth])

    const renderData = useMemo(() => {
        const hoje = new Date()
        const diaAtual = currentDate?.getDate()
        const mesAtual = currentDate?.getMonth()
        const anoAtual = currentDate?.getFullYear()
        const mesRef = mes?.getMonth()
        const anoRef = mes?.getFullYear()
        const ehMesSelecionado = !!mes && mesRef == mesAtual && anoRef == anoAtual

        return weeks.reduce((lista, week) => {
            const days: RenderData[] = week.map(day => ({
                key: day.day + "-" + (day.isMonthDay ? "eh-mes" : "nao-mes"),
                isMonthDay: day.isMonthDay,
                isToday: Moment.isSameDay(hoje, day.date),
                dia: day.day,
                active: day.isMonthDay && !!currentDate && day.day === diaAtual && ehMesSelecionado,
                outOfLimis: (!!minDate && Moment.setZeroTime(day.date) < Moment.setZeroTime(Moment.fromDateString(minDate))) ||
                            (!!maxDate && Moment.setZeroTime(day.date) > Moment.setZeroTime(Moment.fromDateString(maxDate)))
            }))

            return lista.concat(days)
        }, [] as RenderData[])
    }, [weeks, currentDate, mes, minDate, maxDate])

    const emptyRows = useMemo(() => {
        return new Array(6 - weeks.length).fill(null).map((val, idx) => idx.toString())
    }, [weeks])

    const navigateToMonth = useCallback((dataMes: Date) => {
        _monthNavigator.current?.setMonth(dataMes)
    }, [])

    useImperativeHandle(ref, (): DateTimePickerHandler => {
        return {
            navigateToMonth,
            setData: setCurrentDate
        }
    })

    return (
        <UI.Wrap>
            <Header
                ref={_monthNavigator}
                initialValue={initialValue}
                onChange={handleChangeMes}
                onToggleMonthModal={onToggleMonthModal}
                variant={variant} />
            <Separator gap="lg" />
            <WeekHeader />
            <UI.Container>
                {renderData.map(((item) => (
                    <Day
                        key={item.key}
                        onPress={handlePressDay}
                        isMonthDay={item.isMonthDay}
                        isToday={item.isToday}
                        dia={item.dia}
                        active={item.active}
                        outOfLimits={item.outOfLimis} />
                )))}
            </UI.Container>

            {emptyRows.map(row => (
                <EmptyRow key={row} />
            ))}
        </UI.Wrap>
    )
})

interface RenderData {
    key: string,
    isMonthDay: boolean,
    isToday: boolean,
    dia: number,
    active: boolean,
    outOfLimis: boolean
}

export default DateTimePicker