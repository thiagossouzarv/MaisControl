import React from "react"
import { ActivityIndicator } from "react-native"
import Icon, { IconType } from "../../ui/icon/Icon"
import { useTheme } from "styled-components/native"

import * as UI from "./ButtonStyle"
import { AppTheme } from "../../../core/theme"

const SIZES = {
    small: 0.75,
    normal: 1
}

export interface ButtonProps {
    children: React.ReactNode
    onClick: () => void
    type: UI.ButtonType
    variant?: "default" | "login" | "outline" | "dashed"
    icon?: string
    iconFont?: IconType
    iconSizeFactor?: number
    disabled?: boolean
    loading?: boolean
    visible?: boolean
    rounding?: boolean
    grow?: boolean
    style?: object
    size?: "small" | "normal"
    labelColor?: string
    borderColor?: string
}

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    type,
    variant = "login",
    icon,
    iconFont,
    iconSizeFactor = 1,
    disabled = false,
    loading = false,
    visible = true,
    rounding = true,
    grow = false,
    style = {},
    size = "normal",
    labelColor,
    borderColor
}) => {
    const theme: AppTheme = useTheme()

    function handleClick() {         
        if (loading || disabled || !onClick) return
        onClick()
    }

    if (!visible) return null

    const sizeFactor = SIZES[size]

    return (
        <UI.Container
            type={type}
            variant={variant}
            rouding={rounding}
            loading={loading}
            disabled={disabled}
            onPress={handleClick}
            sizeFactor={sizeFactor}
            grow={grow}
            style={style}
            borderColor={borderColor}>
            {!!icon && !loading &&
                <Icon
                    icon={icon}
                    iconSource={iconFont}
                    iconSize={18 * sizeFactor * iconSizeFactor}
                    color={disabled ? theme.colors.fg.light : (labelColor ? labelColor : theme.button.fg[variant][type])}
                    style={{ marginRight: 7 }} />
            }

            {loading &&
                <ActivityIndicator
                    size={25 * sizeFactor * iconSizeFactor}
                    color={disabled ? theme.colors.fg.light : theme.button.fg[variant][type]}
                    style={{ marginRight: 5 }} />
            }

            {!loading &&
                <UI.Label
                    disabled={disabled}
                    color={labelColor}
                    sizeFactor={sizeFactor}
                    type={type}
                    variant={variant}>
                    {children}
                </UI.Label>
            }
        </UI.Container>
    )
}

export default Button