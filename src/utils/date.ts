import NumberUtils from "./number";

const WEEK_DAY_NAMES: WeekDayName[] = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
const WEEK_DAY_NAMES_SHORT: WeekDayNameShort[] = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]
const MONTH_NAMES: MonthName[] = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
const CONVERSORES_MS = {
    ano: 1000 * 60 * 60 * 24 * 365,
    mes: 1000 * 60 * 60 * 24 * 30,
    dia: 1000 * 60 * 60 * 24,
    hora: 1000 * 60 * 60,
    minuto: 1000 * 60,
    segundo: 1000,
};

export default class Moment {
    private _date: Date;

    constructor(date: Date = new Date()) {
        this._date = date
    }

    clone() {
        return new Moment(new Date(this._date))
    }
    
    static msFromMinutes(minutes: number): number {
        return minutes * 60 * 1000
    }

    static setZeroTime(date: Date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
    }

    static setTime(date: Date, hours: number, minutes: number, seconds: number) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes, seconds)
    }

    static twoDigits(val: number): string {
        return val.toString().padStart(2, "0")
    }    

    static fromDateString(data: string, capturarHorario = true): Date { 
        //"2022-10-14 22:17:03.224174+00:00"
        if (/^\d{4}(-\d{2}){2} (\d{2}:){2}\d{2}.\d{6}\+\d{2}:\d{2}$/.test(data))           
            return new Date(data.replace(" ", "T"))

        //yyyy-mm-dd ou yyyy-mm-dd HH:MM
        const formatoBrasileiro = (/\d{2}\/\d{2}\/\d{4}/.test(data.split(" ")[0]));
        const separador = data.split(" ")[0].indexOf("/") !== -1 ? "/" : "-";
        const [val1, val2, val3] = data.split(" ")[0].split(separador);
        const [ano, mes, dia] = formatoBrasileiro ? [val3, val2, val1] : [val1, val2, val3];
        const [horas, minutos] = !capturarHorario || data.split(" ").length < 2 ? [12, 0] : data.split(" ")[1].split(":");
        return new Date(Number(ano), Number(mes) - 1, Number(dia), Number(horas), Number(minutos), 0);
    }    

    static formatHoursAndMinutes(data: Date = new Date()) {
        const format = (num: number) => Moment.twoDigits(num)
        return `${format(data.getHours())}:${format(data.getMinutes())}`
    }   

    static formatHoursAndMinutesAndSeconds(data: Date = new Date()) {
        const format = (num: number) => Moment.twoDigits(num)
        return `${format(data.getHours())}:${format(data.getMinutes())}:${format(data.getSeconds())}`
    }

    static formatMonthYear(date: Date) {
        return MONTH_NAMES[date.getMonth()] + " " + date.getFullYear()
    }

    static formatDate(date: Date = new Date()) {
        const dia = Moment.twoDigits(date.getDate())
        const mes = Moment.twoDigits(date.getMonth() + 1)
        const ano = date.getFullYear()
        return `${dia}/${mes}/${ano}`
    }

    static formatDateUSA(date: Date = new Date()) {
        const dia = Moment.twoDigits(date.getDate())
        const mes = Moment.twoDigits(date.getMonth() + 1)
        const ano = date.getFullYear()
        return `${ano}-${mes}-${dia}`
    }

    static formatDateTime(data: Date = new Date(), showSeconds = true) {
        return `${Moment.formatDate(data)} ${showSeconds ? Moment.formatHoursAndMinutesAndSeconds(data) : Moment.formatHoursAndMinutes(data)}`
    }

    static formatDateTimeUSA(data: Date = new Date()) {
        return `${Moment.formatDateUSA(data)} ${Moment.formatHoursAndMinutesAndSeconds(data)}`
    }

    static formatPeriod(data: Date, dataReferencia: Date | null = null): string {
        if (!dataReferencia) dataReferencia = new Date();

        // if (data > dataReferencia) {
        //     const deltaMin = Math.abs(data.getTime() - dataReferencia.getTime()) / 1000 / 60;
        //     if (deltaMin > 10) return "poucos instantes";
        //     return "há algum tempo";
        // }

        let tempoMS = Math.abs(dataReferencia.getTime() - data.getTime());

        const anos = Math.floor(tempoMS / CONVERSORES_MS.ano);
        tempoMS -= anos * CONVERSORES_MS.ano;

        const meses = Math.floor(tempoMS / CONVERSORES_MS.mes);
        tempoMS -= meses * CONVERSORES_MS.mes;

        const dias = Math.floor(tempoMS / CONVERSORES_MS.dia);
        tempoMS -= dias * CONVERSORES_MS.dia;

        const horas = Math.floor(tempoMS / CONVERSORES_MS.hora);
        tempoMS -= horas * CONVERSORES_MS.hora;

        const minutos = Math.floor(tempoMS / CONVERSORES_MS.minuto);
        tempoMS -= minutos * CONVERSORES_MS.minuto;

        const segundos = Math.floor(tempoMS / CONVERSORES_MS.segundo);

        const info = {
            anos: NumberUtils.format(anos, 0, false, "ano", "anos") as string,
            meses: NumberUtils.format(meses, 0, false, "mês", "meses") as string,
            dias: NumberUtils.format(dias, 0, false, "dia", "dias") as string,
            horas: NumberUtils.format(horas, 0, false, "h", "h") as string,
            minutos: NumberUtils.format(minutos, 0, false, "min", "min") as string,
            segundos: NumberUtils.format(segundos, 0, false, "seg", "seg") as string,
        };

        const tratar = (maior: string, menor: string, valorMenor: number) => (valorMenor ? maior + " e " + menor : maior);

        if (anos) return tratar(info.anos, info.meses, meses);
        if (meses) return tratar(info.meses, info.dias, dias);
        if (dias) return tratar(info.dias, info.horas, horas);
        if (horas) return tratar(info.horas, info.minutos, minutos);
        if (minutos) return tratar(info.minutos, info.segundos, segundos);

        return info.segundos;
    }

    monthName(): MonthName {
        return MONTH_NAMES[this._date.getMonth()]
    }

    static monthName(date: Date): MonthName {
        return MONTH_NAMES[date.getMonth()]
    }

    weekDayName(): WeekDayName {
        return Moment.weekDayName(this._date)
    }

    static weekDayName(date: Date): WeekDayName {
        return WEEK_DAY_NAMES[date.getDay()]
    }

    weekDayNameShort(): WeekDayNameShort {
        return Moment.weekDayNameShort(this._date)
    }

    static weekDayNameShort(date: Date): WeekDayNameShort {
        return WEEK_DAY_NAMES_SHORT[date.getDay()]
    }

    isSameMonthAndYear(date: Date) {
        return Moment.isSameMonthAndYear(this._date, date)
    }

    static isSameMonthAndYear(date1: Date, date2: Date) {
        return date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()
    }

    static isSameDay(date1: Date, date2: Date) {
        return date1.getDate() === date2.getDate() &&
            Moment.isSameMonthAndYear(date1, date2)
    }
    static addMinutes(minutes: number, data = new Date()) {
        const novaData = new Date(data);
        novaData.setMinutes(novaData.getMinutes() + minutes);
        return novaData;
    }

    addDays(dias: number) {
        this._date = Moment.addDays(this._date, dias)
        return this
    }

    static addDays(date: Date, dias: number) {
        const novaData = new Date(date);
        return new Date(novaData.setDate(novaData.getDate() + dias));
    }

    static firstDayOfMonth(date: Date = new Date()): Date {
        return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0)
    }

    static lastDayOfMonth(date: Date): Date {
        const ano = date.getFullYear();
        const mes = date.getMonth();
        return new Date(ano, mes + 1, 0);
    }

    static nextMonth(date: Date): Date {
        return Moment.addDays(Moment.lastDayOfMonth(date), 1)
    }

    static previousMonth(date: Date): Date {
        return Moment.addDays(Moment.firstDayOfMonth(date), -1)
    }

    static setDay(date: Date, day: number) {
        return new Date(date.getFullYear(), date.getMonth(), day)
    }

    /* 
    Retorno: retorna array de semanas de um dado mês, onde a semana é um array de 7 posicoes com os dias da semana começando na segunda. 
    O dia tem o formato { day: number, isMonthDay } ... pode ser que uma dada semana mostre dias de outros meses (primeira e ultima)
    ***************************************************/
    static getMonthWeekDays(year: number, month: number): WeekDay[][] {
        const refDate = new Date(year, month)
        const weeks: WeekDay[][] = []

        const lastDayOfWeek = () => weeks.length ? weeks[weeks.length - 1][6].date : Moment.addDays(refDate, -1)

        do {
            weeks.push(Moment.getWeekDays(Moment.addDays(lastDayOfWeek(), 1)))
        } while (Moment.isSameMonthAndYear(Moment.addDays(lastDayOfWeek(), 1), refDate))

        for (let i = 0; i < 6 - weeks.length; i++) {
            weeks.push(Moment.getWeekDays(Moment.addDays(lastDayOfWeek(), 1)).map(o => ({ ...o, isMonthDay: false })))
        }

        return weeks
    }

    /* 
    Retorno: retorna array com dias da semana começando na segunda
    ***************************************************/
    static getWeekDays(date: Date): WeekDay[] {
        const _date = Moment.setTime(date, 12, 0, 0)
        const diaSemana = _date.getDay()

        const domingo = Moment.addDays(_date, -diaSemana)
        const dias: WeekDay[] = []

        new Array(7).fill(null).map((_, idx) => {
            const dia = Moment.addDays(domingo, idx)

            dias.push({
                day: dia.getDate(),
                date: dia,
                isMonthDay: Moment.isSameMonthAndYear(_date, dia),
                weekDayName: Moment.weekDayName(dia)
            })
        })

        return dias
    }
}

export interface WeekDay {
    day: number;  //1 - 31
    date: Date;
    isMonthDay: boolean;
    weekDayName: WeekDayName;
}

export type WeekDayName = "Segunda" | "Terça" | "Quarta" | "Quinta" | "Sexta" | "Sábado" | "Domingo"
export type WeekDayNameShort = "Seg" | "Ter" | "Qua" | "Qui" | "Sex" | "Sab" | "Dom"
export type MonthName = "Janeiro" | "Fevereiro" | "Março" | "Abril" | "Maio" | "Junho" | "Julho" | "Agosto" | "Setembro" | "Outubro" | "Novembro" | "Dezembro"