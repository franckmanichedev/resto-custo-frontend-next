import { useEffect, useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import type { ReactElement } from 'react'
import type { NavigationItem } from '@/config/navigation'
import { cn } from '@/lib/utils/cn'

type Props = {
    item: NavigationItem
    collapsed?: boolean
    activePath: string
}

export function SidebarCollapse({ item, collapsed = false, activePath }: Props): ReactElement {
    const isActive = useMemo(
        () => item.children?.some((child) => activePath === child.path || activePath.startsWith(`${child.path}/`)),
        [activePath, item.children]
    )
    const [open, setOpen] = useState(isActive)

    useEffect(() => {
        if (isActive) setOpen(true)
    }, [isActive])

    return (
        <div className="space-y-1">
            <button
                type="button"
                onClick={() => setOpen((current) => !current)}
                className={cn(
                    'flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors',
                    isActive ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white'
                )}
                aria-expanded={open}
            >
                <span className="inline-flex items-center gap-3">
                    <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {!collapsed ? item.label : null}
                </span>
                {!collapsed ? <span className="text-xs text-slate-500 dark:text-slate-400">{open ? '−' : '+'}</span> : null}
            </button>
            {open && !collapsed ? (
                <div className="space-y-1 pl-9">
                    {item.children?.map((child) => (
                        <NavLink
                            key={child.id}
                            to={child.path}
                            className={({ isActive: childActive }) =>
                                cn(
                                    'flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white',
                                    childActive ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white' : ''
                                )
                            }
                        >
                            <child.icon className="h-3.5 w-3.5 flex-none" aria-hidden="true" />
                            <span className="truncate">{child.label}</span>
                        </NavLink>
                    ))}
                </div>
            ) : null}
        </div>
    )
}
