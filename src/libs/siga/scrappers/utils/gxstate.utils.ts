import * as cheerio from 'cheerio';

export function parseToJSON(gxstate: string) {
	return JSON.parse(gxstate.replace(/\\>/g, '&gt;')) as GXState;
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

		get<GKey extends keyof GXState>(key: GKey, withPrefix = false): GXState[GKey] {
			if (withPrefix && gxstatePrefix) {
				const prefixedKey = `${gxstatePrefix}${key}` as GKey;
				return gxstateParsed[prefixedKey];
			}

			return gxstateParsed[key];
		}
	}
}

export type ExtractedGXState = ReturnType<typeof extractGXStateOfHTML>;