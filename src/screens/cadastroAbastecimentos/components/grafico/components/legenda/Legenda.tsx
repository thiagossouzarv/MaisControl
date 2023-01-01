import React from "react"
import { colors } from "react-native-elements"
import Item from "./components/item/Item"

import * as UI from "./LegendaStyle"

interface LegendaProps {
   itens: any[]
   colors: string[]
   visible?: boolean
}

const Legenda: React.FC<LegendaProps> = ({
    itens,
    colors,
    visible = true
}) => {
    if (!visible) return null

    return (
        <UI.Container>
            {itens.map((item: any, idx: number) => (
                <Item
                    key={item.uid}
                    label={item.nome}
                    color={colors[idx]} />
            ))}
        </UI.Container>
    )
}

export default Legenda