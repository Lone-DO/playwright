import { defineConfig, type PlaywrightTestConfig } from '@playwright/test';

import { environment } from './src/lib/constants';
import { macConfig, baseConfig } from './src/tests'

/** See https://playwright.dev/docs/test-configuration. */
const config: PlaywrightTestConfig = defineConfig({
  name: 'Playwright Tests',
  testDir: 'src/tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },
  projects: [], 
});

if (macConfig.isTargetedModule) {
  config.testDir = `./tests/${environment.split('-')[1]}`;
  config.projects?.push(...macConfig.projects);
  if (environment === 'macos-dev') { 
    config.webServer = {
      command: 'cd app && npm run dev -- --port 3000',
      url: 'http://localhost:3000',
      stdout: 'ignore',
      stderr: 'ignore',
    };
  }
} else {
  config.projects = [
    ...baseConfig.projects,
    ...macConfig.projects,
  ]
}

export default config;