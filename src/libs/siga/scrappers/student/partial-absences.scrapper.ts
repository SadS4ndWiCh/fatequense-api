import { ExtractedGXState } from "../utils/gxstate.utils";

import { studentPartialAbsencesSchema } from "./schemas/partial-absences.schema";

export function getPartialAbsences({ $, ...gxstate }: ExtractedGXState) {
	return studentPartialAbsencesSchema.parse(gxstate
		.get('vFALTAS')
		.map(
			(discipline: IDisciplinePartialAbsencesRaw) => ({
				cod: discipline['ACD_DisciplinaSigla'].trim(),
				disciplineName: discipline['ACD_DisciplinaNome'],
				totalPresences: discipline['TotalPresencas'],
				totalAbsences: discipline['TotalAusencias'],
				lessons: discipline['Aulas'].map((lesson) => ({
					title: lesson['ACD_PlanoEnsinoConteudoTituloAula'],
					date: lesson['ACD_PlanoEnsinoConteudoDataAula'].startsWith('0000')
						? lesson['ACD_PlanoEnsinoConteudoDataAula']
						: null,
					presences: lesson['Presencas'],
					absences: lesson['Ausencias'],
				}))
			})
		));
}