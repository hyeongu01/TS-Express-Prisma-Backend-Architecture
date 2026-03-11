import express from "express";
import type {Request, Response, NextFunction} from "express";
import routers from "@features";

const app = express();
app.use(express.json());

app.use("/", routers);

// 에러 핸들링
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {

})