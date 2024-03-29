import dayjs from 'dayjs';

import { Discipline } from '~/libs/validations/discipline';
import { studentScheduleSchema } from '~/libs/validations/schedule';

import { withGXState } from '../utils/gxstate.utils';
import { parseDiscipline } from '../utils/parse-discipline.utils';

export const getStudentSchedule = withGXState(({ $, ...gxstate }) => {
  const allDisciplines = gxstate
    .get('vALU_ALUNOHISTORICOITEM_SDT')
    .map(parseDiscipline)
    .reduce(
      (prev, curr) => prev.set(curr.code, curr),
      new Map<string, Discipline>(),
    );

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

        const discipline = allDisciplines.get(cod);

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
});
