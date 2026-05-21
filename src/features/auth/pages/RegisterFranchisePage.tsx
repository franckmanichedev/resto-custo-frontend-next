import React, { useState, type ReactElement } from 'react'
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
import { registerFranchise } from '@/features/auth/api'
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

const companySchema = z.object({
  companyName: z.string().min(2, 'Le nom de l\'entreprise est requis'),
  companyWebsite: z.string().url('URL invalide').optional().or(z.literal('')),
  companyPhone: z.string().min(10, 'Le numéro de téléphone est requis')
})

const scaleSchema = z.object({
  expectedBranches: z.string().min(1, 'Le nombre attendu de succursales est requis'),
  estimatedEmployees: z.string().min(1, 'Le nombre estimé d\'employés est requis')
})

const steps = ['Compte', 'Entreprise', 'Échelle', 'Plan', 'Vérification']

export function RegisterFranchisePage(): ReactElement {
  const navigate = useNavigate()
  const { step, error, isSubmitting, nextStep, prevStep, setError, setIsSubmitting } = useRegisterForm()
  const [selectedPlan, setSelectedPlan] = useState('professional')

  const {
    register: registerAccount,
    handleSubmit: handleAccountSubmit,
    getValues: getAccountValues,
    formState: { errors: accountErrors }
  } = useForm({ resolver: zodResolver(accountSchema) })

  const {
    register: registerCompany,
    handleSubmit: handleCompanySubmit,
    getValues: getCompanyValues,
    formState: { errors: companyErrors }
  } = useForm({ resolver: zodResolver(companySchema) })

  const {
    register: registerScale,
    handleSubmit: handleScaleSubmit,
    getValues: getScaleValues,
    formState: { errors: scaleErrors }
  } = useForm({ resolver: zodResolver(scaleSchema) })

  const handleAccountSubmitClick = handleAccountSubmit(async () => {
    nextStep()
  })

  const handleCompanySubmitClick = handleCompanySubmit(async () => {
    nextStep()
  })

  const handleScaleSubmitClick = handleScaleSubmit(async () => {
    nextStep()
  })

  const handleFinalSubmit = async () => {
    try {
      setIsSubmitting(true)
      const account = getAccountValues()
      const company = getCompanyValues()
      const scale = getScaleValues()
      const expectedBranches = Number.parseInt(String(scale.expectedBranches).split('-')[0].replace('+', ''), 10) || 1

      await registerFranchise({
        fullName: account.fullname,
        email: account.email,
        password: account.password,
        organizationName: company.companyName,
        expectedBranches,
        enterprisePlan: selectedPlan,
        phone: company.companyPhone
      })

      toast.success('Franchise créée avec succès!')
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
            <form onSubmit={handleCompanySubmitClick} className="space-y-4">
              <AuthInput
                label="Nom de l'entreprise"
                placeholder="Ma Franchise"
                {...registerCompany('companyName')}
                error={companyErrors.companyName?.message}
              />
              <AuthInput
                label="Site web (optionnel)"
                type="url"
                placeholder="https://exemple.com"
                {...registerCompany('companyWebsite')}
                error={companyErrors.companyWebsite?.message}
              />
              <AuthInput
                label="Téléphone"
                type="tel"
                placeholder="+33 1 23 45 67 89"
                {...registerCompany('companyPhone')}
                error={companyErrors.companyPhone?.message}
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
            <form onSubmit={handleScaleSubmitClick} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Nombre attendu de succursales</label>
                <select
                  {...registerScale('expectedBranches')}
                  className="w-full mt-2 rounded-xl border border-border bg-transparent px-4 py-2.5 text-on-brand text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option className="text-main" value="">Sélectionnez</option>
                  <option className="text-main" value="1-5">1-5</option>
                  <option className="text-main" value="6-10">6-10</option>
                  <option className="text-main" value="11-25">11-25</option>
                  <option className="text-main" value="26-50">26-50</option>
                  <option className="text-main" value="50+">50+</option>
                </select>
                {scaleErrors.expectedBranches?.message && (
                  <p className="mt-2 text-xs text-red-500">{scaleErrors.expectedBranches.message as string}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Nombre estimé d'employés</label>
                <select
                  {...registerScale('estimatedEmployees')}
                  className="w-full mt-2 rounded-xl border border-border bg-transparent px-4 py-2.5 text-on-brand text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option className="text-main" value="">Sélectionnez</option>
                  <option className="text-main" value="1-10">1-10</option>
                  <option className="text-main" value="11-50">11-50</option>
                  <option className="text-main" value="51-100">51-100</option>
                  <option className="text-main" value="101-250">101-250</option>
                  <option className="text-main" value="250+">250+</option>
                </select>
                {scaleErrors.estimatedEmployees?.message && (
                  <p className="mt-2 text-xs text-red-500">{scaleErrors.estimatedEmployees.message as string}</p>
                )}
              </div>

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
              <div>
                <p className="text-sm font-medium text-foreground mb-3">Sélectionnez votre plan</p>
                <div className="space-y-3">
                  {[
                    { id: 'starter', name: 'Starter', price: '5000FCFA', features: ['1 établissement', 'Support email'] },
                    { id: 'professional', name: 'Professional', price: '15000FCFA', features: ['Succursales illimitées', 'Support prioritaire'] },
                    { id: 'enterprise', name: 'Enterprise', price: 'Devis', features: ['Tout illimité', 'Support 24/7', 'SSO'] }
                  ].map((plan) => (
                    <div key={plan.id} className="rounded-lg border border-border p-4 hover:border-primary cursor-pointer transition">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{plan.name}</h4>
                          <p className="text-sm text-muted-foreground">{plan.price}/mois</p>
                        </div>
                        <input
                          type="radio"
                          name="plan"
                          value={plan.id}
                          checked={selectedPlan === plan.id}
                          onChange={() => setSelectedPlan(plan.id)}
                        />
                      </div>
                      <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                        {plan.features.map((feature) => (
                          <li key={feature}><span className="text-green-700 text-lg font-bold">✓</span> {feature}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <AuthButton type="button" variant="outline" onClick={prevStep}>
                  Précédent
                </AuthButton>
                <AuthButton onClick={nextStep}>Suivant</AuthButton>
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
              <div className="flex gap-3 pt-4">
                <AuthButton onClick={handleFinalSubmit} isLoading={isSubmitting} className="mx-auto w-auto">
                  Continuer
                </AuthButton>
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
