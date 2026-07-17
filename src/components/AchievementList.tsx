import type { Achievement } from '../types';

interface AchievementListProps {
  achievements: Achievement[];
}

export function AchievementList({ achievements }: AchievementListProps) {
  return (
    <div className="grid gap-3">
      {achievements.map((achievement) => (
        <article
          key={achievement.id}
          className={`rounded-[24px] p-4 ring-1 transition ${
            achievement.unlocked
              ? 'bg-gradient-to-r from-amber-100 to-orange-50 ring-amber-200 dark:from-amber-500/20 dark:to-orange-500/10 dark:ring-amber-500/30'
              : 'bg-slate-100/80 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700'
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-semibold text-cocoa dark:text-white">{achievement.title}</div>
              <div className="mt-1 text-sm text-slate-500 dark:text-slate-300">
                {achievement.description}
              </div>
            </div>
            <div className="text-2xl">{achievement.unlocked ? '🏅' : '🔒'}</div>
          </div>
        </article>
      ))}
    </div>
  );
}
