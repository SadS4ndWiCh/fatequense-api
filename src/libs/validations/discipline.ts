import { z } from 'zod';

export const studentDisciplineSchema = z.object({
  name: z.string().min(1),
  code: z.string().min(1),
  class: z.string().min(1),
  teacherName: z
    .string()
    .transform((teacherName) =>
      teacherName
        .toLowerCase()
        .replace(/(^|\s)\S/g, (char) => char.toUpperCase()),
    ),
  workload: z.number(),
  totalAbsencesAllowed: z.number(),
});
export type Discipline = z.infer<typeof studentDisciplineSchema>;

export const studentAllDisciplineShema = z.array(studentDisciplineSchema);
export type AllDisciplines = z.infer<typeof studentAllDisciplineShema>;

export const studentDisciplineDetailsSchema = studentDisciplineSchema.extend({
  syllabus: z.string().min(1),
  goal: z.string().min(1),
  workload: z.object({
    weekly: z.coerce.number(),
    theorical: z.coerce.number(),
    practical: z.coerce.number(),
    total: z.coerce.number(),
  }),
});
export type DisciplineDetails = z.infer<typeof studentDisciplineDetailsSchema>;

export const disciplineParamsSchema = z.object({
  code: z.string().min(1, { message: 'Missing discipline code' }),
});
export type DisciplineParams = z.infer<typeof disciplineParamsSchema>;
