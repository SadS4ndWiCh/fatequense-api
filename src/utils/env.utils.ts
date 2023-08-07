import * as dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  HOST: z.string(),
  PORT: z.coerce.number().optional(),

  JWT_SECRET_KEY: z.string().min(1),
  JWT_EXPIRES_IN: z.string().min(1),
  JWT_ALGORITHM: z.string().min(1),
  COOKIE_SECRET_KEY: z.string().min(1),

  MAX_RATE_LIMIT: z.coerce.number().min(1),

  DATABASE_URL: z.string().min(1),
  UPSTASH_REDIS_REST_URL: z.string().min(1),
});

export const env = envSchema.parse(process.env);
