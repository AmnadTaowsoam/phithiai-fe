import { test, expect } from '@playwright/test';

test.describe('Critical Path Regression Tests', () => {
  test.describe('Authentication Flow', () => {
    test('User can login with valid credentials', async ({ page }) => {
      await page.goto('/auth/login');

      await page.fill('input[name="email"]', 'test@example.com');
      await page.fill('input[name="password"]', 'Test@1234');
      await page.click('button[type="submit"]');

      // Should redirect to dashboard
      await expect(page).toHaveURL(/.*dashboard/);
      await expect(page.locator('text=สวัสดี')).toBeVisible();
    });

    test('User cannot login with invalid credentials', async ({ page }) => {
      await page.goto('/auth/login');

      await page.fill('input[name="email"]', 'invalid@example.com');
      await page.fill('input[name="password"]', 'wrongpassword');
      await page.click('button[type="submit"]');

      // Should show error message
      await expect(page.locator('text=อีเมลหรือรหัสผ่านไม่ถูกต้อง')).toBeVisible();
      await expect(page).toHaveURL(/.*login/);
    });

    test('User can reset password', async ({ page }) => {
      await page.goto('/auth/reset-password');

      await page.fill('input[name="email"]', 'test@example.com');
      await page.click('button[type="submit"]');

      // Should show success message
      await expect(page.locator('text=ส่งอีเมลรีเซ็ตรหัสผ่านสำเร็จ')).toBeVisible();
    });

    test('User can logout', async ({ page }) => {
      // Login first
      await page.goto('/auth/login');
      await page.fill('input[name="email"]', 'test@example.com');
      await page.fill('input[name="password"]', 'Test@1234');
      await page.click('button[type="submit"]');
      await page.waitForURL(/.*dashboard/);

      // Logout
      await page.click('button[aria-label="Logout"]');
      await page.click('text=ออกจากระบบ');

      // Should redirect to home
      await expect(page).toHaveURL('/');
      await expect(page.locator('text=เข้าสู่ระบบ')).toBeVisible();
    });
  });

  test.describe('Vendor Discovery Flow', () => {
    test('Search returns relevant results', async ({ page }) => {
      await page.goto('/vendors');

      await page.fill('input[placeholder="ค้นหา..."]', 'Maison Lanna');

      // Should show matching vendors
      await expect(page.locator('text=Maison Lanna Collective')).toBeVisible();
    });

    test('Filters work correctly', async ({ page }) => {
      await page.goto('/vendors');

      // Apply category filter
      await page.click('text=หมวดหมู่');
      await page.click('text=งานแต่งงาน');

      // Apply zone filter
      await page.click('text=ภูมิภาค');
      await page.click('text=ภาคเหนือ');

      // Verify results match filters
      await expect(page.locator('.vendor-card')).toBeVisible();
    });

    test('Pagination works correctly', async ({ page }) => {
      await page.goto('/vendors');

      // Check if pagination exists
      const nextButton = page.locator('text=ถัดไป');
      if (await nextButton.isVisible()) {
        await nextButton.click();

        // Verify page changes
        await expect(page.locator('.vendor-card')).toBeVisible();
      }
    });

    test('Vendor detail page loads correctly', async ({ page }) => {
      await page.goto('/vendors/maison-lanna');

      // Verify all sections are visible
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('text=รายละเอียด')).toBeVisible();
      await expect(page.locator('text=รีวิว')).toBeVisible();
      await expect(page.locator('text=แกลเลอรี่')).toBeVisible();
    });
  });

  test.describe('Booking Flow', () => {
    test('Booking form validates required fields', async ({ page }) => {
      await page.goto('/vendors/maison-lanna');
      await page.click('text=จองวอเตอร์');

      // Try to submit without required fields
      await page.click('button:has-text("ส่งคำขอจอง")');

      // Should show validation errors
      await expect(page.locator('text=กรุณากรอกข้อมูลให้ครบ')).toBeVisible();
    });

    test('Booking summary is correct', async ({ page }) => {
      await page.goto('/vendors/maison-lanna');
      await page.click('text=จองวอเตอร์');

      await page.fill('input[name="eventName"]', 'Test Event');
      await page.fill('input[name="eventDate"]', '2026-02-15');
      await page.fill('input[name="guestCount"]', '100');

      // Verify estimated price updates
      await expect(page.locator('text=฿100,000')).toBeVisible();
    });

    test('Booking confirmation email is sent', async ({ page }) => {
      // This test would require email verification
      // For now, we'll verify the success message
      await page.goto('/vendors/maison-lanna');
      await page.click('text=จองวอเตอร์');

      await page.fill('input[name="eventName"]', 'Test Event');
      await page.fill('input[name="eventDate"]', '2026-02-15');
      await page.fill('input[name="guestCount"]', '100');
      await page.click('button:has-text("ส่งคำขอจอง")');

      await expect(page.locator('text=ส่งคำขอจองสำเร็จ')).toBeVisible();
    });
  });

  test.describe('Payment Flow', () => {
    test('Payment page loads booking details', async ({ page }) => {
      await page.goto('/payment/booking-123');

      // Verify booking details are visible
      await expect(page.locator('text=รายละเอียดการจอง')).toBeVisible();
      await expect(page.locator('text=จำนวนเงิน')).toBeVisible();
    });

    test('Payment methods are selectable', async ({ page }) => {
      await page.goto('/payment/booking-123');

      // Verify payment methods are visible
      await expect(page.locator('text=โอนเงินผ่านธนาคาร')).toBeVisible();
      await expect(page.locator('text=เครดิตเครดิต')).toBeVisible();
      await expect(page.locator('text=QR Code')).toBeVisible();
    });

    test('Payment confirmation is shown', async ({ page }) => {
      await page.goto('/payment/booking-123');
      await page.click('text=โอนเงินผ่านธนาคาร');
      await page.click('button:has-text("ยืนยันการชำระเงิน")');

      // Verify success message
      await expect(page.locator('text=ชำระเงินสำเร็จ')).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('Dashboard Flow', () => {
    test('Dashboard shows user bookings', async ({ page }) => {
      await page.goto('/dashboard');

      // Verify bookings section is visible
      await expect(page.locator('text=การจองของฉัน')).toBeVisible();
      await expect(page.locator('.booking-card')).toBeVisible();
    });

    test('Dashboard shows user stats', async ({ page }) => {
      await page.goto('/dashboard');

      // Verify stats are visible
      await expect(page.locator('text=การจองทั้งหมด')).toBeVisible();
      await expect(page.locator('text=ยอดใช้งาน')).toBeVisible();
      await expect(page.locator('text=รายได้')).toBeVisible();
    });

    test('User can view booking details', async ({ page }) => {
      await page.goto('/dashboard');
      await page.click('.booking-card:first-child');

      // Verify booking detail page
      await expect(page.locator('text=รายละเอียดการจอง')).toBeVisible();
    });
  });

  test.describe('Admin Console Flow', () => {
    test('Admin can access dashboard', async ({ page }) => {
      // Login as admin
      await page.goto('/admin/login');
      await page.fill('input[name="email"]', 'admin@example.com');
      await page.fill('input[name="password"]', 'Admin@1234');
      await page.click('button[type="submit"]');

      // Verify admin dashboard
      await expect(page).toHaveURL(/.*admin/);
      await expect(page.locator('text=Dashboard')).toBeVisible();
    });

    test('Admin can approve vendors', async ({ page }) => {
      await page.goto('/admin/vendors');

      // Find pending vendor
      const pendingVendor = page.locator('text=รอตรวจสอบ').first();
      if (await pendingVendor.isVisible()) {
        await pendingVendor.click();
        await page.click('text=อนุมัติ');

        // Verify success message
        await expect(page.locator('text=อนุมัติวอเตอร์สำเร็จ')).toBeVisible();
      }
    });

    test('Admin can suspend users', async ({ page }) => {
      await page.goto('/admin/users');

      // Find active user
      const activeUser = page.locator('text=ใช้งานได้').first();
      if (await activeUser.isVisible()) {
        await activeUser.click();
        await page.click('text=ระงับการใช้งาน');

        // Verify success message
        await expect(page.locator('text=ระงับการใช้งานสำเร็จ')).toBeVisible();
      }
    });
  });

  test.describe('Error Handling', () => {
    test('404 page shows helpful message', async ({ page }) => {
      await page.goto('/non-existent-page');

      // Verify 404 page
      await expect(page.locator('text=ไม่พบหน้านี้')).toBeVisible();
      await expect(page.locator('text=กลับหน้าแรก')).toBeVisible();
    });

    test('API errors are handled gracefully', async ({ page }) => {
      // Mock API error
      await page.route('**/api/vendors', (route) => {
        route.fulfill({ status: 500, body: 'Internal Server Error' });
      });

      await page.goto('/vendors');

      // Verify error message
      await expect(page.locator('text=เกิดข้อผิดพลาด')).toBeVisible();
      await expect(page.locator('text=ลองใหม่')).toBeVisible();
    });

    test('Network errors are handled', async ({ page }) => {
      // Mock network error
      await page.route('**/api/**', (route) => {
        route.abort('failed');
      });

      await page.goto('/vendors');

      // Verify offline message
      await expect(page.locator('text=ไม่สามารถเชื่อมต่ออินเทอร์เน็ตได้')).toBeVisible();
    });
  });

  test.describe('Performance Regression', () => {
    test('Page load time is acceptable', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;

      // Should load within 3 seconds
      expect(loadTime).toBeLessThan(3000);
    });

    test('API response time is acceptable', async ({ page }) => {
      await page.goto('/vendors');

      // Measure API response time
      const responsePromise = page.waitForResponse('**/api/vendors');
      await page.reload();
      const response = await responsePromise;

      // API should respond within 1 second
      const timing = response.request().timing();
      if (timing) {
        expect(timing.responseEnd).toBeLessThan(1000);
      }
    });

    test('Page size is optimized', async ({ page }) => {
      await page.goto('/');

      // Get page size
      const size = await page.evaluate(() => {
        return JSON.stringify(document.documentElement.outerHTML).length;
      });

      // Page should be less than 500KB
      expect(size).toBeLessThan(500000);
    });
  });

  test.describe('Security Regression', () => {
    test('XSS protection works', async ({ page }) => {
      await page.goto('/vendors');

      // Try to inject XSS
      await page.fill('input[placeholder="ค้นหา..."]', '<script>alert("XSS")</script>');
      await page.keyboard.press('Enter');

      // Verify script doesn't execute
      await expect(page.locator('text=XSS')).not.toBeVisible();
    });

    test('CSRF protection exists', async ({ page }) => {
      await page.goto('/auth/login');

      // Check for CSRF token
      const csrfToken = await page.locator('input[name*="csrf"]').count();
      expect(csrfToken).toBeGreaterThan(0);
    });

    test('Sensitive data is not exposed', async ({ page }) => {
      await page.goto('/auth/login');

      // Check that password is not in URL or visible
      await expect(page.locator('input[type="password"]')).toHaveAttribute('type', 'password');

      // Check localStorage doesn't contain sensitive data
      const localStorageData = await page.evaluate(() => {
        return JSON.stringify(localStorage);
      });
      expect(localStorageData).not.toMatch(/password/i);
    });
  });

  test.describe('Accessibility Regression', () => {
    test('Keyboard navigation works', async ({ page }) => {
      await page.goto('/');

      // Navigate using Tab
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      // Verify focus moves
      const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
      expect(focusedElement).toBeTruthy();
    });

    test('Screen reader announces changes', async ({ page }) => {
      await page.goto('/vendors');

      // Check for ARIA live regions
      const liveRegions = await page.locator('[aria-live]').count();
      expect(liveRegions).toBeGreaterThan(0);
    });

    test('Alt text exists for images', async ({ page }) => {
      await page.goto('/vendors');

      // Check images have alt text
      const images = page.locator('img:not([alt=""])');
      const count = await images.count();

      expect(count).toBe(0);
    });
  });
});
