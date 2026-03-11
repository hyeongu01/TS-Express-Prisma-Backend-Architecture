import config from "@config/config";
import {LoginParams, LoginResponse, NaverLoginParams, NaverProfile, NaverProfileSchema} from "@features/auth/auth.dto";
import {customError} from "@common/CustomResponse";
import axios from "axios";
import * as repository from "./auth.repository";
import {getUserByProvider} from "./auth.repository";

export const naverLogin = async (params: NaverLoginParams): Promise<LoginResponse> => {
    // code, state 분리
    const {code, state} = params;

    if (!config.naver) throw customError.SERVER_ERROR();

    // redis 에서 state 검증하는 코드 추가

    // access_token 발급 (네이버 서버 jwt)
    const tokenResult = await axios.get("https://nid.naver.com/oauth2.0/token", {
        params: {
            grant_type: "authorization_code",
            client_id: config.naver.clientId,
            client_secret: config.naver.clientSecret,
            redirect_uri: config.naver.redirectUri,
            code,
            state,
        }
    });
    const {access_token, token_type} = tokenResult.data;
    if (!access_token || !token_type) throw customError.SERVER_ERROR("네이버 토큰 발급 실패");

    // profile 조회
    const profileResult = await axios.get("https://openapi.naver.com/v1/nid/me", {
        headers: {
            Authorization: `${token_type} ${access_token}`,
        }
    });
    const result = NaverProfileSchema.safeParse(profileResult.data.response);
    if (!result.success) throw customError.SERVER_ERROR("네이버 프로필 조회 실패");
    const profile: NaverProfile = result.data;

    const loginParams: LoginParams = {
        providerId: profile.id,
        provider: "NAVER",
        name: profile.name,
        birthDate: (() => {
            const date = new Date(`${profile.birthyear}-${profile.birthday}`);
            return isNaN(date.getTime()) ? undefined : date
        })()
    };

    return await login(loginParams);
}

async function login(params: LoginParams): Promise<LoginResponse> {
    const user = await repository.getUserByProvider(params.provider, params.providerId)
}

