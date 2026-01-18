import { test, expect } from '@playwright/test';

test('vendors listing renders', async ({ page }) => {
  await page.goto('/vendors');
  await expect(page.getByRole('heading', { name: /discover vendors/i })).toBeVisible();
});

