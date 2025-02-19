import dotenv from 'dotenv';

dotenv.config();

export const AppConfig = {
    PORT: process.env.PORT ?? 9005 as number,
    DB_URL: process.env.DB_URL as string,
    JWT_KEY: process.env.JWT_KEY as string,
};