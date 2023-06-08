import { Request, Response, Router } from "express";
import fs from 'fs';
import multer from 'multer';
import { Readable } from 'stream';

import { multerConfig } from "../config/multer";

import { Decryption } from "../algorithms/Decryption";

interface BodyRequest {
    privateKey: string
}

type CustomRequest = Request<{}, {}, BodyRequest>

const upload = multer(multerConfig)

export const decryptionRouter = Router()

decryptionRouter.post("/", upload.single('file'), (request: CustomRequest, response: Response) => {
    try {
        const file = request.file
        const { privateKey } = request.body

        if (!file) throw new Error('Arquivo não enviado.')

        fs.readFile(file.path, 'utf8', (err, contentFile) => {
            if (err) throw new Error('Erro ao ler o arquivo.')

            const decryption = new Decryption()
            const message = decryption.decode({
                encodedBlocks: contentFile.split(';'),
                privateKey: privateKey,
            })

            const readableStream = new Readable();
            readableStream.push(message);
            readableStream.push(null);

            response.setHeader('Content-Type', 'text/plain');
            response.setHeader('Content-Disposition', 'attachment; filename="arquivo.txt"');

            readableStream.pipe(response);
        })
    } catch (error) {
        return response.status(400).json({ error: (error as Error).message })
    }
})
