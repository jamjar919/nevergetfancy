// Purpose: Returns an array of numbers in the range of start to end, inclusive.
// eg: 5, 10 -> [5, 6 , 7, 8, 9, 10]
const getArrayWithNumbersInRange = (start: number, end: number): number[] => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export { getArrayWithNumbersInRange }