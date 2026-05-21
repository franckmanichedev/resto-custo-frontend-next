import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { SubmitHandler } from 'react-hook-form'
import { loginSchema, type LoginInput } from '@/features/auth/schemas/authSchemas'
import { AuthInput } from '@/components/auth/AuthInput'
import { AuthPasswordInput } from '@/components/auth/AuthPasswordInput'
import { AuthButton } from '@/components/auth/AuthButton'
import { AuthAlert } from '@/components/auth/AuthAlert'
import { login, getAuthErrorMessage } from '@/features/auth/api'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

export function LoginForm() {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [rememberMe, setRememberMe] = useState(true)
  const { register, handleSubmit, formState } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) })

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    setErrorMessage(null)

    try {
      await login(data, rememberMe)
      toast.success('Connexion réussie')
      navigate('/platform')
    } catch (err: unknown) {
      console.error(err)
      const message = getAuthErrorMessage(err)
      setErrorMessage(message)
      toast.error(message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {errorMessage && <AuthAlert type="error" title="Impossible de se connecter" message={errorMessage} />}

      <AuthInput
        id="email"
        type="email"
        label="Email"
        placeholder="franck@gmail.com"
        {...register('email')}
        error={formState.errors.email?.message}
      />

      <AuthPasswordInput
        id="password"
        label="Mot de passe"
        placeholder="••••••••"
        {...register('password')}
        error={formState.errors.password?.message}
      />

      <div className="flex items-center justify-between gap-4 text-sm">
        <label className="inline-flex items-center gap-2 text-muted-foreground">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe((prev) => !prev)}
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
          />
          Se souvenir de moi
        </label>
      </div>

      <div>
        <AuthButton type="submit" disabled={formState.isSubmitting} isLoading={formState.isSubmitting}>
          {formState.isSubmitting ? 'Connexion...' : 'Se connecter'}
        </AuthButton>
      </div>
    </form>
  )
}
