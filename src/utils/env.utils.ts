import * as dotenv from 'dotenv';
dotenv.config();

import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().transform((port) => Number(port)),

  JWT_SECRET_KEY: z.string().min(1),
  JWT_EXPIRES_IN: z.string().min(1),
  JWT_ALGORITHM: z.string().min(1),
});

export const env = envSchema.parse(process.env);
