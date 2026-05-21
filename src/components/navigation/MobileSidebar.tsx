import { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import type { ReactElement } from 'react'
import type { NavigationItem } from '@/config/navigation'
import { SidebarCollapse } from '@/components/navigation/SidebarCollapse'
import { Button } from '../ui/Button'

type Props = {
  open: boolean
  onClose: () => void
  items: NavigationItem[]
}

export function MobileSidebar({ open, onClose, items }: Props): ReactElement {
  const location = useLocation()

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    if (open) {
      document.addEventListener('keydown', handler)
    }

    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  return (
    <div
      className={`fixed inset-0 z-40 transition-all duration-300 ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
      aria-hidden={!open}
    >
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose} />
      <aside className="absolute left-0 top-0 h-full w-full max-w-xs overflow-y-auto bg-white p-4 shadow-2xl dark:bg-slate-950">
        <div className="mb-6 flex items-center justify-between">
          <div className="text-lg font-semibold">Navigation</div>
          <Button 
            variant="danger"
            onClick={onClose} 
            className="rounded-md border border-slate-200 px-3 py-2 text-sm dark:border-slate-800"
          >
            Fermer
          </Button>
        </div>
        <nav className="space-y-2">
          {items.map((item) =>
            item.children && item.children.length > 0 ? (
              <SidebarCollapse key={item.id} item={item} activePath={location.pathname} />
            ) : (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={onClose}
                className="block rounded-xl px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                {item.label}
              </NavLink>
            )
          )}
        </nav>
      </aside>
    </div>
  )
}
