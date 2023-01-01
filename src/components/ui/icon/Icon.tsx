import React from "react"
import { useTheme } from "styled-components/native"
import { AppTheme, BasicMetrics, ForegroundColors, getForegroundColor } from "../../../core/theme"

import * as UI from "./IconStyle"

export type IconType = "font-awesome" | "font-awesome-5" | "ionicon" | "material-community" | "entypo" | "antdesign" | "feather" | "simple-line-icon" | "ant-design" | "material" | "octicons" | "foundation" | "fontisto" | "evilicon"

interface AppIconProps {
    disabled?: boolean,
    backgroundColor?: string,
    borderColor?: string,
    button?: boolean,
    buttonPadding?: number,
    color?: ForegroundColors,
    icon?: string,
    iconSize?: BasicMetrics | number,
    iconSizeFactor?: number,
    iconSource?: IconType,
    inverted?: boolean,
    label?: string,
    labelBackColor?: string,
    onClick?: () => void,
    smallLabel?: boolean,
    style?: object,
    visible?: boolean,
}

const Icon: React.FC<AppIconProps> = ({
    disabled = false,
    backgroundColor = "white",
    borderColor,
    button = false,
    buttonPadding = 15,
    color,
    icon = undefined,
    iconSize = "md",
    iconSizeFactor = 1,
    iconSource = "material",
    inverted = false,
    label = undefined,
    labelBackColor = undefined,
    onClick = null,
    smallLabel = false,
    style = {},
    visible = true,
}) => {
    const theme: AppTheme = useTheme()
    const size = (typeof iconSize === "number" ? iconSize : theme.metrics.icon[iconSize]) * iconSizeFactor
    color = getForegroundColor(color, theme)

    if (!borderColor) borderColor = theme.colors.bg.light

    if (!visible) return null

    return (
        <UI.Container style={style}>
            {button && (
                <UI.IconContainer
                    borderColor={borderColor}
                    color={button && inverted ? color : backgroundColor}
                    disabled={disabled || onClick === null}
                    onPress={onClick}
                    size={size + 15 + buttonPadding}>
                    {({ pressed }: any) => (
                        <UI.IconBackground style={{
                            backgroundColor: pressed ? "rgba(0,0,0,0.3)" : "transparent",
                        }}>
                            <UI.StatusIcon
                                color={button && inverted ? backgroundColor : color}
                                icon={icon}
                                size={size}
                                source={iconSource} />
                        </UI.IconBackground>
                    )}
                </UI.IconContainer>
            )}

            {!button && (
                <UI.StatusIcon
                    disabled={disabled}
                    color={color}
                    icon={icon}
                    onPress={onClick}
                    size={size}
                    source={iconSource} />
            )}

            {(!!label &&
                <UI.LabelContainer backgroundColor={labelBackColor ? labelBackColor : button ? "#FFF" : "transparent"}>
                    <UI.Label
                        color={color}
                        small={smallLabel}>
                        {label}
                    </UI.Label>
                </UI.LabelContainer>
            )}
        </UI.Container>
    )
}

export default Icon