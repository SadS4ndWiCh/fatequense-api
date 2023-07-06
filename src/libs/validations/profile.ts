import { z } from 'zod';

export const studentProfileSchema = z.object({
  name: z
    .string()
    .min(1)
    .transform((name) =>
      name.toLowerCase().replace(/(^|\s)\S/g, (char) => char.toUpperCase()),
    ),
  ra: z.string().min(1),
  personalEmail: z.string().email().min(1),
  institutionalEmail: z.string().email().min(1),
  birthday: z.string(),
  averageGrade: z.number(),
  progression: z.number(),
  photoUrl: z.string().url(),
  college: z.object({
    name: z.string(),
    courseName: z.string(),
    currentSemester: z.number(),
    coursePeriod: z.string(),
    state: z.string(),
  }),
});
