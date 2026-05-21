import React, { type ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils/cn'
import { Check } from 'lucide-react'

type AuthStepperProps = ComponentPropsWithoutRef<'div'> & {
  steps: string[]
  currentStep: number
}

export function AuthStepper({ steps, currentStep, className, ...props }: AuthStepperProps) {
  return (
    <div className={cn('space-y-4', className)} {...props}>
      <div className="flex items-center gap-3">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div
              className={cn(
                'flex h-[var(--button-height-sm)] w-[var(--button-height-sm)] items-center justify-center rounded-full text-sm font-semibold transition duration-200 ease-out',
                index < currentStep
                  ? 'bg-success text-white ring-2 ring-success'
                  : index === currentStep
                    ? 'bg-brand text-white ring-2 ring-ring'
                    : 'bg-surface text-muted-foreground'
              )}
            >
              {index < currentStep ? <Check className="h-4 w-4" /> : index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className={cn('flex-1 h-0.5 rounded-full', index < currentStep ? 'bg-success' : 'bg-muted/60')} />
            )}
          </React.Fragment>
        ))}
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
          Étape {currentStep + 1} sur {steps.length}
        </p>
        <h3 className="mt-2 text-lg font-semibold text-foreground">{steps[currentStep]}</h3>
      </div>
    </div>
  )
}
