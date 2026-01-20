import { test, expect } from '@playwright/test';

test.describe('LIFF App E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to LIFF app
    await page.goto('http://localhost:4100');
  });

  test.describe('LIFF Login Flow', () => {
    test('should display login screen initially', async ({ page }) => {
      // Should show login button
      await expect(page.locator('text=เข้าสู่ระบบด้วย LINE')).toBeVisible();
      await expect(page.locator('text=ใช้บัญชี LINE ของคุณ')).toBeVisible();
    });

    test('should auto-login with LINE ID', async ({ page }) => {
      // Simulate LINE login
      await page.waitForTimeout(1000);
      
      // Should redirect to home page after login
      await expect(page.locator('text=สวัสดี, สมชัย ใจดี')).toBeVisible();
      await expect(page.locator('text=หน้าแรก')).toBeVisible();
    });
  });

  test.describe('LIFF Home Page', () => {
    test('should display overview cards', async ({ page }) => {
      await page.waitForTimeout(1000);
      
      // Should display overview section
      await expect(page.locator('text=ภาพรวม')).toBeVisible();
      await expect(page.locator('text=การจองทั้งหมด')).toBeVisible();
      await expect(page.locator('text=การแจ้งเตือนใหม่')).toBeVisible();
    });

    test('should display recent bookings', async ({ page }) => {
      await page.waitForTimeout(1000);
      
      // Should display recent bookings
      await expect(page.locator('text=การจองล่าสุด')).toBeVisible();
      await expect(page.locator('text=งานแต่งงาน - สมชัย & สมศรี')).toBeVisible();
      await expect(page.locator('text=ยืนยันแล้ว')).toBeVisible();
    });

    test('should display recent notifications', async ({ page }) => {
      await page.waitForTimeout(1000);
      
      // Should display recent notifications
      await expect(page.locator('text=การแจ้งเตือนล่าสุด')).toBeVisible();
      await expect(page.locator('text=การจองสำเร็จ')).toBeVisible();
      await expect(page.locator('text=เตือนการจอง')).toBeVisible();
    });
  });

  test.describe('LIFF Bottom Navigation', () => {
    test('should have all navigation tabs', async ({ page }) => {
      await page.waitForTimeout(1000);
      
      // Should display all navigation tabs
      await expect(page.locator('text=หน้าแรก')).toBeVisible();
      await expect(page.locator('text=การจอง')).toBeVisible();
      await expect(page.locator('text=RSVP')).toBeVisible();
      await expect(page.locator('text=แจ้งเตือน')).toBeVisible();
      await expect(page.locator('text=โปรไฟล์')).toBeVisible();
    });

    test('should navigate between tabs', async ({ page }) => {
      await page.waitForTimeout(1000);
      
      // Click on bookings tab
      await page.click('text=การจอง');
      await expect(page.locator('text=การจองของฉัน')).toBeVisible();
      
      // Click on notifications tab
      await page.click('text=แจ้งเตือน');
      await expect(page.locator('text=การแจ้งเตือน')).toBeVisible();
      
      // Click on profile tab
      await page.click('text=โปรไฟล์');
      await expect(page.locator('text=ข้อมูลส่วนตัว')).toBeVisible();
    });
  });

  test.describe('LIFF Bookings Tab', () => {
    test('should display all bookings', async ({ page }) => {
      await page.waitForTimeout(1000);
      await page.click('text=การจอง');
      
      // Should display booking list
      await expect(page.locator('text=การจองของฉัน')).toBeVisible();
      await expect(page.locator('text=งานแต่งงาน - สมชัย & สมศรี')).toBeVisible();
      await expect(page.locator('text=งานบวชพระ - นายวิชัย')).toBeVisible();
    });

    test('should show booking details', async ({ page }) => {
      await page.waitForTimeout(1000);
      await page.click('text=การจอง');
      
      // Click on view details button
      await page.click('text=ดูรายละเอียด');
      
      // Should show booking details modal or navigate
      await expect(page.locator('text=รายละเอียดการจอง')).toBeVisible();
    });
  });

  test.describe('LIFF RSVP Tab', () => {
    test('should display guest list', async ({ page }) => {
      await page.waitForTimeout(1000);
      await page.click('text=RSVP');
      
      // Should display guest list
      await expect(page.locator('text=รายชื่อแขก')).toBeVisible();
      await expect(page.locator('text=สมชาย ใจดี')).toBeVisible();
      await expect(page.locator('text=สมศรี รักษ์ดี')).toBeVisible();
    });

    test('should allow RSVP response', async ({ page }) => {
      await page.waitForTimeout(1000);
      await page.click('text=RSVP');
      
      // Click on RSVP button
      await page.click('text=เข้าร่วม');
      
      // Should show confirmation modal
      await expect(page.locator('text=ตอบรับคำเชิญ')).toBeVisible();
      await expect(page.locator('text=ยืนยัน')).toBeVisible();
      await expect(page.locator('text=ยกเลิก')).toBeVisible();
    });

    test('should allow guest check-in', async ({ page }) => {
      await page.waitForTimeout(1000);
      await page.click('text=RSVP');
      
      // Click on check-in button
      await page.click('text=เช็กอิน');
      
      // Should update guest status
      await expect(page.locator('text=เช็กอินแล้ว')).toBeVisible();
    });
  });

  test.describe('LIFF Notifications Tab', () => {
    test('should display notification list', async ({ page }) => {
      await page.waitForTimeout(1000);
      await page.click('text=แจ้งเตือน');
      
      // Should display notification list
      await expect(page.locator('text=การแจ้งเตือน')).toBeVisible();
      await expect(page.locator('text=การจองสำเร็จ')).toBeVisible();
      await expect(page.locator('text=เตือนการจอง')).toBeVisible();
    });

    test('should mark notification as read', async ({ page }) => {
      await page.waitForTimeout(1000);
      await page.click('text=แจ้งเตือน');
      
      // Click on unread notification
      const unreadNotification = page.locator('.bg-purple-50').first();
      await unreadNotification.click();
      
      // Should mark as read
      await expect(unreadNotification).not.toHaveClass('bg-purple-50');
    });
  });

  test.describe('LIFF Profile Tab', () => {
    test('should display user profile', async ({ page }) => {
      await page.waitForTimeout(1000);
      await page.click('text=โปรไฟล์');
      
      // Should display user info
      await expect(page.locator('text=สมชัย ใจดี')).toBeVisible();
      await expect(page.locator('text=LINE ID: U1234567890')).toBeVisible();
    });

    test('should allow logout', async ({ page }) => {
      await page.waitForTimeout(1000);
      await page.click('text=โปรไฟล์');
      
      // Click logout button
      await page.click('text=ออกจากระบบ');
      
      // Should return to login screen
      await expect(page.locator('text=เข้าสู่ระบบด้วย LINE')).toBeVisible();
    });
  });

  test.describe('LIFF Booking Flow', () => {
    test('should complete booking flow', async ({ page }) => {
      await page.waitForTimeout(1000);
      
      // Navigate to booking page
      await page.click('text=จองวอเตอร์');
      
      // Select vendor
      await expect(page.locator('text=เลือกวอเตอร์')).toBeVisible();
      await page.click('text=Maison Lanna Collective');
      
      // Fill booking form
      await expect(page.locator('text=ประเภทีงาน')).toBeVisible();
      await page.selectOption('select[name="eventType"]', 'งานแต่งงาน');
      await page.fill('input[name="eventName"]', 'งานแต่งงาน - ทดสอบ');
      await page.fill('input[name="eventDate"]', '2026-03-01');
      await page.fill('input[name="guestCount"]', '50');
      await page.fill('input[name="location"]', 'เชียงใหม่');
      await page.fill('input[name="budget"]', '50000');
      
      // Submit booking
      await page.click('text=ถัดไป');
      
      // Should show confirmation
      await expect(page.locator('text=ยืนยันการจอง')).toBeVisible();
      await expect(page.locator('text=งบประมาณโดยประมาณ:')).toBeVisible();
    });
  });

  test.describe('LIFF Status Page', () => {
    test('should display booking status', async ({ page }) => {
      // Navigate to status page with booking ID
      await page.goto('http://localhost:4100/status?bookingId=bok_001');
      await page.waitForTimeout(1000);
      
      // Should display booking status
      await expect(page.locator('text=สถานะการจอง')).toBeVisible();
      await expect(page.locator('text=งานแต่งงาน - สมชัย & สมศรี')).toBeVisible();
      await expect(page.locator('text=ยืนยันแล้ว')).toBeVisible();
    });

    test('should display payment progress', async ({ page }) => {
      await page.goto('http://localhost:4100/status?bookingId=bok_001');
      await page.waitForTimeout(1000);
      
      // Should display payment progress
      await expect(page.locator('text=ความชำระเงิน')).toBeVisible();
      await expect(page.locator('text=30%')).toBeVisible();
      await expect(page.locator('text=ยอดรวม: ฿120,000')).toBeVisible();
      await expect(page.locator('text=ชำระแล้ว: ฿36,000')).toBeVisible();
      await expect(page.locator('text=คงเหลือ: ฿84,000')).toBeVisible();
    });

    test('should display timeline', async ({ page }) => {
      await page.goto('http://localhost:4100/status?bookingId=bok_001');
      await page.waitForTimeout(1000);
      
      // Should display timeline
      await expect(page.locator('text=ประวัติการ')).toBeVisible();
      await expect(page.locator('text=สร้างการจอง')).toBeVisible();
      await expect(page.locator('text=รับชำระเงินมัดจำ')).toBeVisible();
      await expect(page.locator('text=วอเตอร์ยืนยัน')).toBeVisible();
    });

    test('should allow payment action', async ({ page }) => {
      await page.goto('http://localhost:4100/status?bookingId=bok_001');
      await page.waitForTimeout(1000);
      
      // Click on payment button
      await page.click('text=ชำระเงินคงเหลือ');
      
      // Should show payment alert
      await expect(page.locator('text=จะนำไปยังหน้าชำระเงิน')).toBeVisible();
    });

    test('should allow vendor contact', async ({ page }) => {
      await page.goto('http://localhost:4100/status?bookingId=bok_001');
      await page.waitForTimeout(1000);
      
      // Click on contact vendor button
      await page.click('text=ติดต่อกับวอเตอร์');
      
      // Should show contact alert
      await expect(page.locator('text=จะเปิดแชท LINE กับวอเตอร์')).toBeVisible();
    });
  });

  test.describe('LIFF Mobile Viewport', () => {
    test.use({ viewport: { width: 375, height: 667 } });
    
    test('should be responsive on mobile', async ({ page }) => {
      await page.waitForTimeout(1000);
      
      // Should display correctly on mobile viewport
      await expect(page.locator('text=สวัสดี, สมชัย ใจดี')).toBeVisible();
      await expect(page.locator('.liff-container')).toBeVisible();
    });

    test('should have tappable buttons on mobile', async ({ page }) => {
      await page.waitForTimeout(1000);
      
      // Check button sizes for touch targets
      const buttons = page.locator('button');
      const count = await buttons.count();
      
      for (let i = 0; i < count; i++) {
        const button = buttons.nth(i);
        const box = await button.boundingBox();
        expect(box?.height).toBeGreaterThanOrEqual(44); // WCAG AA minimum
      }
    });
  });

  test.describe('LIFF Error Handling', () => {
    test('should handle loading state', async ({ page }) => {
      // Navigate to status page
      await page.goto('http://localhost:4100/status?bookingId=loading');
      await page.waitForTimeout(500);
      
      // Should display loading spinner
      await expect(page.locator('.animate-spin')).toBeVisible();
      await expect(page.locator('text=กำลังโหลดข้อมูล...')).toBeVisible();
    });

    test('should handle error state', async ({ page }) => {
      // Mock error by using invalid booking ID
      await page.goto('http://localhost:4100/status?bookingId=invalid');
      await page.waitForTimeout(1000);
      
      // Should display error message
      await expect(page.locator('text=ไม่สามารถดึงข้อมูลสถานะการจอง')).toBeVisible();
      await expect(page.locator('text=ลองใหม่')).toBeVisible();
    });
  });
});
