import React from "react"
import { Bold, Highlight } from "../../../../components/core"
import { Divider } from "../../../../components/utils"
import NumberUtils from "../../../../utils/number"

import * as UI from "./SumarioStyle"

interface SumarioProps {
   litragem: number,
   numeroAbastecimentos: number
}

const Sumario: React.FC<SumarioProps> = ({
    litragem,
    numeroAbastecimentos
}) => {
    return (
        <UI.Container>
            <UI.Info>
                <UI.Value>{NumberUtils.format(litragem, 1, true)}</UI.Value>
                <UI.Label>litro{litragem !== 1 ? "s" : ""}</UI.Label>
            </UI.Info>
            <Divider vertical />
            <UI.Info>
                <UI.Value>{NumberUtils.format(numeroAbastecimentos, 0)}</UI.Value>
                <UI.Label>abastecimento{numeroAbastecimentos !== 1 ? "s" : ""}</UI.Label>
            </UI.Info>
        </UI.Container>
    )
}

export default React.memo(Sumario)