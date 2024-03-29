import { z } from 'zod';

export const requestHeaderTokenSchema = z.object({
  token: z.string().min(1, { message: 'Token is required' }),
});
export type RequestHeaderToken = z.infer<typeof requestHeaderTokenSchema>;
