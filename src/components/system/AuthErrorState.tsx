import type { ReactElement } from 'react'

type Props = { message?: string; onRetry?: () => void }

export function AuthErrorState({ message = "Erreur d'authentification", onRetry }: Props): ReactElement {
  return (
    <div className="min-h-[40vh] flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded shadow text-center">
        <h3 className="text-lg font-semibold mb-2">{message}</h3>
        <p className="text-sm text-muted-foreground mb-4">Veuillez réessayer.</p>
        <div className="flex justify-center">
          <button className="btn" onClick={onRetry}>Réessayer</button>
        </div>
      </div>
    </div>
  )
}

export default AuthErrorState
