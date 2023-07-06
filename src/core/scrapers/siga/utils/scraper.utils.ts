import * as cheerio from 'cheerio';
import { CheerioAPI } from 'cheerio';

export function withScraper<T>(func: ($: CheerioAPI) => T) {
  return (html: string) => {
    return func(cheerio.load(html));
  };
}
