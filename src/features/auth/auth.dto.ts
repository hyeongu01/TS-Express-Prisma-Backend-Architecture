import ajv, { type JSONSchemaType } from "@libs/ajv.js";

// 네이버 로그인 서비스 파라메터 타입
export interface NaverLoginParams {
    code: string;
    state: string;
}
// 네이버 로그인 서비스 파라메터 스키마
export const NaverLoginParamsSchema: JSONSchemaType<NaverLoginParams> = {
    type: "object",
    properties: {
        code: { type: "string" },
        state: { type: "string" },
    },
    required: ["code", "state"],
    additionalProperties: false,
};
export const validateNaverLoginParams = ajv.compile(NaverLoginParamsSchema);

// 로그인 결과 response
export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}
// 로그인 결과 서비스 파라메터 스키마
export const LoginResponseSchema: JSONSchemaType<LoginResponse> = {
    type: "object",
    properties: {
        accessToken: {type: "string"},
        refreshToken: {type: "string"},
    },
    required: ["accessToken", "refreshToken"],
}


// 네이버 프로필
export interface NaverProfile {
    id: string;
    name: string;
    birthday?: string;   // MM-dd 형식
    birthyear?: string;  // yyyy 형식
}
export const NaverProfileSchema: JSONSchemaType<NaverProfile> = {
    type: "object",
    properties: {
        id: { type: "string" },
        name: { type: "string" },
        birthday: { type: "string", nullable: true },
        birthyear: { type: "string", nullable: true },
    },
    required: ["id", "name"],
    additionalProperties: false,
};
export const validateNaverProfile = ajv.compile(NaverProfileSchema);

// 로그인 파라메터
export interface LoginParams {
    provider: string;
    providerId: string;
    name: string;
    birthDate?: string;  // ISO date string
}
export const LoginParamsSchema: JSONSchemaType<LoginParams> = {
    type: "object",
    properties: {
        provider: { type: "string", transform: ["toUpperCase"] },
        providerId: { type: "string" },
        name: { type: "string" },
        birthDate: { type: "string", format: "date", nullable: true },
    },
    required: ["provider", "providerId", "name"],
    additionalProperties: false,
};
export const validateLoginParams = ajv.compile(LoginParamsSchema);

// 유저 생성 파라메터
export interface CreateUserParams {
    name: string;
    timezone?: string;
    currency?: string;
    birthDate?: string;  // ISO date string
    provider: string;
    providerId: string;
}
export const CreateUserParamsSchema: JSONSchemaType<CreateUserParams> = {
    type: "object",
    properties: {
        name: { type: "string" },
        timezone: { type: "string", nullable: true },
        currency: { type: "string", minLength: 3, maxLength: 3, nullable: true },
        birthDate: { type: "string", format: "date", nullable: true },
        provider: { type: "string", transform: ["toUpperCase"] },
        providerId: { type: "string" },
    },
    required: ["name", "provider", "providerId"],
    additionalProperties: false,
};
export const validateCreateUserParams = ajv.compile(CreateUserParamsSchema);
