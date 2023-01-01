import React from "react"
import { BasicMetrics, ForegroundColors } from "../../../core/theme"
import { Avatar, Icon, IconType } from "../../ui"
import Separator from "../separator/Separator"

import * as UI from "./NoItemStyle"

const IMAGES = {
    default: {
        icon: "search-off",
        source: "material" as IconType,
        color: "fg:error" as ForegroundColors,
        opacity: 1,
        sizeFator: 1
    },
    avatar: {
        icon: "person",
        source: "ionicon" as IconType,
        color: "fg:error" as ForegroundColors,
        opacity: 1,
        sizeFator: 0.85
    },
    material: {
        icon: "dropbox",
        source: "font-awesome" as IconType,
        color: "fg:error" as ForegroundColors,
        opacity: 1,
        sizeFator: 1
    },
    movimentation: {
        icon: "upload",
        source: "entypo" as IconType,
        color: "fg:error" as ForegroundColors,
        opacity: 1,
        sizeFator: 1
    },
    leitor: {
        icon: "satellite-uplink",
        source: "material-community" as IconType,
        color: "fg:error" as ForegroundColors,
        opacity: 1,
        sizeFator: 1
    }
}

interface NoItemProps {
    image?: NoItemImage
    size?: BasicMetrics
    sizeFactor?: number
    title?: string
    message?: string | React.ReactNode
    marginTop?: BasicMetrics | number
    marginBottom?: BasicMetrics | number
    visible?: boolean
    children?: React.ReactNode
}

const NoItem: React.FC<NoItemProps> = ({
    image = "material",
    size = "lg",
    sizeFactor = 1,
    title = "Nenhum item para mostrar!",
    message = "",
    marginTop = 0,
    marginBottom = 50,
    visible = true,
    children
}) => {
    const {
        icon,
        source,
        color,
        opacity,
        sizeFator: iconSize
    } = IMAGES[image]

    if (!visible) return null

    return (
        <UI.Container>
            <Separator gap={marginTop} />
            <Icon
                style={{ opacity }}
                icon={icon}
                iconSource={source as IconType}
                color={color as any}
                iconSize={size}
                iconSizeFactor={sizeFactor * iconSize} />
            <Separator gap="sm" />
            <UI.Title>{title}</UI.Title>
            <UI.Message>{message}</UI.Message>
            {!!children &&
                <>
                    <Separator />
                    {children}
                </>
            }
            <Separator gap={marginBottom} />
        </UI.Container>
    )
}

export default NoItem

type NoItemImage = "material" | "movimentation" | "leitor" | "avatar" | "default"