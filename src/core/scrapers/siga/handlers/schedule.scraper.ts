import dayjs from 'dayjs';
import { StudentSchedule } from '~/types';
import { IDisciplineRaw } from '~/types/core';

import { studentScheduleSchema } from '~/libs/validations/schedule';

import { withGXState } from '../utils/gxstate.utils';

function getDisciplineByCod(allDisciplines: IDisciplineRaw[], cod: string) {
  for (const discipline of allDisciplines) {
    if (discipline.ACD_DisciplinaSigla === cod) {
      const title = discipline['ACD_DisciplinaNome'];
      const [, name, hours] = title.match(/^(.+)<br&gt;(\d+)hs/) ?? [];

      return {
        name,
        hoursPerLesson: Number(hours),
        teacherName: discipline['Pro_PessoalNome'],
      };
    }
  }
}

export const getStudentSchedule = withGXState<StudentSchedule>(
  ({ $, ...gxstate }) => {
    const allDisciplines = gxstate.get('vALU_ALUNOHISTORICOITEM_SDT');
    const dataGridTags = [
      '[name="Grid2ContainerDataV"]',
      '[name="Grid3ContainerDataV"]',
      '[name="Grid4ContainerDataV"]',
      '[name="Grid5ContainerDataV"]',
      '[name="Grid6ContainerDataV"]',
      '[name="Grid7ContainerDataV"]',
    ];

    const today = dayjs();
    const todayStr = today.format('YYYY-MM-DD');
    const todayWeek = today.day();

    const schedule = dataGridTags.map((tag, idx) => {
      const dayLessons = JSON.parse($(tag).attr('value') || '{}') as string[][];
      const currWeekday = idx + 1;

      return dayLessons
        .map((lesson) => {
          const [_, horaries, cod] = lesson;
          const [startsAt, endsAt] = horaries.split('-');

          const incDays = (currWeekday - todayWeek + 7) % 7;

          const startsAtDate = dayjs(
            `${todayStr} ${startsAt}`,
            'DD/MM/YYYY HH:mm',
          ).add(incDays, 'day');
          const endsAtDate = dayjs(
            `${todayStr} ${endsAt}`,
            'DD/MM/YYYY HH:mm',
          ).add(incDays, 'day');

          const discipline = getDisciplineByCod(allDisciplines, cod);

          return {
            cod,
            startsAt: startsAtDate.toISOString(),
            endsAt: endsAtDate.toISOString(),
            discipline,
          };
        })
        .sort((a, b) => (dayjs(a.startsAt) < dayjs(b.startsAt) ? -1 : 1));
    });

    return studentScheduleSchema.parse(schedule);
  },
);
