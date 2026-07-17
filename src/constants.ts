import type { StatusKey } from './types';

export const STORAGE_KEY = 'morning-device-self-check-records';
export const THEME_KEY = 'morning-device-self-check-theme';

export const STATUS_META: Record<
  StatusKey,
  { label: string; emoji: string; color: string; accent: string; description: string }
> = {
  idle: {
    label: '无事发生',
    emoji: '😴',
    color: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-100',
    accent: '#94a3b8',
    description: '设备低功耗待机，一切波澜不惊。',
  },
  normal: {
    label: '正常升旗',
    emoji: '🌅',
    color: 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-200',
    accent: '#f59e0b',
    description: '系统按标准流程稳定启动。',
  },
  amazing: {
    label: '状态惊人',
    emoji: '🚀',
    color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-200',
    accent: '#10b981',
    description: '今日性能曲线过于优雅，疑似超频。',
  },
  refuse: {
    label: '拒绝回答',
    emoji: '🙈',
    color: 'bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-200',
    accent: '#f43f5e',
    description: '系统拒绝提供更多遥测信息。',
  },
};

export const FUNNY_COMMENTS = [
  '今日设备运行正常。',
  '系统状态优秀。',
  '建议继续保持良好作息。',
  '已超过99%的虚构用户。',
  '数据已同步至不存在的国家晨勃数据库。',
  '检测到稳定输出，建议颁发小红花。',
  '系统自检结束，未发现离谱波动。',
];
