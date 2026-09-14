"use client";

import React, { createContext, useEffect, useState, useCallback } from 'react';
import { CartItem, CartContextType } from './types';

export const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'forge_cart';
const DEFAULT_ITEMS: CartItem[] = [
  {
    id: 'course-1',
    title: 'Advanced React Patterns',
    instructor: 'Sarah Chen',
    price: 79,
  },
  {
    id: 'course-2',
    title: 'Web Development Fundamentals',
    instructor: 'John Smith',
    price: 49,
  },
  {
    id: 'course-3',
    title: 'UI/UX Design Masterclass',
    instructor: 'Mike Johnson',
    price: 59,
  },
];

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
        setItems(DEFAULT_ITEMS);
      }
    } else {
      setItems(DEFAULT_ITEMS);
    }
  }, []);

  const persistItems = useCallback((newItems: CartItem[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
  }, []);

  const addItem = useCallback((item: CartItem) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev;
      const updated = [...prev, item];
      persistItems(updated);
      return updated;
    });
  }, [persistItems]);

  const removeItem = useCallback((id: string) => {
    setItems(prev => {
      const updated = prev.filter(i => i.id !== id);
      persistItems(updated);
      return updated;
    });
  }, [persistItems]);

  const clearCart = useCallback(() => {
    setItems([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
