export default class NumberUtils {
    static format(valor: number | null, casas = 2, removerZerosAposVirgula = false): string | null {
        if (!valor && valor !== 0) return null;

        let result = valor.toFixed(casas > 0 ? casas : 1).replace(".", ",").replace(/\d(?=(\d{3})+\,)/g, '$&.');
        result = casas === 0 ? result.replace(/\,.+/, "") : result;

        if (removerZerosAposVirgula) result = result.replace(/(,)(.+[^0])?(0+)$/, "$1$2").replace(/,$/, "");
        return result;
    }

    static formatCompacto(num: number, digits = 0) {
        const lookup = [
            { value: 1, symbol: "" },
            { value: 1e3, symbol: "k" },
            { value: 1e6, symbol: "M" },
            { value: 1e9, symbol: "G" },
            { value: 1e12, symbol: "T" },
            { value: 1e15, symbol: "P" },
            { value: 1e18, symbol: "E" }
        ];
        const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var item = lookup.slice().reverse().find(function (item) {
            return num >= item.value;
        });
        return (item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0").replace(".", ",");
    }
}