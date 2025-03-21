const debounce = <Args, Ret>(func: (...Args) => Ret, wait: number): (...Args) => Ret => {
    let timeout: number;
    return function (...args: any) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

export { debounce }