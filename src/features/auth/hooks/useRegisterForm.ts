import { useState, useCallback } from 'react'

export function useRegisterForm() {
  const [step, setStep] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const clearError = useCallback(() => setError(null), [])

  const nextStep = useCallback(() => {
    clearError()
    setStep((prev) => prev + 1)
  }, [clearError])

  const prevStep = useCallback(() => {
    clearError()
    setStep((prev) => Math.max(0, prev - 1))
  }, [clearError])

  const setErrorMessage = useCallback((message: string) => {
    setError(message)
  }, [])

  return {
    step,
    error,
    isSubmitting,
    setStep,
    setError: setErrorMessage,
    clearError,
    nextStep,
    prevStep,
    setIsSubmitting
  }
}
