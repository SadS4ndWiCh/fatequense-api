import { getPageHtml } from "~/test/utils/get-page-html.utils";
import { extractGXStateOfHTML } from "../utils/gxstate.utils";
import { getPartialAbsences } from "./partialAbsences.scrapper";

describe('Partial Absences scrapper function', () => {
	it('should be able to get student partial absences from HTML', () => {
		const partialAbsencesHtmlContent = getPageHtml('partialAbsences');

		const partialAbsences = getPartialAbsences(extractGXStateOfHTML(partialAbsencesHtmlContent));

		expect(partialAbsences.length).toBeGreaterThanOrEqual(1);
		expect(partialAbsences).toContainEqual(
			expect.objectContaining({
				cod: expect.any(String),
			})
		)
	});
});