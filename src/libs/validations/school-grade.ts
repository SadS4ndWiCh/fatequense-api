import { z } from 'zod';

export const schoolGradeDisciplineSchema = z
  .object({
    workload: z.number(),
    code: z.string().min(1),
    name: z.string().min(1),
    status: z.enum(['dismissed', 'approved', 'attending', 'not-attended']),
    period: z.number().optional(),
    frequency: z.number().optional(),
    grade: z.number().optional(),
  })
  .refine((discipline) => {
    if (
      discipline.status === 'not-attended' &&
      (!!discipline.period || !!discipline.frequency || !!discipline.grade)
    )
      return false;

    return true;
  });

export const schoolGradeSchema = z.array(
  z.object({
    semester: z.number(),
    disciplines: z.array(schoolGradeDisciplineSchema),
  }),
);
