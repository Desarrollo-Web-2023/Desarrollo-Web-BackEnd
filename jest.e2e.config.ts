import type { Config } from 'jest';

const config: Config = {
  verbose: false,
  testRegex: '.e2e.ts$',
  detectOpenHandles: true,
  forceExit: true
};

export default config;
