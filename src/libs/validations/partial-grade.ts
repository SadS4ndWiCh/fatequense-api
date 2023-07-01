import { z } from 'zod';

export const studentPartialGradeSchema = z.array(
  z.object({
    cod: z.string().length(6),
    disciplineName: z.string().min(1),
    averageGrade: z.number(),
    examsDates: z.array(
      z.object({
        title: z.string().min(1),
        startsAt: z.string().nullish(),
        grade: z.number(),
      }),
    ),
  }),
);

export type PartialGrade = z.infer<typeof studentPartialGradeSchema>;
