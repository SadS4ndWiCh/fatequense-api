import dayjs from 'dayjs';
import { IDisciplinePartialGradeRaw } from '~/types/core';

import { studentPartialGradeSchema } from '~/libs/validations/partial-grade';

import { withGXState } from '../utils/gxstate.utils';

function parseStartsAtDate(date: string) {
  const startsAt = dayjs(date);

  if (startsAt.isBefore(dayjs().startOf('year'))) return null;

  return startsAt.toISOString();
}

export const getStudentPartialGrade = withGXState((gxstate) => {
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
});
