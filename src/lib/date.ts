export function getTodayKey(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

export function formatDisplayDate(dateKey: string): string {
  const date = new Date(`${dateKey}T00:00:00`);
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(date);
}

export function getMonthKey(dateKey: string): string {
  return dateKey.slice(0, 7);
}

export function getDaysInMonth(dateKey: string): number {
  const [year = 1970, month = 1] = dateKey.split('-').map(Number);
  return new Date(year, month, 0).getDate();
}

export function buildMonthMatrix(anchorDateKey: string): string[] {
  const [year = 1970, month = 1] = anchorDateKey.split('-').map(Number);
  const totalDays = new Date(year, month, 0).getDate();
  return Array.from({ length: totalDays }, (_, index) => {
    const day = String(index + 1).padStart(2, '0');
    return `${anchorDateKey.slice(0, 7)}-${day}`;
  });
}
