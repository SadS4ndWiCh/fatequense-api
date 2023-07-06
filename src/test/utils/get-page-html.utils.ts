import fs from 'fs';
import path from 'path';

const PAGES_PATH = path.join(__dirname, '..', 'sources', 'pages');

const HTML_PAGES_PATH = {
  home: path.join(PAGES_PATH, 'home.html'),
  partialGrade: path.join(PAGES_PATH, 'partialGrade.html'),
  partialAbsences: path.join(PAGES_PATH, 'partialAbsences.html'),
  schedule: path.join(PAGES_PATH, 'schedule.html'),
  history: path.join(PAGES_PATH, 'history.html'),
  historyGrade: path.join(PAGES_PATH, 'historyGrade.html'),
  discipline: path.join(PAGES_PATH, 'discipline.html'),
};

export function getPageHtml(page: keyof typeof HTML_PAGES_PATH) {
  return fs.readFileSync(HTML_PAGES_PATH[page], { encoding: 'utf-8' });
}
