import React, { useState, useCallback, useEffect } from "react"

import * as UI from "./CheckStyle"

interface CheckProps {
    children: string | React.ReactNode,
    value: any,
    startChecked?: boolean,
    onChange: (enabled: boolean, value: any) => void,
    fit?: boolean,
    dark?: boolean,
}

const Check: React.FC<CheckProps> = ({ children, onChange, value, startChecked = false, fit = false, dark = false }) => {
    const [checked, setChecked] = useState(startChecked)

    useEffect(function propagarAlteracao() {
        onChange(checked, value)
    }, [checked, value])

    const toggle = useCallback(() => {
        setChecked(before => {
            const marcado = !before
            return marcado
        })
    }, [onChange, value])

    return (
        <UI.Container>
            <UI.Check checked={checked} onPress={toggle} fit={fit} dark={dark}>
                {children}
            </UI.Check>
        </UI.Container>
    )
}

export default React.memo(Check)