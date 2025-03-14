const wrapLogFn = (
    fn: (...args: any[]) => void
): ((...args: any[]) => void) => {
    const date = new Date();
    const stamp = `[${date.toLocaleDateString()} ${date.toLocaleTimeString()}]`;
    return (...args) => fn(stamp, ...args);
};

const setupLogs = () => {
    const originalLog = console.log;
    const originalError = console.error;

    console.log = wrapLogFn(originalLog);
    console.error = wrapLogFn(originalError);
};

export { setupLogs };
