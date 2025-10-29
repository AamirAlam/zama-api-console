// tests-e2e/feature-toggle.spec.ts
import { test, expect, type Page } from '@playwright/test'

// Helper function to login as guest
async function loginAsGuest(page: Page) {
  await page.goto('/')
  await expect(page.getByTestId('signin-page')).toBeVisible()
  await page.getByTestId('guest-signin').click()
  await expect(page).toHaveURL('/')
  await expect(page.getByText('Welcome, Guest User')).toBeVisible()
}

test.describe('Feature Toggle System', () => {
  test.beforeEach(async ({ page }) => {
    // Login as guest
    await loginAsGuest(page)

    // Navigate to Usage page where the feature toggles are visible
    await page.getByRole('link', { name: 'Usage' }).click()
    await expect(page).toHaveURL('/usage')

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle')
  })

  test('should display DevPanel toggle button in development mode', async ({
    page,
  }) => {
    // Check DevPanel toggle button is visible
    await page.waitForSelector('[data-testid="dev-panel-toggle"]', {
      timeout: 10000,
    })
    await expect(page.getByTestId('dev-panel-toggle')).toBeVisible()

    // Check Usage page elements
    await expect(page.getByText('API Requests Over Time')).toBeVisible()
    await expect(page.getByText('Total Requests')).toBeVisible()
  })

  test('should open and close DevPanel', async ({ page }) => {
    // Click DevPanel toggle button
    await page.getByTestId('dev-panel-toggle').click()

    // Check DevPanel elements are visible
    await expect(page.getByTestId('dev-panel')).toBeVisible()
    await expect(page.getByText('Feature Flags')).toBeVisible()
    await expect(page.getByText('DEV')).toBeVisible()
    await expect(page.getByText('Chart v2')).toBeVisible()
    await expect(page.getByText('Modern Color Scheme')).toBeVisible()

    // Close the panel
    await page.getByTestId('close-panel-button').click()

    // Check DevPanel is hidden
    await expect(page.getByTestId('dev-panel')).not.toBeVisible()
  })

  test('should toggle Chart v2 feature flag', async ({ page }) => {
    // Open DevPanel
    await page.getByTestId('dev-panel-toggle').click()

    // Check initial state shows bar chart
    await expect(page.getByText('API Requests Over Time')).toBeVisible()

    // Toggle Chart v2 feature flag
    await page.getByTestId('feature-toggle-chartV2').click()

    // Close DevPanel to see the change
    await page.getByTestId('close-panel-button').click()

    // Check Chart v2 elements are visible
    await expect(page.getByText('Status Codes Over Time')).toBeVisible()
    await expect(page.getByText('Chart v2 Active')).toBeVisible()

    // Check line chart legend elements
    await expect(page.locator('text=Success (200)')).toBeVisible()
    await expect(page.locator('text=Bad Request (400)')).toBeVisible()
    await expect(page.locator('text=Unauthorized (401)')).toBeVisible()
    await expect(page.locator('text=Server Error (500)')).toBeVisible()
  })

  test('should toggle Modern Colors feature flag', async ({ page }) => {
    // Open DevPanel
    await page.getByTestId('dev-panel-toggle').click()

    // Enable Chart v2 first to see the colors
    await page.getByTestId('feature-toggle-chartV2').click()

    // Toggle Modern Colors feature flag
    await page.getByTestId('feature-toggle-modernColors').click()

    // Close DevPanel
    await page.getByTestId('close-panel-button').click()

    // Check chart container is visible with modern colors applied
    await expect(page.locator('.recharts-wrapper')).toBeVisible()
    await expect(page.getByText('Status Codes Over Time')).toBeVisible()
  })

  test('should show active flag counter', async ({ page }) => {
    // Open DevPanel and toggle Chart v2
    await page.getByTestId('dev-panel-toggle').click()
    await page.getByTestId('feature-toggle-chartV2').click()

    // Close DevPanel and check counter shows "1"
    await page.getByTestId('close-panel-button').click()
    await expect(page.getByTestId('active-flags-counter')).toHaveText('1')

    // Open DevPanel again and toggle Modern Colors
    await page.getByTestId('dev-panel-toggle').click()
    await page.getByTestId('feature-toggle-modernColors').click()

    // Close DevPanel and check counter shows "2"
    await page.getByTestId('close-panel-button').click()
    await expect(page.getByTestId('active-flags-counter')).toHaveText('2')
  })

  test('should reset all flags', async ({ page }) => {
    // Open DevPanel and enable both flags
    await page.getByTestId('dev-panel-toggle').click()
    await page.getByTestId('feature-toggle-chartV2').click()
    await page.getByTestId('feature-toggle-modernColors').click()

    // Click reset button
    await page.getByTestId('reset-flags-button').click()

    // Close DevPanel
    await page.getByTestId('close-panel-button').click()

    // Check we're back to default bar chart
    await expect(page.getByText('API Requests Over Time')).toBeVisible()
    await expect(page.getByText('Chart v2 Active')).not.toBeVisible()

    // Check no counter badge is visible
    await expect(page.getByTestId('active-flags-counter')).not.toBeVisible()
  })

  test('should show feature descriptions and categories', async ({ page }) => {
    // Open DevPanel
    await page.getByTestId('dev-panel-toggle').click()

    // Check feature descriptions are visible
    await expect(
      page.getByText('New line chart showing status codes over time')
    ).toBeVisible()
    await expect(
      page.getByText('Updated color palette for better accessibility')
    ).toBeVisible()

    // Check feature categories are visible
    await expect(page.getByText('Charts')).toBeVisible()
    await expect(page.getByText('Design')).toBeVisible()

    // Check feature count is displayed
    await expect(page.getByText(/\d+ of \d+ features enabled/)).toBeVisible()
  })

  test('should persist feature flags during navigation', async ({ page }) => {
    // Enable Chart v2 feature flag
    await page.getByTestId('dev-panel-toggle').click()
    await page.getByTestId('feature-toggle-chartV2').click()
    await page.getByTestId('close-panel-button').click()

    // Navigate to Dashboard
    await page.getByRole('link', { name: 'Dashboard' }).click()
    await expect(page).toHaveURL('/')

    // Navigate back to Usage page
    await page.getByRole('link', { name: 'Usage' }).click()
    await expect(page).toHaveURL('/usage')

    // Check Chart v2 is still active after navigation
    await expect(page.getByText('Status Codes Over Time')).toBeVisible()
    await expect(page.getByText('Chart v2 Active')).toBeVisible()
  })
})
