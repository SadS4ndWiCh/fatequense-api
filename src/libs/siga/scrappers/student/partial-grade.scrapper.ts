import dayjs from 'dayjs';

import { ExtractedGXState } from '../utils/gxstate.utils';

import { studentPartialGradeSchema } from './schemas/partial-grade.schema';

function parseStartsAtDate(date: string) {
  const startsAt = dayjs(date);

  if (startsAt.isBefore(dayjs().startOf('year'))) return null;

  return startsAt.toISOString();
}

export function getPartialGrade({ $, ...gxstate }: ExtractedGXState) {
  return studentPartialGradeSchema.parse(
    gxstate
      .get('vACD_ALUNONOTASPARCIAISRESUMO_SDT')
      .map((discipline: IDisciplinePartialGradeRaw) => ({
        cod: discipline['ACD_DisciplinaSigla'],
        disciplineName: discipline['ACD_DisciplinaNome'],
        averageGrade: discipline['ACD_AlunoHistoricoItemMediaFinal'],
        examsDates: discipline['Datas'].map((examDate) => ({
          title: examDate['ACD_PlanoEnsinoAvaliacaoTitulo'],
          startsAt: parseStartsAtDate(
            examDate['ACD_PlanoEnsinoAvaliacaoDataPrevista'],
          ),
          grade:
            examDate['Avaliacoes'].length > 0
              ? examDate['Avaliacoes'][0]['ACD_PlanoEnsinoAvaliacaoParcialNota']
              : 0,
        })),
      })),
  );
}
