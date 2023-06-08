"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreakMessageIntoBlocks = void 0;
const Helpers_1 = require("../helpers/Helpers");
class BreakMessageIntoBlocks {
    constructor() {
        this.blocks = [];
        this.message = "";
    }
    textToMessage(text, size) {
        return text.split("").map((textChar) => Helpers_1.Helpers.charToCode(textChar, size)).join("");
    }
    resetMessage(blockLength) {
        this.message = this.message.substring(blockLength);
    }
    generateBlock(reviews) {
        const validReviews = reviews.filter(review => review.isValid);
        const lastValidReview = validReviews[validReviews.length - 1];
        const block = lastValidReview.value;
        this.blocks.push(block);
        this.resetMessage(block.length);
    }
    break(text, n, size) {
        try {
            this.message = this.textToMessage(text, size);
            let reviews = [];
            let index = 1;
            while (index <= this.message.length) {
                const inReview = this.message.substring(0, index);
                const nextValue = this.message[index];
                if (BigInt(inReview) >= n) {
                    reviews.push({ value: inReview, isValid: false });
                    this.generateBlock(reviews);
                    index = 1;
                    reviews = [];
                    continue;
                }
                else if (!nextValue) {
                    reviews.push({ value: inReview, isValid: true });
                    this.generateBlock(reviews);
                }
                else if (BigInt(nextValue) === 0n) {
                    reviews.push({ value: inReview, isValid: false });
                }
                else {
                    reviews.push({ value: inReview, isValid: true });
                }
                index++;
            }
            return this.blocks;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.BreakMessageIntoBlocks = BreakMessageIntoBlocks;
