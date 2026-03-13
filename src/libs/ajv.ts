import Ajv, { type JSONSchemaType, type ValidateFunction } from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({
    allErrors: true,       // 모든 에러를 수집 (첫 번째 에러에서 멈추지 않음)
    removeAdditional: true, // 스키마에 정의되지 않은 속성 자동 제거
    useDefaults: true,      // default 값 자동 적용
    coerceTypes: true,      // 타입 자동 변환 (e.g. "123" → 123)
});

// 포맷 플러그인 (email, date, uri 등)
addFormats(ajv);

export { ajv, type JSONSchemaType, type ValidateFunction };
export default ajv;
