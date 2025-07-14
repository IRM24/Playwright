import { PlaywrightTestConfig } from '@playwright/test';
const config: PlaywrightTestConfig = {
  //testMatch: ['interactions.test.ts'],
  use: {headless: false,
    screenshot: 'only-on-failure', // Take screenshots only on test failure
    video: "on", // Record videos only on test failure
    launchOptions: {
      slowMo: 1000, // Slow down operations by 1000ms for better visibility
    }
  },
  reporter: [['json', {
    outputFile: 'jsonTests/test-results.json', // Output file for JSON reporter
  }],['dot'], ['html', {
    outputFile: 'playwright-report/test-results.html', // Output file for HTML reporter
  }]], // Use HTML reporter for better visibility
}
export default config;
