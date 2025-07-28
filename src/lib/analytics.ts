import { blink } from '@/blink/client'

/**
 * Safe analytics wrapper that handles network errors gracefully
 */
export const analytics = {
  /**
   * Log an analytics event with error handling
   */
  log: async (event: string, data?: Record<string, any>) => {
    try {
      if (blink.analytics?.log) {
        await blink.analytics.log(event, data)
      }
    } catch (error: any) {
      // Silently handle analytics errors - they shouldn't break the app
      if (error?.name === 'BlinkNetworkError' || 
          error?.message?.includes('analytics') ||
          error?.message?.includes('Load failed')) {
        console.warn('Analytics temporarily unavailable:', error.message)
      } else {
        // Re-throw non-analytics errors
        throw error
      }
    }
  },

  /**
   * Check if analytics is enabled with error handling
   */
  isEnabled: () => {
    try {
      return blink.analytics?.isEnabled?.() ?? false
    } catch (error) {
      console.warn('Analytics status check failed:', error)
      return false
    }
  },

  /**
   * Enable analytics with error handling
   */
  enable: async () => {
    try {
      if (blink.analytics?.enable) {
        await blink.analytics.enable()
      }
    } catch (error: any) {
      console.warn('Failed to enable analytics:', error.message)
    }
  },

  /**
   * Disable analytics with error handling
   */
  disable: async () => {
    try {
      if (blink.analytics?.disable) {
        await blink.analytics.disable()
      }
    } catch (error: any) {
      console.warn('Failed to disable analytics:', error.message)
    }
  }
}

/**
 * Track page views safely
 */
export const trackPageView = (page: string, data?: Record<string, any>) => {
  analytics.log('page_view', { page, ...data })
}

/**
 * Track user actions safely
 */
export const trackAction = (action: string, data?: Record<string, any>) => {
  analytics.log('user_action', { action, ...data })
}

/**
 * Track business events safely
 */
export const trackBusinessEvent = (event: string, data?: Record<string, any>) => {
  analytics.log('business_event', { event, ...data })
}