import { CartItem } from './types';

export interface CartTotals {
  subtotal: number;
  tax: number;
  total: number;
}

export function calculateCartTotals(items: CartItem[]): CartTotals {
  const TAX_RATE = 0.08; // 8%
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const tax = parseFloat((subtotal * TAX_RATE).toFixed(2));
  const total = parseFloat((subtotal + tax).toFixed(2));

  return { subtotal, tax, total };
}
