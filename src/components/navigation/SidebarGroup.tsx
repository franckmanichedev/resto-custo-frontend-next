import type { ReactElement, ReactNode } from 'react'

export function SidebarGroup({ title, children }: { title: string; children: ReactNode }): ReactElement {
  return (
    <div className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">
      <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{title}</div>
      <div className="space-y-1">{children}</div>
    </div>
  )
}
