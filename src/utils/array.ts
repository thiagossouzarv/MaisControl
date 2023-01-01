import StringUtils from "./string"

export default class ArrayUtils {
    static sort<T>(lista: T[], sortCallback: (item: T) => SortCallbackItem[]) {
        return lista.sort((a: T, b: T): number => {
            const aFields = sortCallback(a)
            const bFields = sortCallback(b)
            let direction = 0

            for (let i = 0; i < aFields.length; i++) {
                let aVal = aFields[i][0]
                let bVal = bFields[i][0]
                const isNumeric = typeof aVal === "number"

                if (!isNumeric) {
                    aVal = StringUtils.normalize(aVal.toString())
                    bVal = StringUtils.normalize(bVal.toString())
                }

                if (aVal == bVal) continue

                const isDesc = aFields[i][1] == "desc"
                const factor = isDesc ? -1 : 1
                const ref = aVal > bVal ? 1 : -1

                direction = ref * factor
                break
            }

            return direction
        })
    }

    static removeDuplicates<T>(lista: T[], key: string) {        
        return lista.filter((item, index, itens) => 
            itens.findIndex(o => o[key] === item[key]) === index)
    }

    static group<T>(lista: T[], key: string): GroupListItem[] {
        const itens: GroupListItem[] = []

        lista.forEach(item => {
            let grupo = itens.find(o => o.grouper === item[key])
            
            if (!grupo) {
                grupo = { grouper: item[key], itens: [] }
                itens.push(grupo)
            }

            grupo.itens.push(item)
        })

        return itens
    }

    static contains(target: string, source: string): boolean {
        const words = StringUtils.normalize(target).trim().split(" ")
        const ref = StringUtils.normalize(source)
        
        return !words.some(word => !ref.includes(word))
    }

    static containsMany(target: string, sources: string[]): boolean {
        return !target.trim().split(" ").some(word => !sources.some(phrase => ArrayUtils.contains(word, phrase)))
    }
}

type SortCallbackItem = [field: string | number, sort: "asc" | "desc"]

interface GroupListItem {
    grouper: string,
    itens: any[]
}