import React, { useState, useCallback, useImperativeHandle, useRef, useLayoutEffect } from "react"
import { Platform, TextInputProps } from "react-native"
import { formatWithMask } from 'react-native-mask-input'
import { FormatWithMaskProps, Mask } from "react-native-mask-input/lib/typescript/src/formatWithMask.types"
import InputError from "../inputError/InputError"

import * as UI from "./InputStyle"

type keyboardType = "default" | "number-pad" | "decimal-pad" | "numeric" | "email-address" | "phone-pad" | "url";
type submitButtonType = "done" | "go" | "next" | "search" | "send";
type capitalizeType = "characters" | "words" | "sentences" | "none"

export interface InputHandler {
    focus: () => void
    clear: () => void
    update: (valor: string | null | undefined) => void
}

export interface InputProps {
    placeholder: string,
    initialValue?: string | null | undefined,
    icon?: string | null,
    iconSource?: string | null,
    error?: string | null,
    mask?: Mask | undefined,
    keyboard?: keyboardType,
    submitButton?: submitButtonType,
    uppercase?: capitalizeType,
    nextInput?: InputHandler | null,
    onClear?: () => void,
    onChange: (texto: string, textoFormatado: string) => void,
    onSubmit?: () => void,
    style?: object,
    iconButton?: boolean,
    clearable?: boolean,
    disabled?: boolean,
    password?: boolean,
    multiline?: boolean
}

const Input = React.forwardRef<InputHandler, InputProps>(({
    initialValue = null,
    icon,
    iconSource = "feather",
    error = null,
    mask,
    keyboard = "default",
    submitButton = "done",
    uppercase = "sentences",
    nextInput,
    onClear,
    onChange,
    onSubmit = undefined,
    style = {},
    clearable = true,
    iconButton = false,
    disabled = false,
    password = false,
    ...inputProps
}, ref) => {
    const _input = useRef<InputHandler>(null)

    const [value, setValue] = useState(initialValue)

    useLayoutEffect(function repassarValor() {
        const maskedValue = mask ? formatWithMask({
            text: initialValue,
            mask: mask,
        } as FormatWithMaskProps).masked : initialValue

        setValue(maskedValue)
        onChange(initialValue?.trim() || "", maskedValue?.trim() || "")
    }, [initialValue])

    const handleChange = useCallback((maskedValue?: string, unmaskedValue?: string) => {
        setValue(maskedValue || "")
        onChange(unmaskedValue?.trim() || "", maskedValue?.trim() || "")
    }, [onChange])

    const handleSubmit = useCallback(() => {        
        if (nextInput) nextInput.focus()
        if (onSubmit) onSubmit()
    }, [onSubmit, nextInput])

    const clear = useCallback(() => {
        if (!disabled) {
            handleChange("", "")
            if (onClear) onClear()
        }

    }, [handleChange, disabled, onClear])

    const focus = useCallback(() => {
        _input.current?.focus()
    }, [_input.current])

    const update = useCallback((valor: string) => {
        handleChange(valor, valor)
    }, [handleChange])

    useImperativeHandle(ref, () => {
        return {
            clear,
            focus,
            update,
        } as InputHandler
    })

    const botaoSubmit = Platform.OS === "ios" && keyboard === "number-pad" ? "done" : submitButton
    const ehMultiline = !!inputProps?.multiline

    return (
        <UI.Container>
            <UI.InputContainer
                disabled={disabled}
                error={!!error}
                iconButton={iconButton}
                style={style}
                multiline={ehMultiline}>
                <UI.Main multiline={ehMultiline}>
                    {!iconButton && !ehMultiline &&
                        <UI.InputIcon
                            error={!!error}
                            disabled={disabled}
                            iconName={icon}
                            source={iconSource} />
                    }

                    <UI.Input
                        {...inputProps}
                        ref={_input}
                        error={!!error}
                        mask={mask}
                        autoCapitalize={uppercase}
                        disabled={disabled}
                        keyboardType={keyboard}
                        onChangeText={handleChange}
                        onSubmitEditing={handleSubmit}
                        returnKeyLabel={botaoSubmit}
                        returnKeyType={botaoSubmit}
                        secureTextEntry={password}
                        value={value}
                        numberOfLines={ehMultiline ? 5 : 1}
                        textAlignVertical={ehMultiline ? "top" : "center"}
                    />

                    {clearable && !!value && <UI.ClearButton error={!!error} disabled={disabled} onPress={clear} />}

                    {iconButton &&
                        <UI.IconButton
                            error={!!error}
                            disabled={disabled}
                            onPress={() => { }}
                            iconName={icon} />
                    }
                </UI.Main>
            </UI.InputContainer>

            <InputError error={error} />
        </UI.Container>
    )
})

export default Input