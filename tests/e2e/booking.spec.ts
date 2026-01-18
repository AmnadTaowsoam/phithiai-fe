import { test, expect } from '@playwright/test';

test('booking wizard renders', async ({ page }) => {
  await page.goto('/booking');
  await expect(page.getByRole('heading', { name: /booking/i })).toBeVisible();
});

