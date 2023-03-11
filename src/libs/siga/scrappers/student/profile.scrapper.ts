import { z } from 'zod';

import type { ExtractedGXState } from "../utils/gxstate.utils";
import { toTitleCase } from "../utils/to-title-case.utils";

export const studentProfileSchema = z.object({
	name: z.string().min(1),
	personalEmail: z.string().email(),
	institutionalEmail: z.string().email(),
	cpf: z.string(),
	birthday: z.string(),
	averageGrade: z.number(),
	progression: z.number(),
	photoUrl: z.string().url(),
	college: z.object({
		name: z.string(),
		courseName: z.string(),
		currentSemester: z.number(),
		coursePeriod: z.string(),
		state: z.string()
	})
});

export type Profile = z.TypeOf<typeof studentProfileSchema>;

export function getStudentProfile({ $, ...gxstate }: ExtractedGXState) {
	return studentProfileSchema.safeParse({
		name: toTitleCase(gxstate.get('vPRO_PESSOALNOME').replace(' -', '')),
		personalEmail: gxstate.get('vPRO_PESSOALEMAIL'),
		institutionalEmail: gxstate.get('vINSTITUCIONALFATEC', true),
		cpf: gxstate.get('vPRO_PESSOALDOCSCPF'),
		birthday: gxstate.get('vPRO_PESSOALDATANASCIMENTO'),
		averageGrade: Number(gxstate.get('vACD_ALUNOCURSOINDICEPR', true)),
		progression: Number(gxstate.get('vACD_ALUNOCURSOINDICEPP', true)),
		photoUrl: $(`#${gxstate.prefix}FOTO > img`).attr('src'),
		college: {
			name: gxstate.get('vUNI_UNIDADENOME_MPAGE'),
			courseName: gxstate.get('vACD_CURSONOME_MPAGE'),
			currentSemester: Number(gxstate.get('vACD_ALUNOCURSOCICLOATUAL', true)),
			coursePeriod: gxstate.get('vACD_PERIODODESCRICAO_MPAGE'),
			state: gxstate.get('vSITUACAO_MPAGE'),
		},
	});
}