import { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import { AchievementList } from './components/AchievementList';
import { CalendarHeatmap } from './components/CalendarHeatmap';
import { Card } from './components/Card';
import { PieChart } from './components/PieChart';
import { StatCard } from './components/StatCard';
import { StatusButton } from './components/StatusButton';
import { TabBar } from './components/TabBar';
import { Toast } from './components/Toast';
import { FUNNY_COMMENTS, STATUS_META } from './constants';
import { formatDisplayDate, getTodayKey } from './lib/date';
import { calculateAchievements, calculateStats } from './lib/stats';
import { loadRecords, loadTheme, saveRecords, saveTheme } from './lib/storage';
import type { AppTab, DailyRecord, StatusKey, ThemeMode } from './types';

function App() {
  const [records, setRecords] = useState<DailyRecord[]>(() => loadRecords());
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [theme, setTheme] = useState<ThemeMode>(() => loadTheme());

  const todayKey = getTodayKey();
  const todayRecord = records.find((record) => record.date === todayKey);
  const stats = useMemo(() => calculateStats(records), [records]);
  const achievements = useMemo(() => calculateAchievements(records), [records]);

  useEffect(() => {
    saveRecords(records);
  }, [records]);

  useEffect(() => {
    saveTheme(theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    if (!toastMessage) {
      return undefined;
    }

    const timer = window.setTimeout(() => setToastMessage(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  function upsertToday(status: StatusKey): void {
    const now = new Date().toISOString();
    const nextRecord: DailyRecord = {
      date: todayKey,
      status,
      createdAt: todayRecord?.createdAt ?? now,
      updatedAt: now,
    };

    setRecords((current) => {
      const filtered = current.filter((record) => record.date !== todayKey);
      return [...filtered, nextRecord].sort((a, b) => a.date.localeCompare(b.date));
    });

    const randomComment = FUNNY_COMMENTS[Math.floor(Math.random() * FUNNY_COMMENTS.length)] ?? null;
    setToastMessage(randomComment);
  }

  function exportJson(): void {
    const blob = new Blob([JSON.stringify(records, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `晨间设备自检-${todayKey}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function importJson(event: ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as DailyRecord[];
        const normalized = parsed
          .filter((item) => typeof item?.date === 'string' && typeof item?.status === 'string')
          .sort((a, b) => a.date.localeCompare(b.date));
        setRecords(normalized);
        setToastMessage('导入完成，历史遥测已经接管。');
      } catch {
        setToastMessage('导入失败，JSON 格式不正确。');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  }

  function clearAll(): void {
    if (!window.confirm('确认清空全部记录吗？这个操作无法撤销。')) {
      return;
    }

    setRecords([]);
    setToastMessage('全部记录已清空，系统恢复出厂神秘状态。');
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff7ed,_#ffe2cf_55%,_#ffd0c3)] px-4 pb-28 pt-6 text-cocoa transition-colors dark:bg-[radial-gradient(circle_at_top,_#1e293b,_#0f172a_55%,_#020617)] dark:text-slate-100">
      <div className="mx-auto flex max-w-xl flex-col gap-4">
        <header className="animate-rise">
          <p className="text-sm uppercase tracking-[0.3em] text-coral/80 dark:text-orange-200">
            Morning System Check
          </p>
          <div className="mt-2 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black">晨间设备自检</h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
                {formatDisplayDate(todayKey)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
              className="rounded-full bg-white/80 px-4 py-2 text-sm shadow-soft ring-1 ring-white/60 dark:bg-slate-900/80 dark:ring-slate-700"
            >
              {theme === 'light' ? '🌙 夜间' : '☀️ 日间'}
            </button>
          </div>
        </header>

        {activeTab === 'home' ? (
          <div className="animate-rise space-y-4">
            <Card>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold">今日状态</h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
                    每天仅保留一条记录，但可以随时修改今天的结果。
                  </p>
                </div>
                {todayRecord ? (
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_META[todayRecord.status].color}`}>
                    已记录
                  </span>
                ) : (
                  <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-coral dark:bg-slate-800 dark:text-orange-200">
                    待记录
                  </span>
                )}
              </div>

              <div className="mt-5 grid gap-3">
                {(Object.keys(STATUS_META) as StatusKey[]).map((status) => (
                  <StatusButton
                    key={status}
                    status={status}
                    selected={todayRecord?.status === status}
                    onClick={upsertToday}
                  />
                ))}
              </div>
            </Card>

            {todayRecord ? (
              <Card className="bg-gradient-to-br from-white to-orange-50 dark:from-slate-900 dark:to-slate-800">
                <div className="text-sm text-slate-500 dark:text-slate-300">今日已保存</div>
                <div className="mt-2 text-2xl font-bold">
                  {STATUS_META[todayRecord.status].emoji} {STATUS_META[todayRecord.status].label}
                </div>
                <div className="mt-2 text-sm text-slate-500 dark:text-slate-300">
                  上次更新时间：{new Date(todayRecord.updatedAt).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </Card>
            ) : null}
          </div>
        ) : null}

        {activeTab === 'stats' ? (
          <div className="animate-rise space-y-4">
            <Card>
              <h2 className="text-xl font-bold">统计面板</h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <StatCard label="当前连续" value={`${stats.currentStreak} 天`} />
                <StatCard label="最长连续" value={`${stats.longestStreak} 天`} />
                <StatCard label="本月记录" value={`${stats.monthlyCount} 次`} />
                <StatCard label="优良率" value={`${Math.round(stats.positiveRate * 100)}%`} hint="正常升旗 + 状态惊人" />
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-bold">本月热力图</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">按天查看状态分布。</p>
              <div className="mt-4">
                <CalendarHeatmap dates={stats.heatmapDates} records={records} />
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-bold">状态占比</h2>
              <div className="mt-4">
                <PieChart counts={stats.statusCounts} />
              </div>
            </Card>
          </div>
        ) : null}

        {activeTab === 'achievements' ? (
          <Card className="animate-rise">
            <h2 className="text-xl font-bold">成就系统</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
              持续记录会自动解锁一些没什么必要但很有趣的徽章。
            </p>
            <div className="mt-4">
              <AchievementList achievements={achievements} />
            </div>
          </Card>
        ) : null}

        {activeTab === 'settings' ? (
          <Card className="animate-rise">
            <h2 className="text-xl font-bold">设置</h2>
            <div className="mt-4 grid gap-3">
              <button
                type="button"
                onClick={exportJson}
                className="rounded-[22px] bg-sky px-4 py-4 text-left font-semibold text-cocoa transition hover:shadow-soft dark:bg-slate-800 dark:text-slate-100"
              >
                导出 JSON
              </button>

              <label className="rounded-[22px] bg-mint px-4 py-4 font-semibold text-cocoa transition hover:shadow-soft dark:bg-slate-800 dark:text-slate-100">
                导入 JSON
                <input type="file" accept="application/json" className="hidden" onChange={importJson} />
              </label>

              <button
                type="button"
                onClick={clearAll}
                className="rounded-[22px] bg-rose-100 px-4 py-4 text-left font-semibold text-rose-700 transition hover:shadow-soft dark:bg-rose-500/20 dark:text-rose-200"
              >
                清空所有数据
              </button>

              <button
                type="button"
                onClick={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
                className="rounded-[22px] bg-white px-4 py-4 text-left font-semibold text-cocoa ring-1 ring-orange-100 transition hover:shadow-soft dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700"
              >
                切换深色模式
              </button>
            </div>
          </Card>
        ) : null}

        <TabBar activeTab={activeTab} onChange={setActiveTab} />
      </div>

      <Toast message={toastMessage} />
    </div>
  );
}

export default App;
