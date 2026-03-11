# TS-Express-Prisma-Backend-Architecture

TypeScript + Express + Prisma 기반 백엔드 프로젝트의 boilerplate입니다.
반복적으로 사용되는 프로젝트 구조와 설정을 미리 정의하여, 새 프로젝트를 빠르게 시작할 수 있습니다.

## Tech Stack

| 분류 | 기술 |
|------|------|
| Runtime | Node.js (ES Module) |
| Language | TypeScript 5.x |
| Framework | Express 5.x |
| ORM | Prisma 7.x (MariaDB Adapter) |
| Database | MySQL / MariaDB |
| Cache | Redis |
| Logging | Winston |
| API Docs | Swagger UI |

## Project Structure

```
├── config/
│   ├── config.ts          # 환경 변수 및 앱 설정
│   └── db.config.ts       # Prisma 클라이언트 초기화
├── prisma/
│   ├── schema.prisma      # Prisma 스키마 정의
│   ├── generated/         # Prisma 자동 생성 파일 (gitignore)
│   └── migrations/        # DB 마이그레이션 파일
├── src/
│   ├── server.ts          # 엔트리포인트 (DB 연결 & 서버 시작)
│   ├── app.ts             # Express 앱 설정 및 미들웨어
│   ├── common/            # 공통 유틸리티 (CustomResponse 등)
│   ├── features/          # 기능별 모듈 (라우터, 컨트롤러, 서비스)
│   │   ├── index.ts       # 라우터 통합
│   │   └── auth/          # 인증 모듈 예시
│   └── libs/              # 라이브러리 (logger, model 등)
├── prisma.config.ts       # Prisma CLI 설정
├── tsconfig.json          # TypeScript 설정
└── .env                   # 환경 변수 (gitignore)
```

## Path Aliases

`tsconfig.json`에 정의된 경로 별칭을 사용합니다.

| Alias | Path |
|-------|------|
| `@config/*` | `config/*` |
| `@features/*` | `src/features/*` |
| `@generated/*` | `prisma/generated/*` |
| `@libs/*` | `src/libs/*` |

## Getting Started

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env` 파일을 프로젝트 루트에 생성합니다.

```env
app="development"   # development | production

DATABASE_URL=mysql://root:1234@localhost:3306/myDB
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=1234
DATABASE_NAME=myDB

REDIS_URL=redis://:@localhost:6379

# Naver Config
NAVER_CLIENT_ID="..."
NAVER_CLIENT_SECRET="..."
```

### 3. Prisma 설정

```bash
# Prisma 클라이언트 생성
npx prisma generate

# DB 마이그레이션 적용
npx prisma migrate dev
```

### 4. 개발 서버 실행

```bash
npm run dev
```

서버가 `http://localhost:3000`에서 실행됩니다.

## Health Check

```
GET /health
```

서버 상태를 확인할 수 있습니다.

## Feature Module 추가 방법

1. `src/features/` 아래에 새 디렉토리를 생성합니다.
2. 라우터 파일을 작성합니다. (예: `src/features/user/user.router.ts`)
3. `src/features/index.ts`에서 라우터를 등록합니다.

```typescript
import userRouter from "./user/user.router";
router.use("/user", userRouter);
```

## License

작성자: 최현우
라이센스: ISC

> 자유롭게 사용하시고 제안사항 있으면 이메일로 연락주세요!
