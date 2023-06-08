"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encryption = void 0;
const BreakMessageIntoBlocks_1 = require("../library/BreakMessageIntoBlocks");
const ModularPotentialArithmeticAlgorithm_1 = require("../library/ModularPotentialArithmeticAlgorithm");
class Encryption {
    decipherPublicKey(publicKey) {
        let result = publicKey;
        result = Buffer.from(result, 'base64').toString();
        result = Buffer.from(result, 'base64').toString();
        return {
            n: BigInt(result.toString().split('_')[0]),
            e: BigInt(result.toString().split('_')[1]),
        };
    }
    generateBlocks(message, n) {
        const breakMessageIntoBlocks = new BreakMessageIntoBlocks_1.BreakMessageIntoBlocks();
        const blocks = breakMessageIntoBlocks.break(message, n, Encryption.ALPHABET_LENGTH);
        return blocks;
    }
    encodeBlocks(blocks, n, e) {
        const modularPotentialArithmetic = new ModularPotentialArithmeticAlgorithm_1.ModularPotentialArithmeticAlgorithm();
        const encodedBlocks = blocks.map(block => {
            const blockEncoded = modularPotentialArithmetic.calculate(BigInt(block), e, n);
            return (blockEncoded < 0n) ? (blockEncoded + n).toString() : blockEncoded.toString();
        });
        return encodedBlocks;
    }
    encode({ message, publicKey }) {
        const { n, e } = this.decipherPublicKey(publicKey);
        const blocks = this.generateBlocks(message, n);
        const encodedBlocks = this.encodeBlocks(blocks, n, e);
        // console.log("[Encryption] texto: ", message)
        // console.log("[Encryption] N: ", n)
        // console.log("[Encryption] texto em dígitos: ", blocks.join(''))
        // console.log("[Encryption] blocos: ", blocks)
        // console.log("[Encryption] E: ", e)
        // console.log("[Encryption] blocos codificados: ", encodedBlocks)
        return encodedBlocks;
    }
}
exports.Encryption = Encryption;
Encryption.ALPHABET_LENGTH = 8;
