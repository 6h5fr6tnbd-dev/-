interface ToastProps {
  message: string | null;
}

export function Toast({ message }: ToastProps) {
  if (!message) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-24 z-50 animate-rise rounded-[24px] bg-cocoa px-5 py-4 text-sm text-white shadow-soft dark:bg-slate-100 dark:text-slate-900">
      {message}
    </div>
  );
}
