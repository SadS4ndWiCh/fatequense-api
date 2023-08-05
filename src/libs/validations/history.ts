import { z } from 'zod';

export const studentDisciplineHistorySchema = z.object({
  cod: z.string().length(6),
  disciplineName: z.string().min(1),
  description: z.string(),
  finalGrade: z.number(),
  totalAbsences: z.number(),
  presenceFrequency: z.number(),
  renunciationAt: z.string().nullable(),
  isApproved: z.boolean(),
});
export type DisciplineHistory = z.infer<typeof studentDisciplineHistorySchema>;

export const studentHistorySchema = z.array(studentDisciplineHistorySchema);
export type History = z.infer<typeof studentHistorySchema>;
