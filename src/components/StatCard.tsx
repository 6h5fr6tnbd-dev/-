interface StatCardProps {
  label: string;
  value: string;
  hint?: string;
}

export function StatCard({ label, value, hint }: StatCardProps) {
  return (
    <div className="rounded-[24px] bg-gradient-to-br from-white to-orange-50 p-4 ring-1 ring-orange-100 dark:from-slate-900 dark:to-slate-800 dark:ring-slate-700">
      <div className="text-sm text-slate-500 dark:text-slate-300">{label}</div>
      <div className="mt-2 text-3xl font-bold text-cocoa dark:text-white">{value}</div>
      {hint ? <div className="mt-1 text-xs text-slate-400 dark:text-slate-400">{hint}</div> : null}
    </div>
  );
}
