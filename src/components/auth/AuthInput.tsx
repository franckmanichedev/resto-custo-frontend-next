import React, { type ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils/cn'

type ErrorMessage = string | { message?: string } | undefined

type AuthInputProps = ComponentPropsWithoutRef<'input'> & {
  error?: ErrorMessage
  label?: string
  helper?: string
  status?: 'default' | 'error' | 'success'
}

const statusClass = {
  default: 'border-border focus:border-primary focus:ring-ring',
  error: 'border-error text-error focus:border-error focus:ring-error/50',
  success: 'border-success text-success focus:border-success focus:ring-success/50'
}

export function AuthInput({ label, error, helper, status = 'default', className, ...props }: AuthInputProps) {
  const message = typeof error === 'string' ? error : error?.message

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={props.id} className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <input
        {...props}
        className={cn(
          'w-full h-[var(--input-height)] rounded-sm border bg-background text-foreground placeholder:text-muted-foreground px-[var(--input-padding-x)] py-[var(--input-padding-y)] text-sm transition duration-200 ease-out focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
          statusClass[status],
          error && status === 'default' ? 'border-error focus:border-error focus:ring-error/50' : '',
          className
        )}
      />
      {message ? <p className="text-xs font-medium text-error">{message}</p> : helper && <p className="text-xs text-muted-foreground">{helper}</p>}
    </div>
  )
}
