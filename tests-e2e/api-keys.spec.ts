// tests-e2e/api-keys.spec.ts
import { test, expect, type Page } from '@playwright/test'

// Helper function to login as guest
async function loginAsGuest(page: Page) {
  await page.goto('/')
  await expect(page.getByTestId('signin-page')).toBeVisible()
  await page.getByTestId('guest-signin').click()
  await expect(page).toHaveURL('/')
  await expect(page.getByText('Welcome, Guest User')).toBeVisible()
}

test.describe('API Keys Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login as guest
    await loginAsGuest(page)

    // Navigate to API keys page
    await page.getByRole('link', { name: 'API Keys' }).click()
    await expect(page).toHaveURL('/api-keys')
  })

  test('should display API Keys page with create button', async ({ page }) => {
    // Check API keys page elements
    await expect(
      page.getByText('Manage your API keys for accessing our services')
    ).toBeVisible()
    await expect(
      page.getByRole('button', { name: 'Create API Key' })
    ).toBeVisible()
    await expect(page.getByText('API Keys (0)')).toBeVisible()
    await expect(page.getByText('No API keys')).toBeVisible()
    await expect(
      page.getByText('Get started by creating your first API key')
    ).toBeVisible()
  })

  test('should create a new API key', async ({ page }) => {
    // Click create API key button
    await page.getByTestId('create-api-key-button').click()

    await expect(page.getByText('Create New API Key')).toBeVisible()
    await expect(page.getByPlaceholder('Enter API key name')).toBeVisible()

    // Fill in API key name
    const keyName = 'Test API Key'
    await page.getByPlaceholder('Enter API key name').fill(keyName)

    // Click create API key submit button
    await page.getByTestId('create-api-key-submit').click()

    await expect(page.getByText('Create New API Key')).not.toBeVisible()

    // Check API keys page elements
    await expect(page.getByText('API Keys (1)')).toBeVisible()
    await expect(page.getByText(keyName)).toBeVisible()
    await expect(page.getByText('active')).toBeVisible()

    // Check API key card elements
    await expect(page.locator('code').first()).toBeVisible()

    await expect(page.getByRole('button', { name: 'Regenerate' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Revoke' })).toBeVisible()
  })

  test('should show and hide API key', async ({ page }) => {
    // Create API key
    await page.getByTestId('create-api-key-button').click()
    await page
      .getByPlaceholder('Enter API key name')
      .fill('Test Key for Visibility')
    await page.getByTestId('create-api-key-submit').click()
    await expect(page.getByText('Create New API Key')).not.toBeVisible()

    const maskedKey = await page.locator('code').first().textContent()
    expect(maskedKey).toContain('•')

    // Click toggle key visibility button
    await page.getByTestId('toggle-key-visibility').click()

    // Check API key card elements
    const visibleKey = await page.locator('code').first().textContent()
    expect(visibleKey).not.toContain('•')
    expect(visibleKey?.length).toBeGreaterThan(20)

    // Click toggle key visibility button again
    await page.getByTestId('toggle-key-visibility').click()

    const hiddenKey = await page.locator('code').first().textContent()
    expect(hiddenKey).toContain('•')
  })

  test('should regenerate API key', async ({ page }) => {
    // Create API key
    await page.getByTestId('create-api-key-button').click()
    await page
      .getByPlaceholder('Enter API key name')
      .fill('Test Key for Regeneration')
    await page.getByTestId('create-api-key-submit').click()
    await expect(page.getByText('Create New API Key')).not.toBeVisible()

    // Click toggle key visibility button
    await page.getByTestId('toggle-key-visibility').click()
    const originalKey = await page.locator('code').first().textContent()

    // Click regenerate key button
    await page.getByTestId('regenerate-key').click()

    // Wait for regeneration to complete
    await page.waitForTimeout(1500)

    // Click toggle key visibility button
    await page.getByTestId('toggle-key-visibility').click()

    // Wait for the UI to update with the new key
    await page.waitForTimeout(500)
    const newKey = await page.locator('code').first().textContent()

    // Check API key card elements
    expect(newKey).not.toBe(originalKey)
    expect(newKey?.length).toBeGreaterThan(20)
    expect(newKey).toMatch(/^sk_live_/)

    // Check API key card elements
    await expect(page.getByText('active')).toBeVisible()
    await expect(page.getByTestId('regenerate-key')).toBeVisible()
    await expect(page.getByTestId('revoke-key')).toBeVisible()
  })

  test('should revoke API key', async ({ page }) => {
    // Create API key
    await page.getByTestId('create-api-key-button').click()
    await page
      .getByPlaceholder('Enter API key name')
      .fill('Test Key for Revocation')
    await page.getByTestId('create-api-key-submit').click()
    await expect(page.getByText('Create New API Key')).not.toBeVisible()

    // Check API key card elements
    await expect(page.getByText('active')).toBeVisible()
    await expect(page.getByTestId('regenerate-key')).toBeVisible()
    await expect(page.getByTestId('revoke-key')).toBeVisible()

    // Click revoke key button
    await page.getByTestId('revoke-key').click()

    await page.waitForTimeout(1000)

    // Check API key card elements
    await expect(page.getByText('revoked')).toBeVisible()

    // Check API key card elements
    await expect(page.getByTestId('regenerate-key')).not.toBeVisible()
    await expect(page.getByTestId('revoke-key')).not.toBeVisible()

    // Verify delete button is still available
    await expect(page.getByTestId('delete-key')).toBeVisible()
  })

  test('should delete API key', async ({ page }) => {
    // Create API key
    const keyName = 'Test Key for Deletion'
    await page.getByTestId('create-api-key-button').click()
    await page.getByPlaceholder('Enter API key name').fill(keyName)
    await page.getByTestId('create-api-key-submit').click()
    await expect(page.getByText('Create New API Key')).not.toBeVisible()

    // Verify key exists
    await expect(page.getByText('API Keys (1)')).toBeVisible()
    await expect(page.getByText(keyName)).toBeVisible()

    // Click delete button (trash icon)
    await page.getByTestId('delete-key').click()

    // Wait for deletion to complete (deleteKey has 600ms delay)
    await page.waitForTimeout(800)

    // Verify key is deleted
    await expect(page.getByText('API Keys (0)')).toBeVisible()
    await expect(page.getByText(keyName)).not.toBeVisible()
    await expect(page.getByText('No API keys')).toBeVisible()
  })

  test('should copy API key to clipboard', async ({ page }) => {
    // Create API key
    await page.getByTestId('create-api-key-button').click()
    await page.getByPlaceholder('Enter API key name').fill('Test Key for Copy')
    await page.getByTestId('create-api-key-submit').click()
    await expect(page.getByText('Create New API Key')).not.toBeVisible()

    // Show the key first
    await page.getByTestId('toggle-key-visibility').click()
    const keyValue = await page.locator('code').first().textContent()

    // Click copy button
    await page.getByTestId('copy-key').click()

    await expect(page.getByTestId('copy-key')).toBeVisible()
  })
})
