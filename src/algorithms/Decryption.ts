import { Helpers } from "../helpers/Helpers"

import { ModularPotentialArithmeticAlgorithm } from "../library/ModularPotentialArithmeticAlgorithm"

export class Decryption {
    public static ALPHABET_LENGTH = 8

    private decipherPrivateKey(privateKey: string) {
        let result = privateKey

        result = Buffer.from(result, 'base64').toString()
        result = Buffer.from(result, 'base64').toString()

        return {
            p: BigInt(result.toString().split('_')[0]),
            q: BigInt(result.toString().split('_')[1]),
            d: BigInt(result.toString().split('_')[2]),
        }
    }

    private decodeBlocks(encodedBlocks: string[], n: bigint, d: bigint): string[] {
        const modularPotentialArithmetic = new ModularPotentialArithmeticAlgorithm()

        const decodedBlocks = encodedBlocks.map(encodedBlock => {
            const blockDecoded = modularPotentialArithmetic.calculate(BigInt(encodedBlock), d, n)
            return (blockDecoded < 0n) ? (blockDecoded + n).toString() : blockDecoded.toString()
        })

        return decodedBlocks
    }

    private generateMessage(decodedBlocks: string[]) {
        const decodedText = decodedBlocks.join('')

        const regex = new RegExp(`.{1,${Decryption.ALPHABET_LENGTH}}`, 'g')
        const charCodeList = decodedText.match(regex) || []

        const message = charCodeList.map(charCode => {
            return Helpers.codeToChar(parseInt(charCode), Decryption.ALPHABET_LENGTH)
        }).join('')

        return message
    }

    public decode({encodedBlocks, privateKey}: {encodedBlocks: string[], privateKey: string}) {
        const { p, q, d } = this.decipherPrivateKey(privateKey)
        const n = p * q

        const decodedBlocks = this.decodeBlocks(encodedBlocks, n, d)

        const message = this.generateMessage(decodedBlocks)

        // console.log("[Decryption] P: ", p)
        // console.log("[Decryption] Q: ", q)
        // console.log("[Decryption] N: ", n)
        // console.log("[Decryption] D: ", d)
        // console.log("[Decryption] blocos codificados: ", encodedBlocks)
        // console.log("[Decryption] blocos: ", decodedBlocks)
        // console.log("[Decryption] texto: ", message)

        return message
    }
}

