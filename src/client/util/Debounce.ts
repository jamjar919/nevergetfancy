const debounce = <Args>(func: (...Args) => void, wait: number): ((...Args) => void) => {
    let timeout: NodeJS.Timeout;
    return function (...args: Args[]) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
};

export { debounce };
