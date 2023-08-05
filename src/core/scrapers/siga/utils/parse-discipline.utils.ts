import { IDisciplineRaw } from '~/types/core';

import { MINIMUM_ATTENDANCE_PERCENTAGE } from '../siga.constants';

export function parseDiscipline(discipline: IDisciplineRaw) {
  const title = discipline['ACD_DisciplinaNome'];
  const [, name, hours] =
    title.match(/^(.+)(?:<br\\?&?gt;|<br\\?>)(\d+)hs/) ?? [];

  const totalWorkload = 20 * Number(hours);

  const totalAbsencesAllowed =
    totalWorkload - totalWorkload * MINIMUM_ATTENDANCE_PERCENTAGE;

  return {
    name,
    code: discipline['ACD_DisciplinaSigla'],
    teacherName: discipline['Pro_PessoalNome'],
    class: discipline['ACD_TurmaLetra'],
    workload: Number(hours),
    totalAbsencesAllowed,
  };
}
