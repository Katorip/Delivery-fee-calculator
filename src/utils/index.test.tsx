import { cleanup } from '@testing-library/react';
import { describe, expect, test } from '@jest/globals';
import {
  calculateCartValue,
  deliveryDistanceExtra,
  calculateItemSurcharge,
  calculateBulkFee,
  checkRushHours,
  realPrice,
  setFinalPrice,
  checkFreeDelivery,
} from '../utils';

afterEach(() => {
  cleanup();
});

describe('Surcharge if cart value is under 10e', () => {
  test('10 - 8.9 to equal 1.1', () => {
    expect(calculateCartValue(8.9, 10)).toBe(1.1);
  });

  test('10e: no surcharge', () => {
    expect(calculateCartValue(10, 10)).toBe(0);
  });
});

describe('Delivery distance', () => {
  test('1499m cost 3e', () => {
    expect(deliveryDistanceExtra(1499, 500, 1)).toBe(3);
  });

  test('1500m cost 3e', () => {
    expect(deliveryDistanceExtra(1500, 500, 1)).toBe(3);
  });

  test('1501m cost 4e', () => {
    expect(deliveryDistanceExtra(1501, 500, 1)).toBe(4);
  });
});

describe('Item surcharge', () => {
  test('4 items returns 0e', () => {
    expect(calculateItemSurcharge(4, 4, 0.5)).toBe(0);
  });

  test('5 items returns 0.5e', () => {
    expect(calculateItemSurcharge(5, 4, 0.5)).toBe(0.5);
  });

  test('10 items returns 3e', () => {
    expect(calculateItemSurcharge(10, 4, 0.5)).toBe(3);
  });
});

describe('Check if bulk fee is needed', () => {
  test('no bulk fee if 12 items', () => {
    expect(calculateBulkFee(12, 12, 1.2)).toBe(0);
  });

  test('bulk fee if 13 items', () => {
    expect(calculateBulkFee(13, 12, 1.2)).toBe(1.2);
  });
});

describe('Check rush times', () => {
  test('no rush hour extra on Tuesdays', () => {
    expect(checkRushHours('2023-01-17T15:25', 1, 15, 19, 1.2)).toBe(1);
  });

  test('no rush hour extra on Fridays before 15:00', () => {
    expect(checkRushHours('2023-01-20T12:25', 5, 15, 19, 1.2)).toBe(1);
  });

  test('rush hour extra on Fridays after 15:00', () => {
    expect(checkRushHours('2023-01-20T15:25', 5, 15, 19, 1.2)).toBe(1.2);
  });

  test('rush hour extra on Fridays before 19:00', () => {
    expect(checkRushHours('2023-01-20T19:00', 5, 15, 19, 1.2)).toBe(1.2);
  });

  test('no rush hour extra on Fridays after 19:00', () => {
    expect(checkRushHours('2023-01-20T19:01', 5, 15, 19, 1.2)).toBe(1);
  });
});

describe('Calculate real price', () => {
  test('(2 + 2 + 2 + 1.2) * 1.2', () => {
    expect(realPrice(2, 2, 2, 1.2, 1.2)).toBe(8.64);
  });
});

describe('Check final price', () => {
  test('13 is less than 15', () => {
    expect(setFinalPrice(13, 15)).toBe(13);
  });

  test('16 is more than 15', () => {
    expect(setFinalPrice(16, 15)).toBe(15);
  });
});

describe('Free delivery check', () => {
  test('0e delivery if cart value 100e', () => {
    expect(checkFreeDelivery(100, 100)).toBe(true);
  });

  test('0e delivery if cart value more than 100e', () => {
    expect(checkFreeDelivery(101, 100)).toBe(true);
  });

  test('not 0e delivery if cart value is less than 100e', () => {
    expect(checkFreeDelivery(99, 100)).toBe(false);
  });
});
