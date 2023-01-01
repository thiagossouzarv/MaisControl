export default class RegexUtils {
    static onlyNumbers(text: string): string {
        return text.replace(/\D/g, '');
    }
}