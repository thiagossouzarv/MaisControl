import React from "react"
import { ListItem } from "../../../../components/form"
import { ListItemInfo2, ListItemSubtitle2, ListItemTitle2 } from "../../../../components/form/list/listItem/ListItem"
import { Counter } from "../../../../components/ui"
import { Abastecimento as AbastecimentoType } from "../../../../services/business/estoque"
import NumberUtils from "../../../../utils/number"

import * as UI from "./AbastecimentoStyle"

interface AbastecimentoProps {
    info: AbastecimentoType
}

const Abastecimento: React.FC<AbastecimentoProps> = ({ 
    info
}) => {
    return (
        <ListItem
            icon="gas-station"
            iconSource="material-community"
            iconColor="fg:main">
            <UI.Container>
                <UI.Info>
                    <ListItemSubtitle2>{info.Data}</ListItemSubtitle2>
                    <ListItemInfo2>{info.Placa ? `Placa ${info.Placa}` : info.DescricaoVeiculo ? info.DescricaoVeiculo : "Veículo não identificado"}</ListItemInfo2>
                    {info.CentroCusto? 
                        <ListItemInfo2>Centro de custo: {info.CentroCusto}</ListItemInfo2>
                    : null}
                </UI.Info>

                <Counter
                    label="litros"
                    value={NumberUtils.format(info.VolumeTotal, 1, true) as string}
                    alignment="flex-end" />
            </UI.Container>
        </ListItem>
    )
}

export default React.memo(Abastecimento)