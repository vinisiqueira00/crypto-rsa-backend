"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EuclideanAlgorithm = void 0;
class EuclideanAlgorithm {
    getSmallerNumber(firstNumber, secondNumber) {
        if (firstNumber < secondNumber)
            return firstNumber;
        return secondNumber;
    }
    getHigherNumber(firstNumber, secondNumber) {
        if (firstNumber > secondNumber)
            return firstNumber;
        return secondNumber;
    }
    calculate({ firstNumber, secondNumber }) {
        try {
            const smallerNumber = this.getSmallerNumber(firstNumber, secondNumber);
            const higherNumber = this.getHigherNumber(firstNumber, secondNumber);
            const window = {
                firstField: higherNumber,
                secondField: smallerNumber,
            };
            let rest = 1n;
            while (rest !== 0n) {
                rest = window.firstField % window.secondField;
                window.firstField = window.secondField;
                window.secondField = rest;
            }
            return window.firstField;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.EuclideanAlgorithm = EuclideanAlgorithm;
