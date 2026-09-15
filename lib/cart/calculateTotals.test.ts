import { describe, expect, it } from "vitest";
import { calculateCartTotals } from "./calculateTotals";
import { CartItem } from "./types";

function item(price: number, id = "item"): CartItem {
  return { id, title: "Course", instructor: "Someone", price };
}

describe("calculateCartTotals", () => {
  it("returns zero for an empty cart", () => {
    expect(calculateCartTotals([])).toEqual({ subtotal: 0, tax: 0, total: 0 });
  });

  it("applies 8% tax to a single item", () => {
    expect(calculateCartTotals([item(100)])).toEqual({
      subtotal: 100,
      tax: 8,
      total: 108,
    });
  });

  it("sums the price of multiple items", () => {
    const totals = calculateCartTotals([item(50, "a"), item(30, "b"), item(20, "c")]);
    expect(totals.subtotal).toBe(100);
    expect(totals.tax).toBe(8);
    expect(totals.total).toBe(108);
  });

  it("rounds tax and total to two decimal places", () => {
    const totals = calculateCartTotals([item(19.99)]);
    expect(totals.subtotal).toBe(19.99);
    expect(totals.tax).toBeCloseTo(1.6, 2);
    expect(totals.total).toBeCloseTo(21.59, 2);
    // toFixed(2) output must not carry floating-point noise (e.g. 21.590000000000003)
    expect(Number.isInteger(totals.total * 100)).toBe(true);
  });
});
