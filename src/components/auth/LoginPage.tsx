import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { blink } from '@/blink/client'

interface LoginPageProps {
  onBackToFunnel: () => void
  onAdminLogin: () => void
}

export function LoginPage({ onBackToFunnel, onAdminLogin }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      // Check if user exists in our database first
      const users = await blink.db.users.list({
        where: { email: email.toLowerCase() }
      })

      if (users.length === 0) {
        setMessage('Email not found. Please complete the enrollment process first.')
        setIsLoading(false)
        return
      }

      const user = users[0]
      if (user.status !== 'active') {
        setMessage('Your account is not active. Please contact support.')
        setIsLoading(false)
        return
      }

      // Use Blink's built-in authentication which will handle the full auth flow
      // This will redirect to Blink's auth page and then back to the app
      blink.auth.login()
    } catch (error) {
      console.error('Login error:', error)
      setMessage('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FIc4nFxpkp1eEscNnZWvYLRYS71K2%2FMFALogoArrow__7eb7fa98.png?alt=media&token=c4b310b7-777d-4f3a-8c82-0c75b6936191" 
              alt="MFA Logo" 
              className="h-12 w-auto mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">The 5 Referral Challenge</h1>
            <p className="text-gray-600">Sign in to your partner portal</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full"
              />
            </div>

            {message && (
              <div className={`p-3 rounded-lg text-sm ${
                message.includes('not found') || message.includes('not active') || message.includes('failed')
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-blue-50 text-blue-700 border border-blue-200'
              }`}>
                {message}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading || !email}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Admin Login */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-500 mb-3">Admin Access</p>
            <Button
              onClick={onAdminLogin}
              variant="outline"
              className="w-full"
              disabled={isLoading}
            >
              Admin Login
            </Button>
          </div>

          {/* Back to Enrollment */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-2">
              Don't have an account?
            </p>
            <Button
              onClick={onBackToFunnel}
              variant="ghost"
              className="text-blue-600 hover:text-blue-700"
            >
              Join The 5 Referral Challenge
            </Button>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Need help? Contact{' '}
            <a href="mailto:support@merchantfeeadvocate.com" className="text-blue-600 hover:underline">
              support@merchantfeeadvocate.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}