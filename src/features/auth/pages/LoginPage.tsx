import { useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { toast } from 'sonner'
import { LoginForm } from '@/features/auth/forms/LoginForm'
import { ToastProvider } from '@/components/ui/ToastProvider'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { AuthCard } from '@/components/auth/AuthCard'
import { AuthDivider } from '@/components/auth/AuthDivider'
import { AuthSocialButton } from '@/components/auth/AuthSocialButton'
import type { ReactElement } from 'react'

export function LoginPage(): ReactElement {
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (searchParams.get('emailVerified') === 'true') {
      toast.success('Votre adresse e-mail a bien été vérifiée. Vous pouvez maintenant vous connecter.')
      const nextParams = new URLSearchParams(searchParams)
      nextParams.delete('emailVerified')
      setSearchParams(nextParams, { replace: true })
    }
  }, [searchParams, setSearchParams])

  return (
    <ToastProvider>
      <AuthLayout showHero>
        <AuthCard title="Connexion" subtitle="Connectez-vous pour accéder à votre espace">
          <LoginForm />

          <AuthDivider />

          <div className="flex justify-between gap-5">
            <AuthSocialButton provider="google" />
            <AuthSocialButton provider="apple" />
          </div>

          <div className="mt-6 text-center space-y-3">
            <Link to="/auth/forgot-password" className="text-sm text-primary hover:underline font-medium">
              Mot de passe oublié?
            </Link>

            <p className="text-center text-sm text-muted-foreground">
              Pas encore de compte ?{' '}
              <Link to="/auth/register" className="font-semibold text-primary hover:underline">
                Créez un compte
              </Link>
            </p>
          </div>
        </AuthCard>
      </AuthLayout>
    </ToastProvider>
  )
}
