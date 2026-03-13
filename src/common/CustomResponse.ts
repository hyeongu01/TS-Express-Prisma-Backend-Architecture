import ajv, { type JSONSchemaType } from "@libs/ajv.js";

interface CustomResponse {
    success: true,
    data?: any,
    meta?: any,
}

/**
 * 표준 성공 응답 코드
 * @param params
 */
export const makeResponse = (params: {data?: any, meta?: any}): CustomResponse => {
    return {
        success: true,
        data: params.data,
        meta: params.meta,
    };
}

interface CustomErrorBody {
    statusCode: number;
    success: boolean;
    error: {
        code: string;
        message: string;
    };
}
export const CustomErrorSchema: JSONSchemaType<CustomErrorBody> = {
    type: "object",
    properties: {
        statusCode: { type: "number", minimum: 200, maximum: 500 },
        success: { type: "boolean" },
        error: {
            type: "object",
            properties: {
                code: { type: "string" },
                message: { type: "string" },
            },
            required: ["code", "message"],
            additionalProperties: false,
        },
    },
    required: ["statusCode", "success", "error"],
    additionalProperties: false,
};
export const validateCustomError = ajv.compile(CustomErrorSchema);

export interface CustomError {
    statusCode: number,
    success: boolean,
    error: {
        code: string,
        message: string,
        details?: any
    }
}

/**
 * 표준 에러 생성 코드
 * @param statusCode
 * @param code
 */
const makeError = (statusCode: number, code: string) => {
    return (message: string = code): CustomError => ({
        statusCode,
        success: false,
        error: {
            code,
            message,
        }
    });
}

/**
 * 표준 에러 객체 반환
 */
export const customError = {
    UNAUTHORIZED: makeError(401, "UNAUTHORIZED"),
    BAD_REQUEST: makeError(400, "BAD_REQUEST"),
    NOT_FOUND: makeError(404, "NOT_FOUND"),
    SERVER_ERROR: makeError(500, "SERVER_ERROR"),

} as const;
