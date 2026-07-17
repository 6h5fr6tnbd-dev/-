import { STATUS_META } from '../constants';
import { buildMonthMatrix, getMonthKey, getTodayKey } from './date';
import type { Achievement, DailyRecord, StatusKey } from '../types';

export interface StatsSummary {
  currentStreak: number;
  longestStreak: number;
  monthlyCount: number;
  positiveRate: number;
  statusCounts: Record<StatusKey, number>;
  heatmapDates: string[];
}

function recordMap(records: DailyRecord[]): Map<string, DailyRecord> {
  return new Map(records.map((record) => [record.date, record]));
}

export function calculateStreaks(records: DailyRecord[]): {
  currentStreak: number;
  longestStreak: number;
} {
  if (records.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  const sorted = [...records].sort((a, b) => a.date.localeCompare(b.date));
  let longestStreak = 1;
  let currentRun = 1;

  for (let index = 1; index < sorted.length; index += 1) {
    const previousRecord = sorted[index - 1];
    const currentRecord = sorted[index];
    if (!previousRecord || !currentRecord) {
      continue;
    }

    const previous = new Date(`${previousRecord.date}T00:00:00`);
    const current = new Date(`${currentRecord.date}T00:00:00`);
    const dayDelta = (current.getTime() - previous.getTime()) / 86400000;

    if (dayDelta === 1) {
      currentRun += 1;
      longestStreak = Math.max(longestStreak, currentRun);
    } else {
      currentRun = 1;
    }
  }

  const map = recordMap(sorted);
  let currentStreak = 0;
  const cursor = new Date(`${getTodayKey()}T00:00:00`);

  while (map.has(cursor.toISOString().slice(0, 10))) {
    currentStreak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return { currentStreak, longestStreak };
}

export function calculateStats(records: DailyRecord[]): StatsSummary {
  const todayKey = getTodayKey();
  const monthKey = getMonthKey(todayKey);
  const statusCounts: Record<StatusKey, number> = {
    idle: 0,
    normal: 0,
    amazing: 0,
    refuse: 0,
  };

  records.forEach((record) => {
    statusCounts[record.status] += 1;
  });

  const { currentStreak, longestStreak } = calculateStreaks(records);
  const monthlyRecords = records.filter((record) => getMonthKey(record.date) === monthKey);
  const positiveCount = monthlyRecords.filter(
    (record) => record.status === 'normal' || record.status === 'amazing',
  ).length;

  return {
    currentStreak,
    longestStreak,
    monthlyCount: monthlyRecords.length,
    positiveRate: monthlyRecords.length === 0 ? 0 : positiveCount / monthlyRecords.length,
    statusCounts,
    heatmapDates: buildMonthMatrix(todayKey),
  };
}

export function calculateAchievements(records: DailyRecord[]): Achievement[] {
  const stats = calculateStats(records);
  const todayKey = getTodayKey();
  const monthDates = buildMonthMatrix(todayKey).filter((dateKey) => dateKey <= todayKey);
  const monthMap = new Set(records.map((record) => record.date));
  const amazingSorted = records
    .filter((record) => record.status === 'amazing')
    .sort((a, b) => a.date.localeCompare(b.date));

  let amazingRun = 0;
  let amazingLongest = 0;
  for (let index = 0; index < amazingSorted.length; index += 1) {
    if (index === 0) {
      amazingRun = 1;
      amazingLongest = 1;
      continue;
    }

    const previousRecord = amazingSorted[index - 1];
    const currentRecord = amazingSorted[index];
    if (!previousRecord || !currentRecord) {
      continue;
    }

    const previous = new Date(`${previousRecord.date}T00:00:00`);
    const current = new Date(`${currentRecord.date}T00:00:00`);
    if ((current.getTime() - previous.getTime()) / 86400000 === 1) {
      amazingRun += 1;
    } else {
      amazingRun = 1;
    }
    amazingLongest = Math.max(amazingLongest, amazingRun);
  }

  return [
    {
      id: 'first-record',
      title: '初次记录',
      description: '完成第一次设备自检。',
      unlocked: records.length >= 1,
    },
    {
      id: 'seven-streak',
      title: '连续7天',
      description: '连续记录 7 天，没有偷懒。',
      unlocked: stats.longestStreak >= 7,
    },
    {
      id: 'thirty-streak',
      title: '连续30天',
      description: '连续记录 30 天，系统稳定得离谱。',
      unlocked: stats.longestStreak >= 30,
    },
    {
      id: 'amazing-three',
      title: '状态惊人连续3天',
      description: '连续 3 天保持火箭级输出。',
      unlocked: amazingLongest >= 3,
    },
    {
      id: 'full-month',
      title: '本月全勤',
      description: '本月到今天为止每天都有记录，真正的全勤工程师。',
      unlocked: monthDates.every((dateKey) => monthMap.has(dateKey)),
    },
  ];
}

export function getStatusShareLabel(status: StatusKey): string {
  return `${STATUS_META[status].emoji} ${STATUS_META[status].label}`;
}
