import dotEnv from 'dotenv';
dotEnv.config();
const env = {
	PORT: process.env.PORT || 5500,
	MONGO_URI: process.env.MONGO_URI as string,
	APP_SECRET: process.env.APP_SECRET as string,
	SALT_ROUNDS: 10,
	REDIS_URL: process.env.REDIS_URL as string,
	NODE_ENV: (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development',
	GEMINI_API_KEY: process.env.GEMINI_API_KEY as string,
	LINKEDIN_COOKIE: process.env.LINKEDIN_COOKIE as string,
    LINKEDIN_USERNAME: process.env.LINKEDIN_USERNAME as string,
    LINKEDIN_PASSWORD: process.env.LINKEDIN_PASSWORD as string,
};

export default env;
