import { z } from 'zod';

import { studentDisciplineSchema } from '~/libs/validations/discipline';
import { studentHistorySchema } from '~/libs/validations/history';
import { studentPartialAbsencesSchema } from '~/libs/validations/partial-absences';
import { studentPartialGradeSchema } from '~/libs/validations/partial-grade';
import { studentProfileSchema } from '~/libs/validations/profile';
import { studentScheduleSchema } from '~/libs/validations/schedule';

export type StudentProfile = z.infer<typeof studentProfileSchema>;
export type StudentPartialGrade = z.infer<typeof studentPartialGradeSchema>;
export type StudentPartialAbsences = z.infer<
  typeof studentPartialAbsencesSchema
>;
export type StudentSchedule = z.infer<typeof studentScheduleSchema>;
export type StudentHistory = z.infer<typeof studentHistorySchema>;
export type StudentDiscipline = z.infer<typeof studentDisciplineSchema>;
