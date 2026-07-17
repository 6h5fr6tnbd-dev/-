export type StatusKey = 'idle' | 'normal' | 'amazing' | 'refuse';

export interface DailyRecord {
  date: string;
  status: StatusKey;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
}

export type ThemeMode = 'light' | 'dark';

export type AppTab = 'home' | 'stats' | 'achievements' | 'settings';
