import express from "express";
import type {Request, Response, NextFunction} from "express";
import router from "./features";


const app = express();
app.use(express.json());

app.use("/", router);

app.get("/health", (_req: Request, res: Response) => {
    return res.status(200).send("Server is running");
})

// 에러 핸들링
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {

})

export default app;
