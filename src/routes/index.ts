import cors from 'cors'
import { Request, Response, Router } from "express"

import { decryptionRouter } from "./decryption.routes"
import { encryptionRouter } from "./encryption.routes"
import { keysGenerationRouter } from "./keys-generation.routes"

export const router = Router()

router.use(cors({
    origin: 'http://localhost:3000'
}))

router.get('/', (_request: Request, response: Response) => {
    return response.send('Express Typescript on Vercel')
})

router.use("/encryption", encryptionRouter)
router.use("/decryption", decryptionRouter)
router.use("/keys-generation", keysGenerationRouter)
