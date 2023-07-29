import { studentAllDiscipline } from '~/types';

import { studentAllDisciplineShema } from '~/libs/validations/discipline';

import { withGXState } from '../utils/gxstate.utils';
import { parseDiscipline } from '../utils/parse-discipline.utils';

export const getAllStudentDisciplines = withGXState<studentAllDiscipline>(
  (gxstate) => {
    const allDisciplines = gxstate
      .get('vALU_ALUNOHISTORICOITEM_SDT')
      .map(parseDiscipline);

    return studentAllDisciplineShema.parse(allDisciplines);
  },
);
