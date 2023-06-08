"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModularPotentialArithmeticAlgorithm = void 0;
const ModularArithmeticAlgorithm_1 = require("./ModularArithmeticAlgorithm");
class ModularPotentialArithmeticAlgorithm {
    calculate(baseNumber, exponentNumber, moduleNumber) {
        try {
            const modularArithmeticAlgorithm = new ModularArithmeticAlgorithm_1.ModularArithmeticAlgorithm();
            let result = 1n;
            baseNumber = baseNumber % moduleNumber;
            while (exponentNumber > 0) {
                if (exponentNumber % 2n === 1n) {
                    const r = (result * baseNumber) % moduleNumber;
                    result = modularArithmeticAlgorithm.calculate(moduleNumber, r);
                }
                exponentNumber = exponentNumber / 2n;
                baseNumber = (baseNumber * baseNumber) % moduleNumber;
            }
            return result;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.ModularPotentialArithmeticAlgorithm = ModularPotentialArithmeticAlgorithm;
