import { STATUS_META } from '../constants';
import type { StatusKey } from '../types';

interface PieChartProps {
  counts: Record<StatusKey, number>;
}

function polarToCartesian(cx: number, cy: number, radius: number, angle: number) {
  return {
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  };
}

export function PieChart({ counts }: PieChartProps) {
  const entries = Object.entries(counts) as Array<[StatusKey, number]>;
  const total = entries.reduce((sum, [, value]) => sum + value, 0);
  let startAngle = -Math.PI / 2;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <svg viewBox="0 0 120 120" className="mx-auto h-44 w-44">
        {total === 0 ? (
          <circle cx="60" cy="60" r="42" fill="#f8e7da" />
        ) : (
          entries.map(([status, value]) => {
            const ratio = value / total;
            const endAngle = startAngle + Math.PI * 2 * ratio;
            const largeArcFlag = ratio > 0.5 ? 1 : 0;
            const start = polarToCartesian(60, 60, 42, startAngle);
            const end = polarToCartesian(60, 60, 42, endAngle);
            const path = [
              `M 60 60`,
              `L ${start.x} ${start.y}`,
              `A 42 42 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
              'Z',
            ].join(' ');

            startAngle = endAngle;
            return <path key={status} d={path} fill={STATUS_META[status].accent} />;
          })
        )}
        <circle cx="60" cy="60" r="18" fill="white" className="dark:fill-slate-900" />
      </svg>

      <div className="space-y-2">
        {entries.map(([status, value]) => (
          <div key={status} className="flex items-center justify-between gap-4 rounded-2xl bg-orange-50 px-3 py-2 dark:bg-slate-800">
            <div className="flex items-center gap-2 text-sm text-cocoa dark:text-slate-100">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: STATUS_META[status].accent }}
              />
              <span>{STATUS_META[status].emoji}</span>
              <span>{STATUS_META[status].label}</span>
            </div>
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-300">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
