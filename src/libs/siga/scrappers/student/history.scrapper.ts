import { ExtractedGXState } from '../utils/gxstate.utils';

import { historySchema } from './schemas/history.schema';

export function getHistory({ $, ...gxstate }: ExtractedGXState) {
  return historySchema.parse(
    gxstate.get('vALU_ALUNONOTAS_SDT').map(
      (disciplineHistory: IDisciplineHistoryRaw): IDisciplineHistory => ({
        cod: disciplineHistory['ACD_DisciplinaSigla'],
        disciplineName: disciplineHistory['ACD_DisciplinaNome'],
        description: disciplineHistory['GER_TipoObservacaoHistoricoDescricao'],
        finalGrade: disciplineHistory['ACD_AlunoHistoricoItemMediaFinal'],
        totalAbscences: disciplineHistory['ACD_AlunoHistoricoItemQtdFaltas'],
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
}
