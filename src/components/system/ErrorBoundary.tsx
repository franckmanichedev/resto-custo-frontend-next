import React, { Component, type ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { hasError: boolean; error?: Error | null }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: unknown) {
    // In dev we might log stack traces; production logging omitted for brevity
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught', error, info)
  }

  reset() {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Quelque chose s'est mal passé</h2>
            <p className="text-sm text-muted-foreground mb-4">Veuillez réessayer ou contactez le support si le problème persiste.</p>
            <div className="flex gap-2">
              <button onClick={this.reset} className="btn">Réessayer</button>
              <button onClick={() => window.location.reload()} className="btn">Reload</button>
            </div>
            {import.meta.env.NODE_ENV === 'development' && this.state.error ? (
              <pre className="mt-4 text-xs text-red-600">{this.state.error.message}</pre>
            ) : null}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
