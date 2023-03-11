import dayjs from "dayjs";
import { ExtractedGXState } from "../utils/gxstate.utils";

function getDisciplineByCod(allDisciplines: unknown[], cod: string) {
	return allDisciplines.find(
		/* @ts-ignore */
		discipline => discipline['ACD_DisciplinaSigla'] === cod
	);
}

export function getSchedule({ $, ...gxstate }: ExtractedGXState) {
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
	const todayWeek = today.day();

	const schedule = dataGridTags.map((tag, idx) => {
		const dayLessons = JSON.parse($(tag).attr('value') || '{}') as string[][];
		const currWeekday = idx + 1;

		const daySchedule = dayLessons.map(lesson => {
			const [_, horaries, cod] = lesson;
			const [startsAt, endsAt] = horaries.split('-');
			const [startsHour, startsMinute] = startsAt.split('-');
			const [endsHour, endsMinute] = endsAt.split('-');
			
			const startsAtDate = dayjs()
				.set('hour', Number(startsHour))
				.set('minute', Number(startsMinute));

			const endsAtDate = dayjs()
				.set('hour', Number(endsHour))
				.set('minute', Number(endsMinute));
			
			let lessonDay = today.date();
			if ((todayWeek === currWeekday && today > startsAtDate) || todayWeek > currWeekday) {
				lessonDay += 7;
			} else {
				lessonDay += currWeekday - todayWeek;
			}

			startsAtDate.set('date', lessonDay);
			endsAtDate.set('date', lessonDay);

			const disciplineRaw = getDisciplineByCod(allDisciplines, cod);
			const discipline = disciplineRaw && {
				/* @ts-ignore */
				name: disciplineRaw['ACD_DisciplinaNome'],
				/* @ts-ignore */
				teacherName: disciplineRaw['Pro_PessoalNome'],
			}

			return {
				cod,
				discipline,
				startsAt: startsAtDate,
				endsAt: endsAtDate,
			}
		});

		return daySchedule.sort(
			(a, b) => dayjs(a.startsAt) < dayjs(b.startsAt) ? -1 : 1
		);
	});
	return schedule;
}