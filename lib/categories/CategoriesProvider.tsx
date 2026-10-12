"use client";

import React, { createContext, useEffect, useState, useCallback } from 'react';
import { Category, CategoriesContextType } from './types';

export const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

const STORAGE_KEY = 'forge_categories';

// Matches the categories that were previously hardcoded into the
// create/edit-course dropdowns, so existing courses keep resolving to a
// real, labeled category instead of silently becoming "uncategorized".
const DEFAULT_CATEGORIES: Category[] = [
  { key: 'web-development', label: 'Web Development' },
  { key: 'mobile-development', label: 'Mobile Development' },
  { key: 'design', label: 'Design' },
  { key: 'data-science', label: 'Data Science' },
  { key: 'cloud', label: 'Cloud' },
  { key: 'devops', label: 'DevOps' },
];

function slugify(label: string): string {
  return label
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function CategoriesProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);

  // SSR-safe hydration: state starts at the default and is patched here
  // after mount, once localStorage is available.
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCategories(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const persist = useCallback((next: Category[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const addCategory = useCallback(
    (label: string) => {
      setCategories(prev => {
        const key = slugify(label);
        if (!key || prev.some(c => c.key === key)) return prev;
        const next = [...prev, { key, label: label.trim() }];
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const renameCategory = useCallback(
    (key: string, label: string) => {
      setCategories(prev => {
        const next = prev.map(c => (c.key === key ? { ...c, label: label.trim() } : c));
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const deleteCategory = useCallback(
    (key: string) => {
      setCategories(prev => {
        const next = prev.filter(c => c.key !== key);
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const value: CategoriesContextType = {
    categories,
    addCategory,
    renameCategory,
    deleteCategory,
  };

  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
}
