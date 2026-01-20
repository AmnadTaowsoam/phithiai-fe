import { test, expect } from '@playwright/test';

test.describe('Happy Path: Register -> Search -> Book', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to home page
    await page.goto('/');
  });

  test('Complete user journey from registration to booking', async ({ page }) => {
    // Step 1: User Registration
    await test.step('Register new user account', async () => {
      // Navigate to registration page
      await page.click('text=สมัครสมาชิก');
      await expect(page).toHaveURL(/.*register/);

      // Fill registration form
      await page.fill('input[name="firstName"]', 'สมชัย');
      await page.fill('input[name="lastName"]', 'ใจดี');
      await page.fill('input[name="email"]', `test${Date.now()}@example.com`);
      await page.fill('input[name="phone"]', '0812345678');
      await page.fill('input[name="password"]', 'Test@1234');
      await page.fill('input[name="confirmPassword"]', 'Test@1234');

      // Accept terms and conditions
      await page.check('input[type="checkbox"]');

      // Submit form
      await page.click('button:has-text("สมัครสมาชิก")');

      // Verify successful registration
      await expect(page.locator('text=สมัครสมาชิกสำเร็จ')).toBeVisible({ timeout: 10000 });
    });

    // Step 2: Search for Vendors
    await test.step('Search for wedding vendors', async () => {
      // Navigate to vendors page
      await page.click('text=ค้นหาวอเตอร์');
      await expect(page).toHaveURL(/.*vendors/);

      // Apply filters
      await page.click('text=หมวดหมู่');
      await page.click('text=งานแต่งงาน');

      await page.click('text=ภูมิภาค');
      await page.click('text=ภาคเหนือ');

      // Search for specific vendor
      await page.fill('input[placeholder="ค้นหา..."]', 'Maison Lanna');

      // Wait for results
      await expect(page.locator('.vendor-card')).toHaveCount(1);
    });

    // Step 3: View Vendor Details
    await test.step('View vendor details', async () => {
      // Click on first vendor
      await page.click('.vendor-card:first-child');

      // Verify vendor details page
      await expect(page.locator('h1:has-text("Maison Lanna Collective")')).toBeVisible();
      await expect(page.locator('text=ตกแต่ง')).toBeVisible();
      await expect(page.locator('text=ภาคเหนือ')).toBeVisible();

      // Verify rating and reviews
      await expect(page.locator('text=4.9')).toBeVisible();
      await expect(page.locator('text=87 รีวิว')).toBeVisible();
    });

    // Step 4: Create Booking
    await test.step('Create booking request', async () => {
      // Click on booking button
      await page.click('text=จองวอเตอร์');

      // Fill booking form
      await page.fill('input[name="eventName"]', 'งานแต่งงาน - สมชัย & สมศรี');
      await page.fill('input[name="eventDate"]', '2026-02-15');
      await page.selectOption('select[name="eventType"]', 'wedding');
      await page.fill('input[name="guestCount"]', '200');
      await page.fill('textarea[name="requirements"]', 'ต้องการดอกไม้สีขาวและชมพู่');

      // Submit booking request
      await page.click('button:has-text("ส่งคำขอจอง")');

      // Verify booking confirmation
      await expect(page.locator('text=ส่งคำขอจองสำเร็จ')).toBeVisible({ timeout: 10000 });
    });

    // Step 5: Make Payment
    await test.step('Complete payment process', async () => {
      // Navigate to payment page
      await page.click('text=ดำเนินการชำระเงิน');
      await expect(page).toHaveURL(/.*payment/);

      // Verify booking details
      await expect(page.locator('text=งานแต่งงาน - สมชัย & สมศรี')).toBeVisible();
      await expect(page.locator('text=Maison Lanna Collective')).toBeVisible();

      // Select payment method
      await page.click('text=โอนเงินผ่านธนาคาร');

      // Fill payment details
      await page.selectOption('select[name="bank"]', 'kbank');
      await page.fill('input[name="accountNumber"]', '1234567890');

      // Confirm payment
      await page.click('button:has-text("ยืนยันการชำระเงิน")');

      // Verify payment success
      await expect(page.locator('text=ชำระเงินสำเร็จ')).toBeVisible({ timeout: 15000 });
    });

    // Step 6: Verify Booking Status
    await test.step('Verify booking status in dashboard', async () => {
      // Navigate to dashboard
      await page.click('text=แดชบอร์ด');
      await expect(page).toHaveURL(/.*dashboard/);

      // Verify booking appears in list
      await expect(page.locator('text=งานแต่งงาน - สมชัย & สมศรี')).toBeVisible();
      await expect(page.locator('text=ยืนยันแล้ว')).toBeVisible();
    });
  });

  test('Quick booking from vendor listing', async ({ page }) => {
    // Login as existing user
    await page.click('text=เข้าสู่ระบบ');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'Test@1234');
    await page.click('button:has-text("เข้าสู่ระบบ")');

    // Navigate to vendors
    await page.click('text=ค้นหาวอเตอร์');

    // Use quick book button
    await page.hover('.vendor-card:first-child');
    await page.click('.vendor-card:first-child button:has-text("จองด่วน")');

    // Verify quick booking modal
    await expect(page.locator('text=จองด่วน')).toBeVisible();
    await page.fill('input[name="eventDate"]', '2026-03-01');
    await page.click('button:has-text("ยืนยัน")');

    // Verify success
    await expect(page.locator('text=ส่งคำขอจองสำเร็จ')).toBeVisible();
  });
});

test.describe('Happy Path: Vendor Onboarding', () => {
  test('Complete vendor registration journey', async ({ page }) => {
    // Navigate to vendor registration
    await page.goto('/vendors/register');

    // Fill vendor registration form
    await page.fill('input[name="businessName"]', 'Test Vendor Co.');
    await page.fill('input[name="slug"]', 'test-vendor');
    await page.selectOption('select[name="category"]', 'decoration');
    await page.selectOption('select[name="zone"]', 'north');
    await page.fill('textarea[name="description"]', 'Test vendor description');
    await page.fill('input[name="phone"]', '0823456789');
    await page.fill('input[name="email"]', 'vendor@example.com');

    // Upload documents
    await page.setInputFiles('input[type="file"][name="businessLicense"]', 'test-files/license.pdf');
    await page.setInputFiles('input[type="file"][name="taxId"]', 'test-files/tax.pdf');

    // Submit registration
    await page.click('button:has-text("สมัครเป็นวอเตอร์")');

    // Verify success message
    await expect(page.locator('text=ส่งข้อมูลสำเร็จ')).toBeVisible();
    await expect(page.locator('text=รอการอนุมัติ')).toBeVisible();
  });
});

test.describe('Happy Path: Guest RSVP', () => {
  test('Complete guest RSVP journey', async ({ page }) => {
    // Navigate to RSVP page
    await page.goto('/rsvp/booking-123');

    // Verify event details
    await expect(page.locator('text=งานแต่งงาน - สมชัย & สมศรี')).toBeVisible();
    await expect(page.locator('text=15 กุมภาพันย์ 2569')).toBeVisible();

    // Select RSVP option
    await page.click('label:has-text("เข้าร่วม")');

    // Fill guest details
    await page.fill('input[name="guestName"]', 'แขกทดสอบ');
    await page.fill('input[name="guestPhone"]', '0834567890');
    await page.fill('textarea[name="message"]', 'ขอบคุณมากครับ');

    // Submit RSVP
    await page.click('button:has-text("ส่งการตอบรับ")');

    // Verify success
    await expect(page.locator('text=บันทึกการตอบรับเรียบร้อยแล้ว')).toBeVisible();
  });
});
