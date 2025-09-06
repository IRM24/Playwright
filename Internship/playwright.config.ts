import { PlaywrightTestConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

// Cargar variables de entorno ANTES de cualquier otra cosa
dotenv.config();

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 60000,
  retries: 2,
  globalSetup: require.resolve('./ai-healing/globalSetup.ts'),
  use: {
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    launchOptions: {
      slowMo: 500,
    },
  },
  reporter: [
    ['dot'],
    ['json', { outputFile: 'jsonTests/test-results.json' }],
    ['html', { outputFile: 'playwright-report/test-results.html' }]
  ],
  projects: [
    {
      name: 'chromium',
      use: { 
        ...require('@playwright/test').devices['Desktop Chrome'],
        headless: false,
      },
    },
  ],
};

export default config;