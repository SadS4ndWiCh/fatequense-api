import { getPageHtml } from "~/test/utils/get-page-html.utils";
import { extractGXStateOfHTML } from "../utils/gxstate.utils";
import { getPartialGrade } from "./partial-grade.scrapper";

describe('Partial Grade scrapper function', () => {
	it('should be able to get student partial grade from HTML', () => {
		const partialGradeHtmlContent = getPageHtml('partialGrade');

		const partialGrade = getPartialGrade(extractGXStateOfHTML(partialGradeHtmlContent));

		expect(partialGrade.length).toBeGreaterThanOrEqual(1);
		expect(partialGrade).toContainEqual(
			expect.objectContaining({
				cod: expect.any(String),
			})
		)
	});
});