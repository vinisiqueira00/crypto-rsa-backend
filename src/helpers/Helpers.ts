export abstract class Helpers {
    static charToCode(character: string, size: number) {
        try {

            return character.charCodeAt(0) + parseInt(`1${'0'.repeat(size - 1)}`)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    static codeToChar(code: number, size: number) {
        try {
            return String.fromCharCode(code - parseInt(`1${'0'.repeat(size - 1)}`))
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}
