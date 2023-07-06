import { z } from 'zod';

export const studentScheduleSchema = z.array(
  z.array(
    z.object({
      cod: z.string().length(6),
      discipline: z
        .object({
          name: z.string().min(1),
          hoursPerLesson: z.number(),
          teacherName: z.string().min(1),
        })
        .optional(),
      startsAt: z.string().datetime(),
      endsAt: z.string().datetime(),
    }),
  ),
);

export type Schedule = z.infer<typeof studentScheduleSchema>;
