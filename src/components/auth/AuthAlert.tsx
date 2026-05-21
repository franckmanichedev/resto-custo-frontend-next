import React, { type ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils/cn'

type AuthAlertProps = ComponentPropsWithoutRef<'div'> & {
  type: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
}

const colors = {
  success: 'bg-success/10 border-success text-success dark:bg-success/20 dark:border-success/60',
  error: 'bg-error/10 border-error text-error dark:bg-error/20 dark:border-error/60',
  warning: 'bg-warning/10 border-warning text-warning dark:bg-warning/20 dark:border-warning/60',
  info: 'bg-info/10 border-info text-info dark:bg-info/20 dark:border-info/60'
}

const icons = {
  success: '✓',
  error: '✕',
  warning: '!',
  info: 'ℹ'
}

export function AuthAlert({ type, title, message, className, ...props }: AuthAlertProps) {
  return (
    <div className={cn('rounded-sm border p-4 flex gap-3', colors[type], className)} {...props}>
      <span className="text-lg font-bold leading-none">{icons[type]}</span>
      <div className="flex-1">
        {title && <p className="font-semibold text-foreground">{title}</p>}
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  )
}
