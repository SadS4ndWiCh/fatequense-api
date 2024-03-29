import { studentDisciplineDetailsSchema } from '~/libs/validations/discipline';

import { DisciplineNotFound } from '../errors/discipline-not-found.error';

import { withGXState } from '../utils/gxstate.utils';

import { MINIMUM_ATTENDANCE_PERCENTAGE } from '../siga.constants';

export const getStudentDiscipline = withGXState(({ $ }) => {
  const isDisciplineInvalid = !!$('#gxErrorViewer').text();
  if (isDisciplineInvalid) throw new DisciplineNotFound();

  const totalWorkload = Number(
    $('#span_W0008W0013vACD_DISCIPLINAAULASTOTAISPERIODO').text(),
  );
  const totalAbsencesAllowed =
    totalWorkload - totalWorkload * MINIMUM_ATTENDANCE_PERCENTAGE;

  return studentDisciplineDetailsSchema.parse({
    name: $('#span_W0005vACD_DISCIPLINANOME').text(),
    code: $('#span_W0005vSHOW_ACD_DISCIPLINASIGLA').text(),
    class: $('#span_W0005vACD_TURMALETRA').text(),
    teacherName: $('#span_W0005vPRO_PESSOALNOME').text(),
    syllabus: $('#span_W0008W0013vACD_DISCIPLINAEMENTA').text(),
    goal: $('#span_W0008W0013vACD_DISCIPLINAOBJETIVO').text(),
    workload: {
      weekly: $('#span_W0008W0013vACD_DISCIPLINAAULASSEMANAIS').text(),
      theorical: $('#span_W0008W0013vACD_DISCIPLINAAULASTEORICAS').text(),
      practical: $('#span_W0008W0013vACD_DISCIPLINAAULASPRATICAS').text(),
      total: totalWorkload,
    },
    totalAbsencesAllowed,
  });
});
