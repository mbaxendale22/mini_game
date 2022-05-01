/**
 * Generates random number between and upper and lower boundary. Excludes one number from being returned.
 */
export const generateRandomNumberBetween = (
    min: number,
    max: number,
    exclude: number,
): number => {
    const randomNumber = Math.floor(Math.random() * (max - min)) + min
    if (randomNumber === exclude) {
        return generateRandomNumberBetween(min, max, exclude)
    } else {
        return randomNumber
    }
}
