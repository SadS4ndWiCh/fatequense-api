import * as cheerio from 'cheerio';

export function parseToJSON(gxstate: string) {
	return JSON.parse(gxstate.replace(/\\>/g, '&gt;')) as Record<string, any>;
}

export function getPrefixFromGXState(gxstate: string) {
	const matchResult = gxstate.match(/MPW\d{4}/);
	if (matchResult === null) return null;

	return matchResult[0];
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

		get(key: keyof GXState, withPrefix = false) {
			if (withPrefix && gxstatePrefix === null) return null;
			else if (withPrefix && gxstatePrefix)
				return gxstateParsed[gxstatePrefix+key];

			return gxstateParsed[key];
		}
	}
}

export type ExtractedGXState = ReturnType<typeof extractGXStateOfHTML>;