import React from "react"
import { useTheme } from "styled-components/native"
import { AppTheme, BasicMetrics } from "../../../../core/theme"
import { Icon } from "../../../ui"
import ListItem from "../listItem/ListItem"

import * as UI from "./NoItemStyle"

interface NoItemProps {
   message?: string,
   marginHorizontal?: BasicMetrics,
   marginVertical?: BasicMetrics
}

const NoItem: React.FC<NoItemProps> = ({
    message = "Nenhum item para mostrar!",
    marginHorizontal = "md",
    marginVertical = "md"
}) => {
    const theme: AppTheme = useTheme()
    const _marginHorizontal = marginHorizontal ? theme.metrics.spacing[marginHorizontal] : 0
    const _marginVertical = marginVertical ? theme.metrics.spacing[marginVertical] : 0

    return (
        <UI.Container style={{
            marginHorizontal: _marginHorizontal,
            marginVertical: _marginVertical
        }}>
            <Icon
                icon="alert-remove-outline"
                iconSource="material-community"
                iconSize="md"
                color="fg:error" />

            <UI.Warn>{message}</UI.Warn>
        </UI.Container>
    )

    return (
        <ListItem
            icon="alert-remove-outline"
            iconSource="material-community"
            iconColor="fg:error"            
            subtitle="Desculpe, sem itens para mostrar!"
            />
    )
}

export default NoItem