import { z } from 'zod';

export const studentProfileSchema = z.object({
  name: z.string().min(1),
  personalEmail: z.string().email(),
  institutionalEmail: z.string().email(),
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

export type Profile = z.infer<typeof studentProfileSchema>;
