"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeysGeneration = void 0;
const bigint_crypto_utils_1 = require("bigint-crypto-utils");
const EuclideanAlgorithm_1 = require("../library/EuclideanAlgorithm");
const ModularInverseArithmeticAlgorithm_1 = require("../library/ModularInverseArithmeticAlgorithm");
class KeysGeneration {
    async generatePrimesNumbers() {
        return [await (0, bigint_crypto_utils_1.prime)(KeysGeneration.BIT_LENGTH), await (0, bigint_crypto_utils_1.prime)(KeysGeneration.BIT_LENGTH)];
    }
    calculatePhi(p, q) {
        return (p - 1n) * (q - 1n);
    }
    calculateE(p, phi) {
        const euclideanAlgorithm = new EuclideanAlgorithm_1.EuclideanAlgorithm;
        for (let e = p; e < phi; e += 2n) {
            const gcd = euclideanAlgorithm.calculate({
                firstNumber: e,
                secondNumber: phi
            });
            if (gcd === 1n)
                return e;
        }
    }
    calculateD(e, phi) {
        const modularInverseArithmeticAlgorithm = new ModularInverseArithmeticAlgorithm_1.ModularInverseArithmeticAlgorithm();
        const d = modularInverseArithmeticAlgorithm.calculate({
            number: e,
            moduleNumber: phi,
        });
        return d;
    }
    cipherKey(privateKey) {
        let buffer = privateKey;
        buffer = Buffer.from(buffer).toString('base64');
        buffer = Buffer.from(buffer).toString('base64');
        return buffer.toString();
    }
    async generate() {
        const [p, q] = await this.generatePrimesNumbers();
        const n = p * q;
        const phi = this.calculatePhi(p, q);
        const e = this.calculateE(p, phi);
        if (!e)
            return;
        const d = this.calculateD(e, phi);
        const keys = {
            public: this.cipherKey(`${n.toString()}_${e.toString()}`),
            private: this.cipherKey(`${p.toString()}_${q.toString()}_${d.toString()}`),
        };
        // console.log("[Keys] P: ", p)
        // console.log("[Keys] Q: ", q)
        // console.log("[Keys] N: ", n)
        // console.log("[Keys] E: ", e)
        // console.log("[Keys] Phi: ", phi)
        // console.log("[Keys] D: ", d)
        return {
            publicKey: keys.public,
            privateKey: keys.private,
        };
    }
}
exports.KeysGeneration = KeysGeneration;
KeysGeneration.BIT_LENGTH = 2048;
