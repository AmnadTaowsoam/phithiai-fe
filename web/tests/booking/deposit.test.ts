import { describe, expect, it } from 'vitest';
import { calculateDeposit } from '@/lib/booking';

describe('booking helpers', () => {
  it('calculates deposit as rounded percent', () => {
    expect(calculateDeposit(1000, 30)).toBe(300);
    expect(calculateDeposit(999, 10)).toBe(100);
  });

  it('never returns negative deposit', () => {
    expect(calculateDeposit(-1000, 30)).toBe(0);
  });
});

