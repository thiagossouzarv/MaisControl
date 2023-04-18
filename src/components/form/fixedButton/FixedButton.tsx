import React from "react"
import Icon, { IconType } from "../../ui/icon/Icon"

import * as UI from "./FixedButtonStyle"

const ICONS = {
    next: {
        icon: "chevron-right",
        source: "entypo" as IconType
    },
    confirm: {
        icon: "check",
        source: "font-awesome" as IconType
    },
    add: {
        icon: "plus",
        source: "material-community" as IconType
    },
    back: {
        icon: "chevron-left",
        source: "entypo" as IconType
    },
    save: {
        icon: "save",
        source: "entypo" as IconType
    }
}

interface FixedButtonProps {
   onPress: () => void
   type?: "next" | "confirm" | "add" | "back" | "save"
   visible?: boolean
   left?: boolean
}

const FixedButton: React.FC<FixedButtonProps> = ({
    onPress,
    type = "next",
    visible = true,
    left=false
}) => {
    const _icon = ICONS[type]

    if (!visible) return null
    if( type == "back")
        return (
            <UI.ContainerLeft>
                <Icon
                    onClick={onPress}
                    icon={_icon.icon}
                    iconSource={_icon.source}
                    inverted
                    button />
            </UI.ContainerLeft>
        )
    else
        return (
            <UI.Container>
                <Icon
                    onClick={onPress}
                    icon={_icon.icon}
                    iconSource={_icon.source}
                    inverted
                    button />
            </UI.Container>
        )
}

export default FixedButton