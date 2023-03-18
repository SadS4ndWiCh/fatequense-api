import type { ExtractedGXState } from "../utils/gxstate.utils";
import { toTitleCase } from "../utils/to-title-case.utils";

import { studentProfileSchema } from "./schemas/profile.schema";

export function getStudentProfile({ $, ...gxstate }: ExtractedGXState) {
	const photoUrl = $(`#${gxstate.prefix}FOTO > img`).attr('src');

	return studentProfileSchema.parse({
		name: toTitleCase(gxstate.get('vPRO_PESSOALNOME').replace(' -', '')),
		personalEmail: gxstate.get('vPRO_PESSOALEMAIL'),
		institutionalEmail: gxstate.get('vINSTITUCIONALFATEC', true),
		cpf: gxstate.get('vPRO_PESSOALDOCSCPF'),
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
}