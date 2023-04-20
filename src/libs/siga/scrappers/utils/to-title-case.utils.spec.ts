import { toTitleCase } from './to-title-case.utils';

describe('toTitleCase util function', () => {
  it('should be able to title case a text', () => {
    expect(toTitleCase('hello world')).toBe('Hello World');
    expect(toTitleCase('HELLO WORLD')).toBe('Hello World');
    expect(toTitleCase('Hello World')).toBe('Hello World');
  });
});
