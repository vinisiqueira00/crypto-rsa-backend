"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helpers = void 0;
class Helpers {
    static charToCode(character, size) {
        try {
            return character.charCodeAt(0) + parseInt(`1${'0'.repeat(size - 1)}`);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    static codeToChar(code, size) {
        try {
            return String.fromCharCode(code - parseInt(`1${'0'.repeat(size - 1)}`));
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.Helpers = Helpers;
