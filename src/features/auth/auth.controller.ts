import type {Request, Response} from "express";
import {customError, makeResponse} from "@common/CustomResponse";
import * as service from "./auth.service";
import {validateNaverLoginParams, type NaverLoginParams} from "@features/auth/auth.dto";

export const naverLogin = async (req: Request, res: Response) => {
    const data = req.query as Record<string, unknown>;
    if (!validateNaverLoginParams(data)) throw customError.BAD_REQUEST();

    const result = await service.naverLogin(data as NaverLoginParams);
    return res.status(200).json(makeResponse({data: result}));
}
