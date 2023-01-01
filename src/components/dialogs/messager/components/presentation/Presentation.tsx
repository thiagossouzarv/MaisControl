import React from "react"
import { ForegroundColors } from "../../../../../core/theme"
import { Icon, IconType } from "../../../../ui"

import * as UI from "./PresentationStyle"

interface PresentationProps {
    color: ForegroundColors
    icon: string
    iconSource: IconType
}

const Presentation: React.FC<PresentationProps> = ({
    color,
    icon,
    iconSource
}) => {
    return (
        <UI.Container>
            <Icon
                icon={icon}
                iconSource={iconSource}
                iconSize="lg"
                iconSizeFactor={.7}
                color={color} />
        </UI.Container>
    )
}

export default Presentation