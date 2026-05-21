import React, { type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { AuthCard } from '@/components/auth/AuthCard'
import { AuthInput } from '@/components/auth/AuthInput'
import { AuthPasswordInput } from '@/components/auth/AuthPasswordInput'
import { AuthButton } from '@/components/auth/AuthButton'
import { AuthStepper } from '@/components/auth/AuthStepper'
import { AuthProgress } from '@/components/auth/AuthProgress'
import { useRegisterForm } from '@/features/auth/hooks/useRegisterForm'
import { registerOrganization } from '@/features/auth/api'
import { toast } from 'sonner'

const accountSchema = z.object({
  fullname: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword']
})

const restaurantSchema = z.object({
  organizationName: z.string().min(2, 'Le nom du restaurant est requis'),
  cuisineType: z.string().min(1, 'Le type de cuisine est requis'),
  country: z.string().min(1, 'Le pays est requis'),
  city: z.string().min(1, 'La ville est requise'),
  currency: z.string().min(1, 'La devise est requise')
})

const branchSchema = z.object({
  branchName: z.string().min(2, 'Le nom de la succursale est requis'),
  branchAddress: z.string().min(5, 'L\'adresse est requise'),
  branchPhone: z.string().min(10, 'Le numéro de téléphone est requis')
})

const steps = ['Compte', 'Restaurant', 'Succursale', 'Vérification', 'Email']

export function RegisterIndependentPage(): ReactElement {
  const navigate = useNavigate()
  const { step, error, isSubmitting, nextStep, prevStep, setError, setIsSubmitting } = useRegisterForm()

  const {
    register: registerAccount,
    handleSubmit: handleAccountSubmit,
    getValues: getAccountValues,
    formState: { errors: accountErrors }
  } = useForm({ resolver: zodResolver(accountSchema) })

  const {
    register: registerRestaurant,
    handleSubmit: handleRestaurantSubmit,
    getValues: getRestaurantValues,
    formState: { errors: restaurantErrors }
  } = useForm({ resolver: zodResolver(restaurantSchema) })

  const {
    register: registerBranch,
    handleSubmit: handleBranchSubmit,
    getValues: getBranchValues,
    formState: { errors: branchErrors }
  } = useForm({ resolver: zodResolver(branchSchema) })

  const handleAccountSubmitClick = handleAccountSubmit(async () => {
    try {
      nextStep()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    }
  })

  const handleRestaurantSubmitClick = handleRestaurantSubmit(async () => {
    try {
      nextStep()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    }
  })

  const handleBranchSubmitClick = handleBranchSubmit(async () => {
    try {
      nextStep()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    }
  })

  const handleFinalSubmit = async () => {
    try {
      setIsSubmitting(true)
      const account = getAccountValues()
      const restaurant = getRestaurantValues()
      const branch = getBranchValues()

      await registerOrganization({
        fullName: account.fullname,
        email: account.email,
        password: account.password,
        organizationName: restaurant.organizationName,
        branchName: branch.branchName,
        phone: branch.branchPhone,
        cuisineType: restaurant.cuisineType,
        city: restaurant.city
      })

      toast.success('Compte créé avec succès!')
      navigate('/auth/verify-email')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout showHero>
      <AuthCard className="w-full max-w-lg">
        <AuthStepper steps={steps} currentStep={step} />
        <AuthProgress value={step + 1} max={steps.length} className="mt-6" />

        <div className="mt-8">
          {step === 0 && (
            <form onSubmit={handleAccountSubmitClick} className="space-y-4">
              <AuthInput
                label="Nom complet"
                placeholder="Franck Maniche"
                {...registerAccount('fullname')}
                error={accountErrors.fullname?.message}
              />
              <AuthInput
                label="Email"
                type="email"
                placeholder="franck@gmail.com"
                {...registerAccount('email')}
                error={accountErrors.email?.message}
              />
              <AuthPasswordInput
                label="Mot de passe"
                placeholder="••••••••"
                {...registerAccount('password')}
                error={accountErrors.password?.message}
              />
              <AuthPasswordInput
                label="Confirmer le mot de passe"
                placeholder="••••••••"
                {...registerAccount('confirmPassword')}
                error={accountErrors.confirmPassword?.message}
              />

              <div className="flex gap-3 pt-4">
                <AuthButton type="button" variant="outline" onClick={() => navigate('/auth/register')}>
                  Retour
                </AuthButton>
                <AuthButton type="submit">Suivant</AuthButton>
              </div>
            </form>
          )}

          {step === 1 && (
            <form onSubmit={handleRestaurantSubmitClick} className="space-y-4">
              <AuthInput
                label="Nom du restaurant"
                placeholder="Ma Pizzéria"
                {...registerRestaurant('organizationName')}
                error={restaurantErrors.organizationName?.message}
              />
              <AuthInput
                label="Type de cuisine"
                placeholder="Italienne"
                {...registerRestaurant('cuisineType')}
                error={restaurantErrors.cuisineType?.message}
              />
              <div className="grid grid-cols-2 gap-4">
                <AuthInput
                  label="Pays"
                  placeholder="France"
                  {...registerRestaurant('country')}
                  error={restaurantErrors.country?.message}
                />
                <AuthInput
                  label="Ville"
                  placeholder="Paris"
                  {...registerRestaurant('city')}
                  error={restaurantErrors.city?.message}
                />
              </div>
              <AuthInput
                label="Devise"
                placeholder="EUR"
                {...registerRestaurant('currency')}
                error={restaurantErrors.currency?.message}
              />

              <div className="flex gap-3 pt-4">
                <AuthButton type="button" variant="outline" onClick={prevStep}>
                  Précédent
                </AuthButton>
                <AuthButton type="submit">Suivant</AuthButton>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleBranchSubmitClick} className="space-y-4">
              <AuthInput
                label="Nom de la succursale"
                placeholder="Succursale Centre-Ville"
                {...registerBranch('branchName')}
                error={branchErrors.branchName?.message}
              />
              <AuthInput
                label="Adresse"
                placeholder="123 rue de la Paix, 75000 Paris"
                {...registerBranch('branchAddress')}
                error={branchErrors.branchAddress?.message}
              />
              <AuthInput
                label="Téléphone"
                type="tel"
                placeholder="+33 1 23 45 67 89"
                {...registerBranch('branchPhone')}
                error={branchErrors.branchPhone?.message}
              />

              <div className="flex gap-3 pt-4">
                <AuthButton type="button" variant="outline" onClick={prevStep}>
                  Précédent
                </AuthButton>
                <AuthButton type="submit">Suivant</AuthButton>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="rounded-lg bg-muted/50 p-4 space-y-2">
                <p className="text-sm font-medium text-foreground">Vérifiez vos informations avant de continuer</p>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• Compte créé et email vérifié</p>
                  <p>• Restaurant configuré</p>
                  <p>• Première succursale prête</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <AuthButton type="button" variant="outline" onClick={prevStep}>
                  Précédent
                </AuthButton>
                <AuthButton onClick={handleFinalSubmit} isLoading={isSubmitting}>
                  Créer mon compte
                </AuthButton>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 text-center">
              <div className="text-4xl">✉️</div>
              <div>
                <h3 className="font-semibold text-foreground">Vérifiez votre email</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Un lien de vérification a été envoyé à votre email. Cliquez sur le lien pour confirmer votre compte.
                </p>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-6 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700 dark:bg-red-950 dark:border-red-900 dark:text-red-100">
            {error}
          </div>
        )}
      </AuthCard>
    </AuthLayout>
  )
}
