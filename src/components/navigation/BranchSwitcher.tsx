import { useCallback, useMemo, useState } from 'react'
import type { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSaasStore } from '@/stores/saasStore'
import { useQueryClient } from '@tanstack/react-query'
import { type BranchOption } from '@/stores/saasStore'

type Option = BranchOption

type Props = {
  options?: Option[]
}

export function BranchSwitcher({ options = [] }: Props): ReactElement {
  const [search, setSearch] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const branchId = useSaasStore((s) => s.branchId)
  const organizationId = useSaasStore((s) => s.organizationId)
  const switchBranch = useSaasStore((s) => s.switchBranch)
  const addRecentBranch = useSaasStore((s) => s.addRecentBranch)
  const navigate = useNavigate()
  const qc = useQueryClient()
  const [isSwitching, setIsSwitching] = useState(false)

  const filtered = useMemo(() => {
    const normalized = search.trim().toLowerCase()
    return options.filter((option) =>
      option.label.toLowerCase().includes(normalized) || option.organizationName.toLowerCase().includes(normalized)
    )
  }, [options, search])

  const onSelect = useCallback(
    async (option: Option) => {
      setIsSwitching(true)
      try {
        switchBranch(option.organizationId, option.branchId, {
          organizationName: option.organizationName,
          branchName: option.branchName
        })
        addRecentBranch(option)
        qc.invalidateQueries({ queryKey: ['branch', option.organizationId, option.branchId] })
        navigate('/branch')
      } finally {
        setIsSwitching(false)
      }
    },
    [addRecentBranch, navigate, qc, switchBranch]
  )

  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-semibold text-slate-700 dark:text-slate-200">Changer de restaurant</legend>
      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault()
            setActiveIndex((current) => (current + 1) % Math.max(filtered.length, 1))
          }
          if (event.key === 'ArrowUp') {
            event.preventDefault()
            setActiveIndex((current) => (current - 1 + Math.max(filtered.length, 1)) % Math.max(filtered.length, 1))
          }
          if (event.key === 'Enter' && filtered[activeIndex]) {
            event.preventDefault()
            onSelect(filtered[activeIndex])
          }
        }}
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        placeholder="Rechercher une organisation ou un restaurant"
        aria-label="Search branches"
      />
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-900">
        {filtered.length === 0 ? (
          <div className="px-3 py-2 text-sm text-slate-500">Aucun restaurant trouvé.</div>
        ) : (
          filtered.map((option, index) => (
            <button
              type="button"
              key={`${option.organizationId}:${option.branchId}`}
              onClick={() => onSelect(option)}
              className={`flex w-full flex-col items-start rounded-xl px-3 py-3 text-left text-sm transition ${
                index === activeIndex ? 'bg-primary/10 text-slate-900 dark:bg-primary/10 dark:text-white' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              disabled={isSwitching}
            >
              <span className="font-medium">{option.label}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">{option.organizationName} • {option.branchName}</span>
            </button>
          ))
        )}
      </div>
      {branchId ? (
        <div className="text-xs text-slate-500 dark:text-slate-400">Restaurant actif : {branchId} / Organisation active : {organizationId}</div>
      ) : null}
    </fieldset>
  )
}
