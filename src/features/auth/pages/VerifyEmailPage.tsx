import { useSearchParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { resendVerificationEmail, getAuthErrorMessage, applyAction } from '@/features/auth/api'
import { useAuthStatus } from '@/features/auth/hooks/useAuthStatus'
import { ToastProvider } from '@/components/ui/ToastProvider'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { AuthCard } from '@/components/auth/AuthCard'
import { AuthLoadingScreen } from '@/components/auth/AuthLoadingScreen'
import { AuthButton } from '@/components/auth/AuthButton'
import { AuthAlert } from '@/components/auth/AuthAlert'
import { toast } from 'sonner'
import type { ReactElement } from 'react'

export function VerifyEmailPage(): ReactElement {
  const [searchParams] = useSearchParams()
  const mode = searchParams.get('mode')
  const oobCode = searchParams.get('oobCode')
  const navigate = useNavigate()
  const authStatus = useAuthStatus()
  const [status, setStatus] = useState<'loading' | 'verified' | 'expired' | 'pending' | 'sent'>('pending')
  const [actionError, setActionError] = useState<string | null>(null)

  useEffect(() => {
    if (mode === 'verifyEmail' && oobCode) {
      setStatus('loading')
      applyAction(oobCode)
        .then(() => {
          setStatus('verified')
          toast.success('Email vérifié avec succès')
          setTimeout(() => navigate('/'), 2000)
        })
        .catch((err: unknown) => {
          console.error(err)
          setActionError(getAuthErrorMessage(err))
          setStatus('expired')
        })
    }
  }, [mode, oobCode, navigate])

  const handleResend = async () => {
    if (!authStatus.state.user) {
      return
    }

    setStatus('loading')
    setActionError(null)

    try {
      await resendVerificationEmail(authStatus.state.user)
      setStatus('sent')
      toast.success('Email de vérification renvoyé')
    } catch (err: unknown) {
      console.error(err)
      setActionError(getAuthErrorMessage(err))
      setStatus('expired')
    }
  }

  if (status === 'loading') {
    return (
      <ToastProvider>
        <AuthLoadingScreen message="Vérification de votre email..." />
      </ToastProvider>
    )
  }

  return (
    <ToastProvider>
      <AuthLayout>
        <AuthCard className="max-w-md text-center">
          <div className="space-y-4">
            {status === 'verified' && (
              <>
                <div className="text-5xl">✓</div>
                <div>
                  <h1 className="text-2xl font-semibold text-foreground">Email vérifié!</h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Votre email a été vérifié avec succès. Redirection en cours...
                  </p>
                </div>
              </>
            )}

            {status === 'expired' && (
              <>
                <div className="text-5xl">✕</div>
                <div>
                  <h1 className="text-2xl font-semibold text-foreground">Lien invalide ou expiré</h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Le lien de vérification a expiré ou est invalide. Vous pouvez renvoyer un nouvel email depuis votre compte.
                  </p>
                </div>
                {actionError && <AuthAlert type="error" title="Erreur" message={actionError} />}
                <AuthButton variant="outline" onClick={() => navigate('/auth/login')}>
                  Retour à la connexion
                </AuthButton>
              </>
            )}

            {status === 'pending' && (
              <>
                <div className="text-5xl">✉️</div>
                <div>
                  <h1 className="text-2xl font-semibold text-foreground">Vérifiez votre email</h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Un lien de vérification a été envoyé à votre adresse email. Cliquez sur le lien pour confirmer votre compte.
                  </p>
                </div>
                <div className="rounded-lg bg-muted/50 p-4 text-left space-y-2">
                  <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground font-semibold">Conseil</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>✓ Vérifiez le dossier spam</li>
                    <li>✓ Cliquez sur le lien dans l'email</li>
                    <li>✓ Attendez la redirection</li>
                  </ul>
                </div>
                {authStatus.state.status === 'email-unverified' && authStatus.state.user ? (
                  <AuthButton variant="outline" onClick={handleResend}>
                    Renvoyer l'email de vérification
                  </AuthButton>
                ) : (
                  <AuthButton variant="outline" onClick={() => navigate('/auth/login')}>
                    Retour à la connexion
                  </AuthButton>
                )}
              </>
            )}

            {status === 'sent' && (
              <>
                <div className="text-5xl">📨</div>
                <div>
                  <h1 className="text-2xl font-semibold text-foreground">Email renvoyé</h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Un nouvel email de vérification a été envoyé. Vérifiez votre boîte de réception et le dossier spam.
                  </p>
                </div>
                <AuthButton variant="outline" onClick={() => navigate('/auth/login')}>
                  Retour à la connexion
                </AuthButton>
              </>
            )}
          </div>
        </AuthCard>
      </AuthLayout>
    </ToastProvider>
  )
}
