"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactorizationAlgorithm = void 0;
class FactorizationAlgorithm {
    constructor() {
        this.initialFactor = 2n;
    }
    sqrt(value) {
        if (value < 0n) {
            throw 'square root of negative numbers is not supported';
        }
        if (value < 2n) {
            return value;
        }
        function newtonIteration(n, x0) {
            const x1 = ((n / x0) + x0) >> 1n;
            if (x0 === x1 || x0 === (x1 - 1n)) {
                return x0;
            }
            return newtonIteration(n, x1);
        }
        return newtonIteration(value, 1n);
    }
    countRepetitions(list, number) {
        let count = 0;
        list.forEach((value) => {
            if (value === number)
                count++;
        });
        return count;
    }
    calculate(number) {
        try {
            const values = [];
            let factor = this.initialFactor;
            let numberAnalyzed = number;
            while (true) {
                if (numberAnalyzed % factor === 0n) {
                    values.push(factor);
                    numberAnalyzed = numberAnalyzed / factor;
                    factor = this.initialFactor;
                    continue;
                }
                factor++;
                if (factor > this.sqrt(numberAnalyzed)) {
                    values.push(numberAnalyzed);
                    break;
                }
            }
            const uniqueValues = values.filter(function (este, i) {
                return values.indexOf(este) === i;
            });
            const newValues = uniqueValues.map((value) => {
                return {
                    factor: value,
                    multiplicity: this.countRepetitions(values, value),
                };
            });
            return newValues;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.FactorizationAlgorithm = FactorizationAlgorithm;
