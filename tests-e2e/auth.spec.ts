// tests-e2e/auth.spec.ts
import { test, expect } from '@playwright/test'

test('guest can sign in and reach dashboard', async ({ page }) => {
  // Visit root page
  await page.goto('/')

  // rediect to login page
  await expect(page.getByTestId('signin-page')).toBeVisible()
  await expect(page.getByText('Welcome to Zama API Console')).toBeVisible()

  // Click on login button
  await page.getByTestId('guest-signin').click()

  await expect(page).toHaveURL('/')
  await expect(page.getByText('Welcome, Guest User')).toBeVisible()

  // Verify login success
  await expect(page.getByText('Welcome to your API Console')).toBeVisible()
})

test('guest can logout and return to login page', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByTestId('signin-page')).toBeVisible()
  await page.getByTestId('guest-signin').click()

  // Verify login success
  await expect(page).toHaveURL('/')
  await expect(page.getByText('Welcome, Guest User')).toBeVisible()

  // Click logout button
  await page.getByRole('button', { name: 'Logout' }).click()

  // Should redirect back to login page
  await expect(page).toHaveURL('/login')
  await expect(page.getByTestId('signin-page')).toBeVisible()
})

test('protected routes redirect to login when not authenticated', async ({
  page,
}) => {
  const protectedRoutes = ['/', '/api-keys', '/usage', '/docs']

  for (const route of protectedRoutes) {
    await page.goto(route)
    await expect(page).toHaveURL('/login')
    await expect(page.getByTestId('signin-page')).toBeVisible()
  }
})

test('authenticated user can access protected routes', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByTestId('signin-page')).toBeVisible()
  await page.getByTestId('guest-signin').click()

  // Verify login success
  await expect(page).toHaveURL('/')
  await expect(page.getByText('Welcome, Guest User')).toBeVisible()

  // Access protected routes
  const protectedRoutes = ['/', '/api-keys', '/usage', '/docs']

  for (const route of protectedRoutes) {
    await page.goto(route)
    await expect(page).toHaveURL(route)
    await expect(page.getByText('Welcome, Guest User')).toBeVisible()
  }
})
