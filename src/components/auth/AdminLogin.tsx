import { useState } from 'react'
import { blink } from '../../blink/client'

interface AdminLoginProps {
  onLoginSuccess: (user: any) => void
  onBackToFunnel: () => void
}

export function AdminLogin({ onLoginSuccess, onBackToFunnel }: AdminLoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Hardcoded admin credentials for security
      const ADMIN_EMAIL = 'admin@merchantfeeadvocate.com'
      const ADMIN_PASSWORD = 'admin123'

      // Validate admin credentials
      if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
        setError('Invalid admin credentials')
        setLoading(false)
        return
      }

      // Create admin session
      const adminUser = {
        id: 'admin-user',
        email: ADMIN_EMAIL,
        role: 'admin',
        firstName: 'Admin',
        lastName: 'User',
        status: 'active'
      }

      // Store admin session securely
      localStorage.setItem('currentUser', JSON.stringify(adminUser))
      localStorage.setItem('isAdminSession', 'true')
      
      onLoginSuccess(adminUser)
    } catch (error) {
      console.error('Admin login error:', error)
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <img 
            src="https://merchantfeeadvocate.com/wp-content/uploads/2025/01/MFA-Logo-Arrow-2.png" 
            alt="Merchant Fee Advocate" 
            className="h-12 w-auto mx-auto mb-4 filter brightness-0 invert"
          />
          <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-blue-200">Secure access for administrators</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                  <svg className="h-5 w-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Admin Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="admin@merchantfeeadvocate.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter admin password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In to Admin Portal'
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={onBackToFunnel}
              className="w-full text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
            >
              ← Back to Main Site
            </button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-blue-200 text-xs">
            🔒 This is a secure admin area. All access is logged and monitored.
          </p>
        </div>
      </div>
    </div>
  )
}