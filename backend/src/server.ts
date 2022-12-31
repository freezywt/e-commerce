import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import path from 'path';
import * as dotenv from "dotenv";

import { router } from './routes'

dotenv.config();

const app = express()
app.use(express.json())
app.use(cors())

app.use(router)
app.use(
    '/images',
    express.static(path.resolve(__dirname, '..', 'images'))
)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message,
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.',
    })
})

app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"), () => {
    console.log("\x1b[33m%s\x1b[0m", `\n Welcome Back!`);
    console.log(`\nFind the server at: http://localhost:${app.get("port")}/`);
    console.log(`Database url: ${process.env.DATABASE_URL}`);
});
  