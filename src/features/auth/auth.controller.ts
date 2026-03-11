import type {Request, Response} from "express";
import {CustomError, makeResponse} from "@common/CustomResponse";
import * as service from "./auth.service";

export const naverLogin = async (req: Request, res: Response) => {
    const {code, state} = req.query;
    if (typeof code !== "string" || typeof state !== "string") throw CustomError.BAD_REQUEST();

    const data = await service.naverLogin(code, state);
    return res.status(200).json(makeResponse({data}));
}
