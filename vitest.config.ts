import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    alias: {
      '~': new URL(`file://${__dirname}/src`).pathname,
    },
  },
});
