import multer from "multer";
import path from "path";

export const multerConfig = {
    storage: multer.diskStorage({
        destination: (req: any, file: any, cb: any) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp'))
        },
        filename: (req: any, file: any, cb: any) => {
            const ext = path.extname(file.originalname)
            cb(null, `${file.fieldname}-${Date.now()}${ext}`)
        }
    }),
}
