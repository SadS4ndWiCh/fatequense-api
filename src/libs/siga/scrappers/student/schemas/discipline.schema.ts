import { z } from "zod";
import { toTitleCase } from "../../utils/to-title-case.utils";

export const disciplineSchema = z.object({
	name: z.string().min(1),
	code: z.string().min(1),
	class: z.string().min(1),
	teacherName: z.string().transform(teacherName => toTitleCase(teacherName)),
	syllabus: z.string().min(1),
	goal: z.string().min(1),
	workload: z.object({
		weekly: z.coerce.number(),
		theorical: z.coerce.number(),
		practical: z.coerce.number(),
		total: z.coerce.number(),
	}),
	totalAbsencesAllowed: z.coerce.number(),
});