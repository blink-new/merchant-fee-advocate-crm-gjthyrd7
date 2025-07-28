import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: 'merchant-fee-advocate-crm-gjthyrd7',
  authRequired: false, // Allow public access to landing page
  httpClient: {
    timeout: 10000, // 10 second timeout
    retries: 2 // Retry failed requests twice
  }
})

// Handle analytics errors gracefully
if (typeof window !== 'undefined') {
  // Override console.error to filter out analytics errors
  const originalConsoleError = console.error
  console.error = (...args) => {
    const message = args.join(' ')
    // Filter out analytics-related errors that don't affect functionality
    if (message.includes('Failed to send analytics events') || 
        message.includes('BlinkNetworkError') && message.includes('analytics')) {
      // Log to a less prominent level or ignore
      console.warn('Analytics service temporarily unavailable:', message)
      return
    }
    // Pass through all other errors normally
    originalConsoleError.apply(console, args)
  }
}