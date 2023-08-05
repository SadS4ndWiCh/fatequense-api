import { IDisciplinePartialAbsencesRaw } from '~/types/core';

import { studentPartialAbsencesSchema } from '~/libs/validations/partial-absences';

import { withGXState } from '../utils/gxstate.utils';

export const getStudentPartialAbsences = withGXState((gxstate) => {
  return studentPartialAbsencesSchema.parse(
    gxstate.get('vFALTAS').map((discipline: IDisciplinePartialAbsencesRaw) => ({
      cod: discipline['ACD_DisciplinaSigla'].trim(),
      disciplineName: discipline['ACD_DisciplinaNome'],
      totalPresences: discipline['TotalPresencas'],
      totalAbsences: discipline['TotalAusencias'],
      lessons: discipline['Aulas'].map((lesson) => ({
        title: lesson['ACD_PlanoEnsinoConteudoTituloAula'],
        date: lesson['ACD_PlanoEnsinoConteudoDataAula'].startsWith('0000')
          ? lesson['ACD_PlanoEnsinoConteudoDataAula']
          : null,
        presences: lesson['Presencas'],
        absences: lesson['Ausencias'],
      })),
    })),
  );
});
