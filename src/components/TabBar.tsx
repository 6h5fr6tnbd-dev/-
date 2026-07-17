import type { AppTab } from '../types';

const ITEMS: Array<{ key: AppTab; label: string; emoji: string }> = [
  { key: 'home', label: '今日', emoji: '☀️' },
  { key: 'stats', label: '统计', emoji: '📊' },
  { key: 'achievements', label: '成就', emoji: '🏅' },
  { key: 'settings', label: '设置', emoji: '⚙️' },
];

interface TabBarProps {
  activeTab: AppTab;
  onChange: (tab: AppTab) => void;
}

export function TabBar({ activeTab, onChange }: TabBarProps) {
  return (
    <nav className="sticky bottom-4 z-40 mt-6 rounded-[28px] bg-white/85 p-2 shadow-soft ring-1 ring-white/70 backdrop-blur dark:bg-slate-900/85 dark:ring-slate-700">
      <div className="grid grid-cols-4 gap-2">
        {ITEMS.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => onChange(item.key)}
            className={`rounded-[20px] px-2 py-3 text-sm transition ${
              activeTab === item.key
                ? 'bg-coral text-white'
                : 'text-slate-500 hover:bg-orange-50 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            <div>{item.emoji}</div>
            <div className="mt-1">{item.label}</div>
          </button>
        ))}
      </div>
    </nav>
  );
}
