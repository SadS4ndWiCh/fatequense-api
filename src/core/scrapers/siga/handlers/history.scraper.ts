import { StudentDisciplineHistory, StudentHistory } from '~/types';
import { IDisciplineHistoryRaw } from '~/types/core';

import { studentHistorySchema } from '~/libs/validations/history';

import { withGXState } from '../utils/gxstate.utils';

export const getStudentHistory = withGXState<StudentHistory>((gxstate) => {
  return studentHistorySchema.parse(
    gxstate.get('vALU_ALUNONOTAS_SDT').map(
      (disciplineHistory: IDisciplineHistoryRaw): StudentDisciplineHistory => ({
        cod: disciplineHistory['ACD_DisciplinaSigla'],
        disciplineName: disciplineHistory['ACD_DisciplinaNome'],
        description: disciplineHistory['GER_TipoObservacaoHistoricoDescricao'],
        finalGrade: disciplineHistory['ACD_AlunoHistoricoItemMediaFinal'],
        totalAbsences: disciplineHistory['ACD_AlunoHistoricoItemQtdFaltas'],
        presenceFrequency:
          disciplineHistory['ACD_AlunoHistoricoItemFrequencia'] / 100,
        renunciationAt: !disciplineHistory[
          'ACD_AlunoHistoricoItemDesistenciaData'
        ].startsWith('0000')
          ? disciplineHistory['ACD_AlunoHistoricoItemDesistenciaData']
          : null,
        isApproved: disciplineHistory['ACD_AlunoHistoricoItemAprovada'] === 1,
      }),
    ),
  );
});
