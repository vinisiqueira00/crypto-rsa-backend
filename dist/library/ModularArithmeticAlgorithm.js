"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModularArithmeticAlgorithm = void 0;
class ModularArithmeticAlgorithm {
    searchNumberIndex(values, number) {
        let counter = 0n;
        for (const value of values) {
            const result = value.findIndex((valueItem) => valueItem === number);
            if (result !== -1) {
                break;
            }
            counter++;
        }
        return counter;
    }
    abs(number) {
        return number >= 0 ? number : -1n * number;
    }
    calculate(moduleNumber, number) {
        try {
            if (!moduleNumber) {
                throw new Error("Non-integer module number");
            }
            const result = ((number % moduleNumber) + moduleNumber) % moduleNumber;
            const middleModule = moduleNumber / 2n;
            if (result > middleModule)
                return result - moduleNumber;
            return result;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.ModularArithmeticAlgorithm = ModularArithmeticAlgorithm;
