import { z } from 'zod';

export const historySchema = z.array(
  z.object({
    cod: z.string().length(6),
    disciplineName: z.string().min(1),
    description: z.string(),
    finalGrade: z.number(),
    presenceFrequency: z.number(),
    renunciationAt: z.string().nullable(),
    isApproved: z.boolean(),
  }),
);
