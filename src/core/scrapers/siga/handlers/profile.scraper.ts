import { studentProfileSchema } from '~/libs/validations/profile';

import { withGXState } from '../utils/gxstate.utils';

export const getStudentProfile = withGXState(({ $, ...gxstate }) => {
  const photoUrl = $(`#${gxstate.prefix}FOTO > img`).attr('src');

  return studentProfileSchema.parse({
    name: gxstate.get('vPRO_PESSOALNOME').replace(' -', ''),
    ra: gxstate.get('vACD_ALUNOCURSOREGISTROACADEMICOCURSO', true),
    personalEmail: gxstate.get('vPRO_PESSOALEMAIL'),
    institutionalEmail: gxstate.get('vINSTITUCIONALFATEC', true),
    birthday: gxstate.get('vPRO_PESSOALDATANASCIMENTO'),
    averageGrade: Number(gxstate.get('vACD_ALUNOCURSOINDICEPR', true)),
    progression: Number(gxstate.get('vACD_ALUNOCURSOINDICEPP', true)),
    photoUrl: photoUrl ? new URL(photoUrl).href : null,
    college: {
      name: gxstate.get('vUNI_UNIDADENOME_MPAGE'),
      courseName: gxstate.get('vACD_CURSONOME_MPAGE'),
      currentSemester: Number(gxstate.get('vACD_ALUNOCURSOCICLOATUAL', true)),
      coursePeriod: gxstate.get('vACD_PERIODODESCRICAO_MPAGE'),
      state: gxstate.get('vSITUACAO_MPAGE'),
    },
  });
});
