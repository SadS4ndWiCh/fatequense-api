import * as cheerio from 'cheerio';

export function parseToJSON(gxstate: string) {
	return JSON.parse(gxstate.replace(/\\>/g, '&gt;'));
}

export function getPrefixFromGXState(gxstate: string) {
	const matchResult = gxstate.match(/MPW\d{4}/);

	return matchResult !== null ? matchResult[0] : null;
}

export function extractGXStateOfHTML(html: string) {
	const $ = cheerio.load(html);

	const gxstate = $('[name="GXState"]').val() as string;
	const gxstateParsed = parseToJSON(gxstate);
	const gxstatePrefix = getPrefixFromGXState(gxstate);

	return {
		$,

		default: gxstate,
		parsed: gxstateParsed,
		prefix: gxstatePrefix,

		get(key: string, withPrefix = false) {
			const _key = withPrefix ? gxstatePrefix + key : key;
			return gxstateParsed[_key];
		}
	}
}

export type ExtractedGXState = ReturnType<typeof extractGXStateOfHTML>;