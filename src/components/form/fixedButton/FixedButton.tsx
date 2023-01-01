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
    }
}

interface FixedButtonProps {
   onPress: () => void
   type?: "next" | "confirm" | "add"
   visible?: boolean
}

const FixedButton: React.FC<FixedButtonProps> = ({
    onPress,
    type = "next",
    visible = true
}) => {
    const _icon = ICONS[type]

    if (!visible) return null

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