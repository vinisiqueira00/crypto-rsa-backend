"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModularInverseArithmeticAlgorithm = void 0;
const ExtendedEuclideanAlgorithm_1 = require("./ExtendedEuclideanAlgorithm");
class ModularInverseArithmeticAlgorithm {
    calculate({ number, moduleNumber }) {
        try {
            const extendedEuclidean = new ExtendedEuclideanAlgorithm_1.ExtendedEuclideanAlgorithm();
            const result = extendedEuclidean.calculate({ firstNumber: moduleNumber, secondNumber: number });
            if (result.gcd === 1n) {
                if (result.beta < 0n) {
                    return result.beta + moduleNumber;
                }
                return result.beta;
            }
            return 0n;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.ModularInverseArithmeticAlgorithm = ModularInverseArithmeticAlgorithm;
