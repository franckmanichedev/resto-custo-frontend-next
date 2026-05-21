import type { ReactElement } from 'react'

export function FullScreenLoader(): ReactElement {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50" aria-live="polite">
      <div className="animate-spin h-10 w-10 border-4 border-primary rounded-full border-t-transparent" />
    </div>
  )
}

export default FullScreenLoader
