import type { ReactElement } from 'react'
import { Button } from '@/components/ui/Button'

type Props = { title?: string; description?: string; actionLabel?: string; onAction?: () => void }

export function EmptyAuthState({ title = 'Aucune session', description = 'Connectez-vous pour continuer.', actionLabel = "Se connecter", onAction }: Props): ReactElement {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded shadow text-center">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex justify-center">
          <Button onClick={onAction}>{actionLabel}</Button>
        </div>
      </div>
    </div>
  )
}

export default EmptyAuthState
