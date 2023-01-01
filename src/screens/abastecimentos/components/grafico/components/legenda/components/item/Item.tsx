import React from "react"
import { Icon } from "../../../../../../../../components/ui"
import { Separator } from "../../../../../../../../components/utils"

import * as UI from "./ItemStyle"

interface ItemProps {
    label: string
    color: string
}

const Item: React.FC<ItemProps> = ({
    label,
    color
}) => {
    return (
        <UI.Container>
            <Icon
                icon="timeline"
                iconSource="material"
                iconSize="sm"
                color={color} />
            <Separator vertical />
            <UI.Label>
                {label}
            </UI.Label>
        </UI.Container>
    )
}

export default Item