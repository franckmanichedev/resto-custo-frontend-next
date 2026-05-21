import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNavigationStore } from '@/stores/navigationStore'
import { sidebarConfig } from '@/navigation/sidebar.config'
import { useTenant } from '@/hooks/useTenant'
import type { ReactElement } from 'react'
import { cn } from '@/lib/utils/cn'

const flattenRoutes = (items: typeof sidebarConfig) =>
  items.flatMap((item) => [item, ...(item.children ?? [])])

export function CommandPalette(): ReactElement {
  const open = useNavigationStore((state) => state.commandPaletteOpen)
  const setOpen = useNavigationStore((state) => state.setCommandPaletteOpen)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const tenant = useTenant()
  const navigate = useNavigate()

  const entries = useMemo(() => {
    const available = flattenRoutes(sidebarConfig).filter((item) =>
      item.permissions ? item.permissions.some((permission) => tenant.permissions.includes(permission)) : true
    )
    const normalized = query.trim().toLowerCase()
    return available
      .filter((item) => item.label.toLowerCase().includes(normalized) || item.path.toLowerCase().includes(normalized))
      .slice(0, 8)
  }, [query, tenant.permissions])

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const isCmdK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k'
      if (isCmdK) {
        event.preventDefault()
        setOpen(true)
      }
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [setOpen])

  useEffect(() => {
    if (!open) return
    setActiveIndex(0)
    setQuery('')
  }, [open])

  const submitEntry = (path: string) => {
    setOpen(false)
    navigate(path)
  }

  const moveActive = (direction: 'up' | 'down') => {
    setActiveIndex((current) => {
      const next = direction === 'down' ? current + 1 : current - 1
      if (next < 0) return entries.length - 1
      if (next >= entries.length) return 0
      return next
    })
  }

  if (!open) return <></>

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-hidden bg-slate-950/60 p-4 backdrop-blur-sm sm:p-6">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-800 dark:bg-slate-950">
        <div className="flex items-center gap-3">
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown') {
                event.preventDefault()
                moveActive('down')
              }
              if (event.key === 'ArrowUp') {
                event.preventDefault()
                moveActive('up')
              }
              if (event.key === 'Enter' && entries[activeIndex]) {
                submitEntry(entries[activeIndex].path)
              }
            }}
            placeholder="Rechercher une page, une action ou un restaurant..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
          />
          <button type="button" onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
            Annuler
          </button>
        </div>
        <div className="mt-4 max-h-96 overflow-y-auto rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
          {entries.length === 0 ? (
            <div className="p-6 text-sm text-slate-500 dark:text-slate-400">Aucun résultat trouvé.</div>
          ) : (
            <ul>
              {entries.map((item, index) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => submitEntry(item.path)}
                    className={cn(
                      'flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm transition',
                      index === activeIndex ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white' : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900'
                    )}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-slate-400 dark:text-slate-500">{item.path}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default CommandPalette
