import { z } from 'zod';

import { studentDisciplineSchema } from '~/libs/validations/discipline';
import {
  studentDisciplineHistorySchema,
  studentHistorySchema,
} from '~/libs/validations/history';
import { studentPartialAbsencesSchema } from '~/libs/validations/partial-absences';
import { studentPartialGradeSchema } from '~/libs/validations/partial-grade';
import { studentProfileSchema } from '~/libs/validations/profile';
import { studentScheduleSchema } from '~/libs/validations/schedule';
import {
  schoolGradeDisciplineSchema,
  schoolGradeSchema,
} from '~/libs/validations/school-grade';

export type StudentProfile = z.infer<typeof studentProfileSchema>;
export type StudentPartialGrade = z.infer<typeof studentPartialGradeSchema>;
export type StudentPartialAbsences = z.infer<
  typeof studentPartialAbsencesSchema
>;
export type StudentSchedule = z.infer<typeof studentScheduleSchema>;
export type StudentHistory = z.infer<typeof studentHistorySchema>;
export type StudentDisciplineHistory = z.infer<
  typeof studentDisciplineHistorySchema
>;
export type StudentDiscipline = z.infer<typeof studentDisciplineSchema>;
export type StudentSchoolGrade = z.infer<typeof schoolGradeSchema>;
export type StudentSchoolGradeDiscipline = z.infer<
  typeof schoolGradeDisciplineSchema
>;
