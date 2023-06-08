"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = require("express");
const decryption_routes_1 = require("./decryption.routes");
const encryption_routes_1 = require("./encryption.routes");
const keys_generation_routes_1 = require("./keys-generation.routes");
exports.router = (0, express_1.Router)();
exports.router.use((0, cors_1.default)({
    origin: 'http://localhost:3000'
}));
exports.router.get('/', (_request, response) => {
    return response.send('Express Typescript on Vercel');
});
exports.router.use("/encryption", encryption_routes_1.encryptionRouter);
exports.router.use("/decryption", decryption_routes_1.decryptionRouter);
exports.router.use("/keys-generation", keys_generation_routes_1.keysGenerationRouter);
