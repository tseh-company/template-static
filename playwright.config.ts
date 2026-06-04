import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;
const baseURL = process.env.SMOKE_URL || 'http://localhost:8000';

export default defineConfig({
  testDir: './tests/smoke',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: isCI ? 2 : undefined,
  reporter: isCI ? [['github'], ['line']] : 'list',
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    {
      name: 'tablet',
      use: { ...devices['iPad Pro'], browserName: 'chromium' },
    },
    {
      name: 'mobile',
      use: { ...devices['iPhone 14'], browserName: 'chromium' },
    },
  ],
  webServer: !isCI
    ? {
        command: 'npx http-server -p 8000 -s .',
        port: 8000,
        reuseExistingServer: true,
      }
    : undefined,
});
