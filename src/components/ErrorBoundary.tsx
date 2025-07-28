import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    // Check if this is an analytics-related error
    if (error.message?.includes('Failed to send analytics events') ||
        (error.name === 'BlinkNetworkError' && error.message?.includes('analytics'))) {
      // Don't treat analytics errors as app-breaking
      console.warn('Analytics service temporarily unavailable:', error.message)
      return { hasError: false }
    }
    
    // For other errors, show error boundary
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log non-analytics errors
    if (!error.message?.includes('Failed to send analytics events') &&
        !(error.name === 'BlinkNetworkError' && error.message?.includes('analytics'))) {
      console.error('Uncaught error:', error, errorInfo)
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-6">
              We're sorry, but something unexpected happened. Please refresh the page to try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}