export default class AsyncUtils {
    static waitAMoment(timeMS = 50) : Promise<void> {
        return new Promise((resolve) => {
            setTimeout(resolve, timeMS);
        });
    };

    static debounce(func: Function, timeoutMS = 300) {
        let timer: NodeJS.Timeout;

        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeoutMS);
        };
    }
}