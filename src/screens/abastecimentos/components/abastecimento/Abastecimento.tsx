import React from "react"
import { ListItem } from "../../../../components/form"
import { ListItemInfo2, ListItemSubtitle2, ListItemTitle2 } from "../../../../components/form/list/listItem/ListItem"
import { Counter } from "../../../../components/ui"
import { Abastecimento as AbastecimentoType } from "../../../../services/business/estoque"
import NumberUtils from "../../../../utils/number"
import { APP_SCREENS } from "../../../../routes/screens"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

import * as UI from "./AbastecimentoStyle"
import Tag from "../../../../components/ui/tag/Tag"
import { useTheme } from "styled-components/native"
import { AppTheme } from "../../../../core/theme"

interface AbastecimentoProps {
    info: AbastecimentoType,
    navigation: NativeStackNavigationProp<any, any>
}


const Abastecimento: React.FC<AbastecimentoProps> = ({ 
    info, 
    navigation
}) => {
    const theme: AppTheme = useTheme()
    return (
        <ListItem
            icon="gas-station"
            onPress={()=>navigation.navigate(APP_SCREENS.AbastecimentoDetalhes, info)}
            iconSource="material-community"
            iconColor="fg:main">
            <UI.Container>
                <UI.Info>
                    <ListItemSubtitle2>{info.Data}</ListItemSubtitle2>
                    <ListItemInfo2>{info.Placa ? `Placa ${info.Placa}` : info.DescricaoVeiculo ? info.DescricaoVeiculo : "Veículo não identificado"}</ListItemInfo2>
                    {info.NumeroFrota? 
                        <ListItemInfo2>N° Frota: {info.NumeroFrota}</ListItemInfo2>
                    : null}
                    {info.CentroCusto? 
                        <ListItemInfo2>Centro de custo: {info.CentroCusto}</ListItemInfo2>
                    : null}
                    

                    {info.AbastecimentoExterno? 
                        <ListItemInfo2>
                            <Tag
                                color={ theme.colors.error }
                                style={{ alignSelf: "center" }}
                                mini>
                                Abastecimento Externo
                            </Tag>
                        </ListItemInfo2>
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