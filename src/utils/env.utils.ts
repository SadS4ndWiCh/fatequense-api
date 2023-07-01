import * as dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().transform((port) => Number(port)),

  JWT_SECRET_KEY: z.string().min(1),
  JWT_EXPIRES_IN: z.string().min(1),
  JWT_ALGORITHM: z.string().min(1),

  MAX_RATE_LIMIT: z.coerce.number().min(1),

  DATABASE_HOST: z.string().min(1),
  DATABASE_USER: z.string().min(1),
  DATABASE_PASS: z.string().min(1),
  DATABASE_NAME: z.string().min(1),
});

export const env = envSchema.parse(process.env);
