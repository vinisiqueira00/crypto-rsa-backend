import { ExtendedEuclideanAlgorithm } from "./ExtendedEuclideanAlgorithm"

export interface ModularInverseArithmeticAlgorithmProps {
    number: bigint
    moduleNumber: bigint
}

export class ModularInverseArithmeticAlgorithm {
    public calculate({ number, moduleNumber }: ModularInverseArithmeticAlgorithmProps): bigint {
        try {
            const extendedEuclidean = new ExtendedEuclideanAlgorithm()
            const result = extendedEuclidean.calculate({ firstNumber: moduleNumber, secondNumber: number})

            if (result.gcd === 1n) {
                if (result.beta < 0n) {
                    return result.beta + moduleNumber
                }

                return result.beta
            }

            return 0n
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}
