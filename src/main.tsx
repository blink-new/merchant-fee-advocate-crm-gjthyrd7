import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import App from './App'
import { ErrorBoundary } from './components/ErrorBoundary'
import './index.css'

// Global error handler for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  const error = event.reason
  // Handle analytics-related errors gracefully
  if (error?.message?.includes('Failed to send analytics events') ||
      (error?.name === 'BlinkNetworkError' && error?.message?.includes('analytics'))) {
    console.warn('Analytics service temporarily unavailable, continuing normally')
    event.preventDefault() // Prevent the error from being logged as unhandled
    return
  }
  // Let other errors bubble up normally
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Toaster position="top-right" />
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
) 