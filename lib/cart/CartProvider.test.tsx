import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { CartProvider } from "./CartProvider";
import { useCart } from "./useCart";
import { CartItem } from "./types";

const STORAGE_KEY = "forge_cart";

function wrapper({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}

function item(id: string, price: number): CartItem {
  return { id, title: `Course ${id}`, instructor: "Someone", price };
}

describe("CartProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("throws when useCart is used outside a CartProvider", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderHook(() => useCart())).toThrow("useCart must be used within a CartProvider");
    consoleError.mockRestore();
  });

  it("hydrates with the default demo items when localStorage is empty", async () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    await waitFor(() => expect(result.current.items).toHaveLength(3));
  });

  it("hydrates from a previously persisted cart", async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([item("x", 10)]));
    const { result } = renderHook(() => useCart(), { wrapper });
    await waitFor(() => expect(result.current.items).toEqual([item("x", 10)]));
  });

  it("falls back to the defaults and clears storage when persisted cart is malformed", async () => {
    localStorage.setItem(STORAGE_KEY, "{not valid json");
    const { result } = renderHook(() => useCart(), { wrapper });
    await waitFor(() => expect(result.current.items).toHaveLength(3));
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it("adds an item and persists the updated cart", async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    const { result } = renderHook(() => useCart(), { wrapper });
    await waitFor(() => expect(result.current.items).toEqual([]));

    act(() => {
      result.current.addItem(item("new", 20));
    });

    expect(result.current.items).toEqual([item("new", 20)]);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual([item("new", 20)]);
  });

  it("does not add a duplicate item with the same id", async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([item("dup", 10)]));
    const { result } = renderHook(() => useCart(), { wrapper });
    await waitFor(() => expect(result.current.items).toHaveLength(1));

    act(() => {
      result.current.addItem(item("dup", 999));
    });

    expect(result.current.items).toEqual([item("dup", 10)]);
  });

  it("removes an item by id", async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([item("a", 10), item("b", 20)]));
    const { result } = renderHook(() => useCart(), { wrapper });
    await waitFor(() => expect(result.current.items).toHaveLength(2));

    act(() => {
      result.current.removeItem("a");
    });

    expect(result.current.items).toEqual([item("b", 20)]);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual([item("b", 20)]);
  });

  it("clears the cart and its persisted storage", async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([item("a", 10)]));
    const { result } = renderHook(() => useCart(), { wrapper });
    await waitFor(() => expect(result.current.items).toHaveLength(1));

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items).toEqual([]);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});
