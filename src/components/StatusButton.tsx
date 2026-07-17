import { STATUS_META } from '../constants';
import type { StatusKey } from '../types';

interface StatusButtonProps {
  status: StatusKey;
  selected: boolean;
  onClick: (status: StatusKey) => void;
}

export function StatusButton({ status, selected, onClick }: StatusButtonProps) {
  const meta = STATUS_META[status];
  return (
    <button
      type="button"
      onClick={() => onClick(status)}
      className={`w-full rounded-[24px] p-5 text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-soft ${
        selected
          ? 'scale-[1.01] bg-coral text-white shadow-soft'
          : 'bg-white/80 text-cocoa ring-1 ring-orange-100 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700'
      }`}
    >
      <div className="text-3xl">{meta.emoji}</div>
      <div className="mt-3 text-lg font-semibold">{meta.label}</div>
      <div className={`mt-1 text-sm ${selected ? 'text-white/90' : 'text-slate-500 dark:text-slate-300'}`}>
        {meta.description}
      </div>
    </button>
  );
}
