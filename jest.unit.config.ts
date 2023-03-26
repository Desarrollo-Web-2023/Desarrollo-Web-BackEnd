import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  testRegex: '.unit.ts$',
  detectOpenHandles: true,
  forceExit: true
};

export default config;
