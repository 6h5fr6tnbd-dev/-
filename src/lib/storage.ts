import { STORAGE_KEY, THEME_KEY } from '../constants';
import type { DailyRecord, ThemeMode } from '../types';

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

export function loadRecords(): DailyRecord[] {
  if (!isBrowser()) {
    return [];
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as DailyRecord[];
    return parsed
      .filter((item) => typeof item?.date === 'string' && typeof item?.status === 'string')
      .sort((a, b) => a.date.localeCompare(b.date));
  } catch {
    return [];
  }
}

export function saveRecords(records: DailyRecord[]): void {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function loadTheme(): ThemeMode {
  if (!isBrowser()) {
    return 'light';
  }

  const stored = window.localStorage.getItem(THEME_KEY);
  return stored === 'dark' ? 'dark' : 'light';
}

export function saveTheme(theme: ThemeMode): void {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(THEME_KEY, theme);
}
