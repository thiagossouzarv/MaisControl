import React, { useCallback, useLayoutEffect, useRef, useState } from "react"
import { useTheme } from "styled-components/native"
import { TouchableOpacity } from "react-native"
import MaskInput, { createNumberMask } from "react-native-mask-input"
import { AppTheme } from "../../../../../core/theme"
import HeaderNavigator from "../../../../utils/navigator/headerNavigator/HeaderNavigator"

import * as UI from "./HeaderStyle"
import RegexUtils from "../../../../../utils/regex"

interface HeaderProps {
    initialValue?: number
    onChange: (value: number) => void
}

const integerMask = createNumberMask({
    delimiter: '',
    separator: '',
    precision: 0,
})

const Header: React.FC<HeaderProps> = ({ 
    onChange,
    initialValue
}) => {
    const theme: AppTheme = useTheme()

    const _input = useRef<any>()

    const [value, setValue] = useState<string>((initialValue || new Date().getFullYear()).toString())

    useLayoutEffect(() => {
        if (onChange && !(!value || (value?.length || 0) != 4 || value.startsWith("0")))
            onChange(Number(RegexUtils.onlyNumbers(value)))
    }, [value, onChange])

    const sum = () => {
        setValue(val => (Number(val) + 1).toString())
    }

    const subtract = () => {
        setValue(val => val === "0" ? "0" : (Number(val) - 1).toString())
    }

    const handleInputBlur = useCallback(() => {
        if (!value || (value?.length || 0) != 4 || value.startsWith("0")) 
            setValue(new Date().getFullYear().toString())
    }, [value])

    const handleChangeText = useCallback((texto: string) => {
        setValue(texto)
        if (texto?.length === 4) _input.current?.blur()
    }, [])

    return (
        <HeaderNavigator
            handleNext={sum}
            handlePrevius={subtract}>
            <TouchableOpacity>
                <UI.Container>
                    <MaskInput
                        ref={_input}
                        value={value}
                        onChangeText={handleChangeText}
                        onBlur={handleInputBlur}
                        keyboardType="numeric"
                        mask={integerMask}
                        selectTextOnFocus
                        style={{
                            minWidth: 30,
                            marginHorizontal: 5,
                            textAlign: "center",
                            fontWeight: "bold",
                            color: theme.colors.main,
                        }} />
                </UI.Container>
            </TouchableOpacity>
        </HeaderNavigator>
    )
}

export default Header