import React from "react"

import * as UI from "./ItemStyle"

interface ItemProps {
   day: string
}

const Item: React.FC<ItemProps> = ({
    day
}) => {
    return (
        <UI.Container>
            <UI.Label>{day}</UI.Label>
        </UI.Container>
    )
}

export default Item