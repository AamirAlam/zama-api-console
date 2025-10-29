import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests-e2e',
  timeout: 60 * 1000,
  fullyParallel: true,
  retries: 1,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
  use: {
    baseURL: 'http://localhost:5173', // assuming Vite dev server
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Set environment variables for tests
        launchOptions: {
          env: {
            ...process.env,
            VITE_NODE_ENV: 'development',
          },
        },
      },
    },
  ],
  // Start dev server before tests
  webServer: {
    command: 'npm run dev',
    port: 5173,
    reuseExistingServer: !process.env.CI,
    env: {
      VITE_NODE_ENV: 'development',
    },
  },
})
