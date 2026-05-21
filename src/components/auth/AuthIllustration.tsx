import React from 'react'

export function AuthIllustration() {
  return (
    <div className="relative overflow-hidden rounded-modal bg-surface p-4 text-foreground shadow-soft">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(var(--color-brand),0.16),transparent_35%)]" />
      <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-brand/20 blur-3xl" />
      <div className="relative space-y-6">
        <div className="rounded-sm bg-elevated/95 p-4 shadow-card">
          <p className="text-xs uppercase tracking-[0.2em] text-brand">Dashboard enterprise</p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground">Gestion multi-tenant</h2>
          <p className="mt-2 text-sm text-muted-foreground">Contrôlez vos organisations, succursales et équipes depuis une seule console premium.</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-sm bg-elevated/90 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Branches</p>
            <p className="mt-2 text-xl font-semibold text-foreground">24</p>
          </div>
          <div className="rounded-sm bg-elevated/90 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Commandes/jour</p>
            <p className="mt-2 text-xl font-semibold text-foreground">1.2k</p>
          </div>
        </div>

        <div className="rounded-sm bg-elevated/90 p-5">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span>Trafic</span>
            <span>+19%</span>
          </div>
          <div className="mt-4 h-24 rounded-sm bg-surface" />
        </div>
      </div>
    </div>
  )
}
