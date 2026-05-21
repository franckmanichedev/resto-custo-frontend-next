import { Card } from '@/components/ui/Card'
import { RegisterForm } from '@/features/auth/forms/RegisterForm'
import { ToastProvider } from '@/components/ui/ToastProvider'
import { Link } from 'react-router-dom'
import type { ReactElement } from 'react'

export function RegisterPage(): ReactElement {
  return (
    <ToastProvider>
      <div className="min-h-[60vh] flex items-center justify-center">
        <Card className="w-full max-w-md space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Resto QR Code</p>
            <h2 className="text-3xl font-semibold">Créer un compte</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Inscrivez-vous pour commencer à gérer vos restaurants et commandes.
            </p>
          </div>
          <RegisterForm />
          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            Vous avez déjà un compte ?{' '}
            <Link to="/auth/login" className="font-semibold text-primary hover:underline cursor-pointer">
              Connectez-vous
            </Link>
          </p>
        </Card>
      </div>
    </ToastProvider>
  )
}
