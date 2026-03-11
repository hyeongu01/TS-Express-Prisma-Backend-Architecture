import "dotenv/config";

interface Config {
    app: string;
    db: {
        url: string;
        host: string;
        port: number;
        user: string;
        password: string;
        database: string;
    },
    redis: {
        url: string;
    },
}

const config: Config = {
    app: process.env.app || "development",
    db: {
        url: process.env.DATABASE_URL || "mysql://root:1234@localhost:3306/myDB",
        host: process.env.DATABASE_HOST || "localhost",
        port: Number(process.env.DATABASE_PORT) || 3306,
        user: process.env.DATABASE_USER || "root",
        password: process.env.DATABASE_PASSWORD || "1234",
        database: process.env.DATABASE_NAME || "myDB"
    },
    redis: {
        url: process.env.REDIS_URL || "redis://:@localhost:6379",
    },
}

export default config;
