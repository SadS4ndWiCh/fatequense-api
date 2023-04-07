import fs from "fs";
import path from "path";

const HTML_PAGES_PATH = {
	home: path.join(__dirname, '..', 'sources', 'pages', 'home.html'),
	partialGrade: path.join(__dirname, '..', 'sources', 'pages', 'partialGrade.html'),
	partialAbsences: path.join(__dirname, '..', 'sources', 'pages', 'partialAbsences.html'),
	schedule: path.join(__dirname, '..', 'sources', 'pages', 'schedule.html'),
	history: path.join(__dirname, '..', 'sources', 'pages', 'history.html'),
	discipline: path.join(__dirname, '..', 'sources', 'pages', 'discipline.html'),
};

export function getPageHtml(page: keyof typeof HTML_PAGES_PATH) {
	return fs.readFileSync(
		HTML_PAGES_PATH[page], { encoding: 'utf-8' }
	);
}