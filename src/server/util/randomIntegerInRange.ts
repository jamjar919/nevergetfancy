// Return a random integer in the range [min, max] (inclusive)
const randomIntegerInRange = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { randomIntegerInRange };