import { z } from 'zod';

export const studentDatabaseSchema = z.object({
  photoUrl: z.string().url().optional(),
});
