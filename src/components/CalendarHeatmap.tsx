import { STATUS_META } from '../constants';
import type { DailyRecord } from '../types';

interface CalendarHeatmapProps {
  dates: string[];
  records: DailyRecord[];
}

export function CalendarHeatmap({ dates, records }: CalendarHeatmapProps) {
  const recordMap = new Map(records.map((record) => [record.date, record]));

  return (
    <div className="grid grid-cols-7 gap-2">
      {dates.map((dateKey) => {
        const record = recordMap.get(dateKey);
        const meta = record ? STATUS_META[record.status] : undefined;
        return (
          <div
            key={dateKey}
            title={record ? `${dateKey} · ${meta?.label}` : `${dateKey} · 未记录`}
            className="flex aspect-square items-center justify-center rounded-2xl text-xs font-medium text-cocoa ring-1 ring-orange-100 dark:text-slate-200 dark:ring-slate-700"
            style={{ backgroundColor: meta?.accent ?? '#f8e7da' }}
          >
            {dateKey.slice(-2)}
          </div>
        );
      })}
    </div>
  );
}
