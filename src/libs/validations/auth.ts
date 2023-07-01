import { z } from 'zod';
import { AUTH_COOKIE_FIELD_NAME } from '~/core/scrapers/siga/siga.constants';

export const loginBodySchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const cookieSchema = z.object({
  [AUTH_COOKIE_FIELD_NAME]: z
    .string()
    .min(1, { message: 'Cookie is required' }),
});
