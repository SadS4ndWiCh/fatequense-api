import fs from "fs";
import path from "path";

const HTML_PAGES_PATH = {
	home: path.join(__dirname, '..', 'sources', 'pages', 'home.html')
};

export function getPageHtml(page: keyof typeof HTML_PAGES_PATH) {
	return fs.readFileSync(
		HTML_PAGES_PATH[page], { encoding: 'utf-8' }
	);
}