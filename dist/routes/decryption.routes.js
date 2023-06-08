"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptionRouter = void 0;
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const stream_1 = require("stream");
const multer_2 = require("../config/multer");
const Decryption_1 = require("../algorithms/Decryption");
const upload = (0, multer_1.default)(multer_2.multerConfig);
exports.decryptionRouter = (0, express_1.Router)();
exports.decryptionRouter.post("/", upload.single('file'), (request, response) => {
    try {
        const file = request.file;
        const { privateKey } = request.body;
        if (!file)
            throw new Error('Arquivo não enviado.');
        fs_1.default.readFile(file.path, 'utf8', (err, contentFile) => {
            if (err)
                throw new Error('Erro ao ler o arquivo.');
            const decryption = new Decryption_1.Decryption();
            const message = decryption.decode({
                encodedBlocks: contentFile.split(';'),
                privateKey: privateKey,
            });
            const readableStream = new stream_1.Readable();
            readableStream.push(message);
            readableStream.push(null);
            response.setHeader('Content-Type', 'text/plain');
            response.setHeader('Content-Disposition', 'attachment; filename="arquivo.txt"');
            readableStream.pipe(response);
        });
    }
    catch (error) {
        return response.status(400).json({ error: error.message });
    }
});
