import { ExtractedGXState } from "../utils/gxstate.utils";

import { studentPartialAbsencesSchema } from "./schemas/partialAbsences.schema";

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
					date: lesson['ACD_PlanoEnsinoConteudoDataAula'],
					presences: lesson['Presencas'],
					absences: lesson['Ausencias'],
				}))
			})
		));
}