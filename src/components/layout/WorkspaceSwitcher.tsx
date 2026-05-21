import React, { useState } from 'react'
import { cn } from '@/lib/utils/cn'
import { ChevronDown, Check } from 'lucide-react'

type Workspace = {
  id: string
  name: string
  logo?: string
}

type WorkspaceSwitcherProps = {
  currentWorkspace: Workspace
  workspaces: Workspace[]
  onSwitch?: (workspace: Workspace) => void
}

export function WorkspaceSwitcher({ currentWorkspace, workspaces, onSwitch }: WorkspaceSwitcherProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-md bg-surface hover:bg-elevated transition-colors text-sm font-medium text-foreground"
      >
        <div className="h-5 w-5 rounded-sm bg-brand flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          {currentWorkspace.logo ? (
            <img src={currentWorkspace.logo} alt={currentWorkspace.name} className="h-full w-full object-cover rounded-sm" />
          ) : (
            currentWorkspace.name[0]?.toUpperCase()
          )}
        </div>
        <span className="truncate">{currentWorkspace.name}</span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-48 rounded-md bg-app border border-border shadow-floating z-50">
          <div className="p-1">
            {workspaces.map((ws) => (
              <button
                key={ws.id}
                onClick={() => {
                  onSwitch?.(ws)
                  setOpen(false)
                }}
                className={cn(
                  'flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm transition-colors',
                  ws.id === currentWorkspace.id
                    ? 'bg-brand/10 text-brand font-medium'
                    : 'text-foreground hover:bg-surface'
                )}
              >
                <div className="h-4 w-4 rounded-sm bg-brand flex items-center justify-center text-white text-xs flex-shrink-0">
                  {ws.name[0]?.toUpperCase()}
                </div>
                <span className="truncate">{ws.name}</span>
                {ws.id === currentWorkspace.id && <Check className="h-4 w-4 ml-auto" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {open && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />}
    </div>
  )
}
