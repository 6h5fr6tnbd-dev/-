import type { PropsWithChildren } from 'react';

interface CardProps extends PropsWithChildren {
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <section
      className={`rounded-[28px] bg-white/90 p-5 shadow-soft ring-1 ring-white/60 backdrop-blur dark:bg-slate-900/85 dark:ring-slate-700/50 ${className}`}
    >
      {children}
    </section>
  );
}
