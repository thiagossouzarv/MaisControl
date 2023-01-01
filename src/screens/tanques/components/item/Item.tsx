import React, { useMemo } from "react"
import RNSpeedometer from 'react-native-speedometer'
import { useTheme } from "styled-components/native"
import { ListItem } from "../../../../components/form"
import { Separator } from "../../../../components/utils"
import { AppTheme } from "../../../../core/theme"
import { Tanque } from "../../../../services/business/estoque"
import NumberUtils from "../../../../utils/number"

import * as UI from "./ItemStyle"

const LABELS = [
    {
        name: 'Too Slow',
        labelColor: 'transparent',
        activeBarColor: '#ff2900',
    },
    {
        name: 'Very Slow',
        labelColor: 'transparent',
        activeBarColor: '#ff5400',
    },
    {
        name: 'Slow',
        labelColor: 'transparent',
        activeBarColor: '#f4ab44',
    },
    {
        name: 'Normal',
        labelColor: 'transparent',
        activeBarColor: '#f2cf1f',
    },
    {
        name: 'Fast',
        labelColor: 'transparent',
        activeBarColor: '#14eb6e',
    },
    {
        name: 'Unbelievably Fast',
        labelColor: 'transparent',
        activeBarColor: '#00ff6b',
    },
]

interface ItemProps {
    tanque: Tanque
}

const Item: React.FC<ItemProps> = ({ tanque }) => {
    const theme: AppTheme = useTheme()

    const labels = useMemo(() => {
        const { Capacidade: capacidade, EstoqueAtual: estoqueAtual, EstoqueMinimo: estoqueMinimo } = tanque
        const step = ((capacidade || 0) - (estoqueMinimo || 0)) / 6
        const nivel = Math.ceil(((estoqueAtual || 0) - (estoqueMinimo || 0)) / (step || 1))
        
        return LABELS.map((label, idx) => ({ ...label, activeBarColor: (idx + 1) <= nivel ? label.activeBarColor : "#ccc" }))

    }, [tanque.Capacidade, tanque.EstoqueAtual, tanque.EstoqueMinimo])

    const isAbaixoLimiteMinimo = (tanque.EstoqueAtual || 0) < (tanque.EstoqueMinimo || 0)
    const valorMinimo = tanque.EstoqueAtual < tanque.EstoqueMinimo ? tanque.EstoqueAtual : tanque.EstoqueMinimo

    return (
        <ListItem>
            <UI.Title>{tanque.Descricao}</UI.Title>
            <UI.Subtitle>{tanque.Produto.Produto}</UI.Subtitle>
            <Separator gap="lg" />
            <UI.Container>
                <RNSpeedometer
                    value={tanque.EstoqueAtual || 0}
                    size={150}
                    minValue={valorMinimo}
                    maxValue={tanque.Capacidade || 0}
                    labels={labels}
                    labelWrapperStyle={{
                        display: "none"
                    }}
                    labelStyle={{ fontSize: 10 }} />
                <Separator gap="md" />

                <UI.Content>
                    <UI.Info>
                        <UI.Value>{NumberUtils.format(tanque.EstoqueMinimo || 0, 0)}</UI.Value>
                        <UI.Label>nível mínimo</UI.Label>
                    </UI.Info>
                    <UI.Info>
                        <UI.Value style={{
                            color: isAbaixoLimiteMinimo ? theme.colors.error : theme.colors.success_600,
                            fontWeight: "bold",
                        }}>{NumberUtils.format(tanque.EstoqueAtual || 0, 0)}</UI.Value>
                        <UI.Label>estoque</UI.Label>
                    </UI.Info>
                    <UI.Info>
                        <UI.Value>{NumberUtils.format(tanque.Capacidade || 0, 0)}</UI.Value>
                        <UI.Label>capacidade</UI.Label>
                    </UI.Info>
                </UI.Content>
            </UI.Container>
        </ListItem>
    )
}

export default Item