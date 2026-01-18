import { test, expect } from '@playwright/test';

test('auth pages render', async ({ page }) => {
  await page.goto('/auth/login');
  await expect(page.getByRole('heading', { name: /welcome back/i })).toBeVisible();

  await page.goto('/auth/register');
  await expect(page.getByRole('heading', { name: /create your account/i })).toBeVisible();

  await page.goto('/auth/reset-password');
  await expect(page.getByRole('heading', { name: /reset your password/i })).toBeVisible();
});

