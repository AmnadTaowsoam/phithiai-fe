export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  USERS: '/users',
  VENDORS: '/vendors',
  BOOKINGS: '/bookings',
  DISPUTES: '/disputes',
  PRICING: '/pricing',
  FEATURE_FLAGS: '/feature-flags',
  ANALYTICS: '/analytics',
  SETTINGS: '/settings',
  LOGIN: '/login',
} as const;

export const VENDOR_CATEGORIES = [
  { value: 'venue', label: 'สถานที่จัดงาน' },
  { value: 'photography', label: 'ช่างภาพ' },
  { value: 'catering', label: 'อาหารและเครื่องดื่ม' },
  { value: 'decoration', label: 'ตะกอบและตกแต่ง' },
  { value: 'entertainment', label: 'บันเทิง' },
  { value: 'other', label: 'อื่นๆ' },
] as const;

export const ZONES = [
  { value: 'bangkok', label: 'กรุงเทพและปริมณฑล' },
  { value: 'central', label: 'ภาคกลาง' },
  { value: 'north', label: 'ภาคเหนือ' },
  { value: 'northeast', label: 'ภาคตะวันออกเฉียงเหนือ' },
  { value: 'south', label: 'ภาคใต้' },
] as const;

export const EVENT_TYPES = [
  { value: 'wedding', label: 'งานแต่งงาน' },
  { value: 'engagement', label: 'งานหมั้น' },
  { value: 'housewarming', label: 'งานขึ้นบ้านใหม่' },
  { value: 'ordination', label: 'งานบวช' },
  { value: 'funeral', label: 'งานศพ' },
  { value: 'other', label: 'อื่นๆ' },
] as const;

export const BOOKING_STATUSES = [
  { value: 'pending_deposit', label: 'รอชำระมัดจำ', color: 'warning' },
  { value: 'confirmed', label: 'ยืนยันแล้ว', color: 'success' },
  { value: 'in_progress', label: 'กำลังดำเนินการ', color: 'info' },
  { value: 'completed', label: 'เสร็จสิ้น', color: 'default' },
  { value: 'cancelled', label: 'ยกเลิก', color: 'error' },
  { value: 'disputed', label: 'มีข้อพิพาท', color: 'error' },
] as const;

export const DISPUTE_TYPES = [
  { value: 'vendor_no_show', label: 'ผู้ให้บริการไม่มา' },
  { value: 'quality_issue', label: 'คุณภาพไม่ตรงตามที่ตกลง' },
  { value: 'payment_issue', label: 'ปัญหาการชำระเงิน' },
  { value: 'contract_breach', label: 'ผิดสัญญา' },
  { value: 'other', label: 'อื่นๆ' },
] as const;

export const DISPUTE_STATUSES = [
  { value: 'open', label: 'เปิดใหม่', color: 'error' },
  { value: 'investigating', label: 'กำลังสอบสวน', color: 'warning' },
  { value: 'resolved', label: 'แก้ไขแล้ว', color: 'success' },
  { value: 'closed', label: 'ปิด', color: 'default' },
] as const;

export const FEATURE_FLAG_STATES = [
  { value: 'OFF', label: 'ปิด', color: 'default' },
  { value: 'BETA', label: 'ทดสอบ', color: 'warning' },
  { value: 'ON', label: 'เปิด', color: 'success' },
] as const;

export const USER_ROLES = [
  { value: 'buyer', label: 'ผู้ใช้ทั่วไป' },
  { value: 'vendor', label: 'ผู้ให้บริการ' },
  { value: 'admin', label: 'ผู้ดูแลระบบ' },
] as const;

export const USER_STATUSES = [
  { value: 'active', label: 'ใช้งานอยู่', color: 'success' },
  { value: 'suspended', label: 'ถูกระงับ', color: 'error' },
  { value: 'deleted', label: 'ถูกลบ', color: 'default' },
] as const;

export const VENDOR_STATUSES = [
  { value: 'pending', label: 'รออนุมัติ', color: 'warning' },
  { value: 'active', label: 'ใช้งานอยู่', color: 'success' },
  { value: 'suspended', label: 'ถูกระงับ', color: 'error' },
  { value: 'rejected', label: 'ถูกปฏิเสธ', color: 'error' },
] as const;

