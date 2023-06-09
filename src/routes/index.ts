import cors from 'cors'
import { Router } from "express"

import { decryptionRouter } from "./decryption.routes"
import { encryptionRouter } from "./encryption.routes"
import { keysGenerationRouter } from "./keys-generation.routes"

export const router = Router()

router.use(cors({ origin: '*' }))

router.use("/encryption", encryptionRouter)
router.use("/decryption", decryptionRouter)
router.use("/keys-generation", keysGenerationRouter)
