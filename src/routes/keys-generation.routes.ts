import express, { Request, Response, Router } from "express"

import { KeysGeneration } from "../algorithms/KeysGeneration"

interface BodyRequest {
    keyName: string
}

type CustomRequest = Request<{}, {}, BodyRequest>

export const keysGenerationRouter = Router()

keysGenerationRouter.post("/", express.json(), (request: CustomRequest, response: Response) => {
    try {
        const { keyName } = request.body

        const keysGeneration = new KeysGeneration()
        keysGeneration.generate().then((keys) => {
            if (!keys) return

            return response.json({
                keyName,
                publicKey: keys.publicKey,
                privateKey: keys.privateKey
            })
        }).catch((error) => console.error(error))
    } catch (error) {
        return response.status(400).json({ error: (error as Error).message })
    }
})
