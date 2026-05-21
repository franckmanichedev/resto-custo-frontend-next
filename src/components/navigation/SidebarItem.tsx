import { NavLink } from 'react-router-dom'
import type { ReactElement } from 'react'
import type { NavigationItem } from '@/config/navigation'
import { cn } from '@/lib/utils/cn'

type Props = {
    item: NavigationItem
    collapsed?: boolean
    activePath: string
}

export function SidebarItem({ item, collapsed = false, activePath }: Props): ReactElement {
    const active = activePath === item.path || activePath.startsWith(`${item.path}/`)

    return (
        <NavLink
            to={item.path}
            className={({ isActive }) =>
                cn(
                    'group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors',
                    active || isActive
                        ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white'
                )
            }
        >
            <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            {!collapsed ? <span className="truncate">{item.label}</span> : null}
            {!collapsed && item.badge ? (
                <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                    {item.badge}
                </span>
            ) : null}
        </NavLink>
    )
}
