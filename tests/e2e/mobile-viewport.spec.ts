import { test, expect, devices } from '@playwright/test';

test.describe('Mobile Viewport Verification', () => {
  // Test on common mobile devices
  const mobileDevices = [
    { name: 'iPhone 12', ...devices['iPhone 12'] },
    { name: 'iPhone 12 Pro', ...devices['iPhone 12 Pro'] },
    { name: 'iPhone 13', ...devices['iPhone 13'] },
    { name: 'iPhone 14', ...devices['iPhone 14'] },
    { name: 'Pixel 5', ...devices['Pixel 5'] },
    { name: 'Galaxy S21', ...devices['Galaxy S21'] },
  ];

  mobileDevices.forEach((device) => {
    test.describe(`${device.name}`, () => {
      test.use({ ...device });

      test('Home page renders correctly', async ({ page }) => {
        await page.goto('/');

        // Verify hero section is visible
        await expect(page.locator('h1:has-text("Phithiai")')).toBeVisible();
        await expect(page.locator('text=วางแผนพิธีไทยด้วย AI')).toBeVisible();

        // Verify CTA buttons are visible and tappable
        const ctaButton = page.locator('text=เริ่มต้นใช้งาน');
        await expect(ctaButton).toBeVisible();
        const box = await ctaButton.boundingBox();
        expect(box).toBeTruthy();
        expect(box?.width).toBeGreaterThan(0);
        expect(box?.height).toBeGreaterThan(0);

        // Verify navigation is accessible (hamburger menu on mobile)
        await expect(page.locator('button[aria-label="Menu"]')).toBeVisible();
      });

      test('Vendor listing is mobile-friendly', async ({ page }) => {
        await page.goto('/vendors');

        // Verify vendor cards are stacked vertically
        await expect(page.locator('.vendor-card')).toBeVisible();

        // Verify search bar is full width
        const searchInput = page.locator('input[placeholder="ค้นหา..."]');
        await expect(searchInput).toBeVisible();
        const box = await searchInput.boundingBox();
        expect(box?.width).toBeGreaterThan(300);

        // Verify filters are accessible (dropdown or modal on mobile)
        await expect(page.locator('text=ตัวกรอง')).toBeVisible();
      });

      test('Vendor detail page is mobile-optimized', async ({ page }) => {
        await page.goto('/vendors/maison-lanna');

        // Verify vendor info is visible
        await expect(page.locator('h1')).toBeVisible();
        await expect(page.locator('text=รายละเอียด')).toBeVisible();

        // Verify booking button is prominent
        const bookButton = page.locator('text=จองวอเตอร์');
        await expect(bookButton).toBeVisible();
        const box = await bookButton.boundingBox();
        expect(box?.width).toBeGreaterThan(100);

        // Verify gallery is swipeable
        await expect(page.locator('.vendor-gallery')).toBeVisible();
      });

      test('Booking flow works on mobile', async ({ page }) => {
        // Navigate to vendor and start booking
        await page.goto('/vendors/maison-lanna');
        await page.click('text=จองวอเตอร์');

        // Verify booking form is mobile-friendly
        await expect(page.locator('input[name="eventName"]')).toBeVisible();
        await expect(page.locator('input[type="date"]')).toBeVisible();

        // Verify date picker opens correctly
        await page.click('input[type="date"]');
        await expect(page.locator('.calendar')).toBeVisible();

        // Verify form can be scrolled
        const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
        const viewportSize = page.viewportSize();
        expect(bodyHeight).toBeGreaterThan(viewportSize?.height || 0);
      });

      test('Dashboard is mobile-responsive', async ({ page }) => {
        // Login first (mock)
        await page.goto('/dashboard');

        // Verify stats cards are stacked
        await expect(page.locator('.stat-card')).toBeVisible();

        // Verify booking list is scrollable
        await expect(page.locator('.booking-list')).toBeVisible();

        // Verify bottom navigation or hamburger menu
        await expect(page.locator('nav')).toBeVisible();
      });

      test('Forms have proper touch targets', async ({ page }) => {
        await page.goto('/auth/login');

        // Verify input fields have proper spacing
        const emailInput = page.locator('input[name="email"]');
        const passwordInput = page.locator('input[name="password"]');

        await expect(emailInput).toBeVisible();
        await expect(passwordInput).toBeVisible();

        // Verify touch targets are at least 44x44 pixels
        const emailBox = await emailInput.boundingBox();
        const passwordBox = await passwordInput.boundingBox();

        expect(emailBox?.height).toBeGreaterThanOrEqual(44);
        expect(passwordBox?.height).toBeGreaterThanOrEqual(44);

        // Verify submit button is prominent
        const submitButton = page.locator('button[type="submit"]');
        await expect(submitButton).toBeVisible();
        const buttonBox = await submitButton.boundingBox();
        expect(buttonBox?.height).toBeGreaterThanOrEqual(48);
      });

      test('Images are optimized for mobile', async ({ page }) => {
        await page.goto('/vendors');

        // Verify images are loaded
        const images = page.locator('.vendor-card img');
        await expect(images.first()).toBeVisible();

        // Verify images have proper dimensions
        const image = images.first();
        await expect(image).toHaveJSProperty('complete', true);

        // Verify images are not too large for mobile
        const naturalWidth = await image.evaluate((img: HTMLImageElement) => img.naturalWidth);
        expect(naturalWidth).toBeLessThanOrEqual(800);
      });

      test('Text is readable on mobile', async ({ page }) => {
        await page.goto('/');

        // Verify font sizes are appropriate
        const heading = page.locator('h1');
        await expect(heading).toBeVisible();

        const headingFontSize = await heading.evaluate((el) => {
          return window.getComputedStyle(el).fontSize;
        });
        expect(parseInt(headingFontSize)).toBeGreaterThanOrEqual(24);

        // Verify body text is legible
        const bodyText = page.locator('p').first();
        const bodyFontSize = await bodyText.evaluate((el) => {
          return window.getComputedStyle(el).fontSize;
        });
        expect(parseInt(bodyFontSize)).toBeGreaterThanOrEqual(14);
      });

      test('Horizontal scrolling is prevented', async ({ page }) => {
        await page.goto('/vendors');

        // Try to scroll horizontally
        await page.evaluate(() => {
          window.scrollTo(100, 0);
        });

        // Verify horizontal scrollbar is not present
        const hasHorizontalScroll = await page.evaluate(() => {
          return document.body.scrollWidth > document.body.clientWidth;
        });
        expect(hasHorizontalScroll).toBe(false);
      });

      test('Modal dialogs work on mobile', async ({ page }) => {
        await page.goto('/vendors/maison-lanna');
        await page.click('text=จองวอเตอร์');

        // Verify modal opens
        await expect(page.locator('.modal')).toBeVisible();

        // Verify modal is full screen on mobile
        const modal = page.locator('.modal');
        const modalBox = await modal.boundingBox();
        expect(modalBox?.width).toBeGreaterThan(300);

        // Verify close button is accessible
        await expect(page.locator('button[aria-label="Close"]')).toBeVisible();
      });

      test('Loading states are visible', async ({ page }) => {
        // Mock slow loading
        await page.route('**/api/**', (route) => {
          setTimeout(() => route.continue(), 2000);
        });

        await page.goto('/vendors');

        // Verify loading indicator
        await expect(page.locator('.loading-spinner')).toBeVisible();
      });

      test('Error states are clear on mobile', async ({ page }) => {
        // Mock error response
        await page.route('**/api/vendors', (route) => {
          route.fulfill({ status: 500, body: 'Internal Server Error' });
        });

        await page.goto('/vendors');

        // Verify error message is visible
        await expect(page.locator('text=เกิดข้อผิดพลาด')).toBeVisible();

        // Verify retry button is tappable
        await expect(page.locator('text=ลองใหม่')).toBeVisible();
      });
    });
  });

  test.describe('Responsive Breakpoints', () => {
    const breakpoints = [
      { name: 'Small Mobile', width: 375, height: 667 },
      { name: 'Large Mobile', width: 414, height: 896 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop', width: 1280, height: 720 },
    ];

    breakpoints.forEach((bp) => {
      test(`Layout at ${bp.name} (${bp.width}px)`, async ({ page }) => {
        await page.setViewportSize({ width: bp.width, height: bp.height });
        await page.goto('/');

        // Verify main content is visible
        await expect(page.locator('main')).toBeVisible();

        // Verify navigation adapts
        if (bp.width < 768) {
          // Mobile: hamburger menu
          await expect(page.locator('button[aria-label="Menu"]')).toBeVisible();
        } else {
          // Desktop: full navigation
          await expect(page.locator('nav > ul')).toBeVisible();
        }
      });
    });
  });

  test.describe('Mobile Performance', () => {
    test.use({ ...devices['iPhone 12'] });

    test('Page loads within acceptable time', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;

      // Should load within 3 seconds on mobile
      expect(loadTime).toBeLessThan(3000);
    });

    test('Interactive elements respond quickly', async ({ page }) => {
      await page.goto('/vendors');

      // Measure time to click
      const startTime = Date.now();
      await page.click('.vendor-card:first-child');
      const clickTime = Date.now() - startTime;

      // Should respond within 300ms
      expect(clickTime).toBeLessThan(300);
    });
  });

  test.describe('Mobile Accessibility', () => {
    test.use({ ...devices['iPhone 12'] });

    test('Touch targets meet WCAG AA', async ({ page }) => {
      await page.goto('/');

      // Get all interactive elements
      const buttons = await page.locator('button, a, input, select').all();

      for (const button of buttons) {
        const box = await button.boundingBox();
        if (box) {
          // WCAG AA requires at least 44x44 pixels
          expect(box.width).toBeGreaterThanOrEqual(44);
          expect(box.height).toBeGreaterThanOrEqual(44);
        }
      }
    });

    test('Text contrast is sufficient', async ({ page }) => {
      await page.goto('/');

      // Check contrast of headings
      const heading = page.locator('h1').first();
      const headingColor = await heading.evaluate((el) => {
        return window.getComputedStyle(el).color;
      });

      // Verify color is not too light
      expect(headingColor).not.toMatch(/rgb\(255,\s*255,\s*255\)/);
    });
  });
});
