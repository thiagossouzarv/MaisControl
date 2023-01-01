import React, { useMemo } from "react"
import uuid from 'react-native-uuid'
import { useTheme } from "styled-components/native"
import { Dimensions } from "react-native"
import { LineChart } from "react-native-chart-kit"

import * as UI from "./GraficoStyle"
import { AppTheme } from "../../../../core/theme"
import NumberUtils from "../../../../utils/number"
import Legenda from "./components/legenda/Legenda"
import { Separator } from "../../../../components/utils"
import { Abastecimento } from "../../../../services/business/estoque"
import Moment from "../../../../utils/date"

const hideYLabel = true
const hideYWidth = 10
const COLORS = ["#db424d", "#04a390", "#986fb5", "#3b8bff", "#f9973e", "#f2cc2c", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777"]

interface GraficoProps {
    abastecimentos: Abastecimento[]
    dataInicial: string
    dataFinal: string
    listaEmpresas: Empresa[]
}

const Grafico: React.FC<GraficoProps> = ({
    abastecimentos,
    dataFinal,
    dataInicial,
    listaEmpresas
}) => {
    const theme: AppTheme = useTheme()

    const { dados, labels, empresas }: { dados: ChartData[], labels: string[], empresas: Empresa[] } = useMemo(() => {
        const lista: Empresa[] = []
        let minData = Moment.fromDateString(dataInicial)
        let maxData = Moment.fromDateString(dataFinal)

        const labels: string[] = []
        let dataPonteiro: (Date | undefined) = Moment.addDays(minData, -1)

        do {
            dataPonteiro = Moment.addDays(dataPonteiro, 1)
            labels.push(Moment.formatDate(dataPonteiro))
        } while (Moment.formatDate(dataPonteiro) != Moment.formatDate(maxData))

        const chartLabels = labels.map(dia => " " + dia.split("/")[0])        

        if (!abastecimentos.length) {
            return {
                labels: chartLabels,
                dados: [{
                    color: () => COLORS[0],
                    data: labels.map(o => 0),
                    strokeWidth: 3
                }],
                empresas: [{ uid: "-1", nome: "Empresa" }]
            }
        }

        const abastecimentosRef = abastecimentos
        const itemBase = abastecimentos[0]
        const empresasNaoConstantes = listaEmpresas.filter(e => abastecimentos.some(a => a.IdEmpresaGuid !== e.uid))

        empresasNaoConstantes.forEach(empresa => {
            abastecimentosRef.push({
                ...itemBase,
                GUID: uuid.v4().toString(),
                Empresa: empresa.nome,
                IdEmpresaGuid: empresa.uid
            })
        })


        for (let item of abastecimentosRef) {
            let empresa: (Empresa | undefined) = lista.find(o => o.uid === item.IdEmpresaGuid)

            if (!empresa) {
                empresa = {
                    uid: item.IdEmpresaGuid || "-1",
                    nome: item.Empresa || "Empresa",
                    abastecimentos: []
                } as Empresa

                lista.push(empresa)
            }

            const dataRef = item.Data.split(' ')[0]
            let diaAbastecimento = empresa.abastecimentos.find(o => o.dia === dataRef)

            if (!diaAbastecimento) {
                diaAbastecimento = { dia: dataRef, litragem: 0 }
                empresa.abastecimentos.push(diaAbastecimento)
            }

            diaAbastecimento.litragem += item.VolumeTotal
        }

        const dados = lista.map((info, idx) => {
            return {
                data: labels.map(dia => {
                    const obj = info.abastecimentos.find(a => a.dia === dia)
                    return obj?.litragem || 0
                }),
                color: (opacity = 1) => COLORS[idx],
                strokeWidth: 3
            } as ChartData
        })

        return { dados, labels: chartLabels, empresas: lista }
    }, [abastecimentos, dataInicial, dataFinal, listaEmpresas])

    if (!dados || dados.length === 0) return null

    const labelsFinal = useMemo(() => {
        const max = 10
        const total = labels.length
        if (total <= max) return labels

        const step = Math.floor(total / 7)
        let next = 0
        const lista = []
        
        for (let i = 0; i < labels.length; i++) {
            if (i === next) {
                lista.push(labels[i])
                next += step
            } else lista.push("")
        }

        return lista

    }, [labels]) 

    return (
        <>
            <UI.Container style={{ marginLeft: hideYLabel ? -1 * hideYWidth : 0 }}>
                <LineChart
                    bezier
                    withHorizontalLabels
                    withVerticalLabels
                    withVerticalLines
                    withHorizontalLines
                    fromZero={false}
                    formatYLabel={val => NumberUtils.formatCompacto(Number(val), 1)}
                    bezier={false}
                    data={{
                        labels: labelsFinal,
                        datasets: dados,
                        legend: [],
                    }}

                    width={Dimensions.get('window').width + (hideYLabel ? hideYWidth : 0)}
                    height={200}
                    chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        decimalPlaces: 2,
                        color: (opacity = 1, idx?: number = 0) => `rgba(255, 0, 0, ${idx > 1 ? 0 : opacity})`,
                        propsForDots: {
                            r: "3.5",
                            strokeWidth: "0",
                            //stroke: theme.colors.fg.main,
                            //fill: theme.colors.fg.main
                        },
                        style: {
                            margin: 0,
                            padding: 0,
                        },
                        propsForHorizontalLabels: {
                            fill: theme.colors.fg.dark
                        },
                        propsForVerticalLabels: {
                            fill: theme.colors.fg.dark
                        },
                        fillShadowGradient: "#ffffff",
                        fillShadowGradientFrom: "#ffffff",
                        fillShadowGradientTo: "#ffffff",
                    }}
                    style={{ padding: 0 }}
                />
            </UI.Container>

            <Separator />
            <Legenda
                visible={empresas.length > 1}
                itens={empresas}
                colors={COLORS} />
        </>
    )
}

export default React.memo(Grafico)

interface Empresa {
    uid: string
    nome: string
    abastecimentos: EmpresaAbastecimento[]
}

interface EmpresaAbastecimento {
    dia: string
    litragem: number
}

type Labels = string[]

interface ChartData {
    data: number[]
    color: (opacity: number) => string
    strokeWidth: number
}

interface Local {
    uid: string
    nome: string
}