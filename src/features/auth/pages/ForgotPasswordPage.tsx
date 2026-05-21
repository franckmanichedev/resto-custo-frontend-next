import { Card } from '@/components/ui/Card'
import { ForgotPasswordForm } from '@/features/auth/forms/ForgotPasswordForm'
import { ToastProvider } from '@/components/ui/ToastProvider'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { AuthCard } from '@/components/auth/AuthCard'
import { Link } from 'react-router-dom'
import type { ReactElement } from 'react'

export function ForgotPasswordPage(): ReactElement {
  return (
    <ToastProvider>
      <AuthLayout>
        <AuthCard title="Mot de passe oublié" subtitle="Nous vous aiderons à récupérer votre compte">
          <ForgotPasswordForm />
          <div className="mt-6 border-t border-border pt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Vous vous souvenez de votre mot de passe ?{' '}
              <Link to="/auth/login" className="font-semibold text-primary hover:underline">
                Connectez-vous
              </Link>
            </p>
          </div>
        </AuthCard>
      </AuthLayout>
    </ToastProvider>
  )
}
