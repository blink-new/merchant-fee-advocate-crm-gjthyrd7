import { useState, useEffect } from 'react'
import { Header } from './components/layout/Header'
import { Sidebar } from './components/layout/Sidebar'
import { Footer } from './components/layout/Footer'
import { Dashboard } from './components/dashboard/Dashboard'
import { AdminDashboard } from './components/admin/AdminDashboard'
import { HomePage } from './components/HomePage'
import { LandingPage } from './components/funnel/LandingPage'
import { CheckoutPage } from './components/funnel/CheckoutPage'
import { DocumentSigning } from './components/funnel/DocumentSigning'
import { LoginPage } from './components/auth/LoginPage'
import { AdminLogin } from './components/auth/AdminLogin'
import { Forum } from './components/forum/Forum'
import { LeadManagement } from './components/leads/LeadManagement'
import { DealPipeline } from './components/pipeline/DealPipeline'
import { RevenueTracking } from './components/revenue/RevenueTracking'
import { AgentProfile } from './components/profile/AgentProfile'
import { TermsConditions } from './components/legal/TermsConditions'
import { PrivacyPolicy } from './components/legal/PrivacyPolicy'
import { CookiePolicy } from './components/legal/CookiePolicy'
import { DMCAPolicy } from './components/legal/DMCAPolicy'
import { AcceptableUsePolicy } from './components/legal/AcceptableUsePolicy'
import { DataProcessingAgreement } from './components/legal/DataProcessingAgreement'
import { TrainingPage } from './components/training/TrainingPage'
import { blink } from './blink/client'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [funnelStep, setFunnelStep] = useState<'home' | 'landing' | 'checkout' | 'documents' | 'complete' | 'login' | 'admin-login'>('home')
  const [purchaseEmail, setPurchaseEmail] = useState('')

  useEffect(() => {
    // Check for admin user in localStorage first
    const storedUser = localStorage.getItem('currentUser')
    const isAdminSession = localStorage.getItem('isAdminSession')
    
    if (storedUser && isAdminSession) {
      try {
        const user = JSON.parse(storedUser)
        // Verify it's actually an admin user
        if (user.email === 'admin@merchantfeeadvocate.com' && user.role === 'admin') {
          setUser(user)
          setLoading(false)
          return
        } else {
          // Clear invalid admin session
          localStorage.removeItem('currentUser')
          localStorage.removeItem('isAdminSession')
        }
      } catch (error) {
        localStorage.removeItem('currentUser')
        localStorage.removeItem('isAdminSession')
      }
    }

    // Then check Blink auth for regular users
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      if (!localStorage.getItem('isAdminSession')) {
        setUser(state.user)
        // Don't show loading for public pages when authRequired is false
        setLoading(false)
      }
    })
    
    // Set loading to false immediately for public access
    setLoading(false)
    
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Show funnel for non-authenticated users
  if (!user) {
    if (funnelStep === 'home') {
      // Show business homepage by default
      return (
        <HomePage 
          onBecomePartner={() => setFunnelStep('landing')}
          onAgentLogin={() => setFunnelStep('login')}
        />
      )
    }
    
    if (funnelStep === 'landing') {
      return (
        <LandingPage 
          onGetStarted={() => setFunnelStep('checkout')}
          onSignIn={() => setFunnelStep('login')}
        />
      )
    }
    
    if (funnelStep === 'old-home') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          {/* Header */}
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <img 
                    src="https://merchantfeeadvocate.com/wp-content/uploads/2025/01/MFA-Logo-Arrow.png" 
                    alt="Merchant Fee Advocate" 
                    className="h-10 w-auto"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => setFunnelStep('login')}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Agent Login
                  </button>
                  <button 
                    onClick={() => setFunnelStep('checkout')}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md hover:from-blue-700 hover:to-indigo-700"
                  >
                    Become a Partner
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Hero Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Transform Your Connections Into
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Lifelong Residual Income
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Join our exclusive referral partner program and earn ongoing commissions by connecting businesses 
                with our payment processing services. Build your financial independence through our proven system.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => setFunnelStep('checkout')}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg rounded-lg hover:from-blue-700 hover:to-indigo-700"
                >
                  Start Earning Today →
                </button>
                <button 
                  onClick={() => setFunnelStep('login')}
                  className="px-8 py-4 border border-gray-300 text-gray-700 text-lg rounded-lg hover:bg-gray-50"
                >
                  Agent Portal Login
                </button>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Everything You Need to Succeed
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Our comprehensive platform provides all the tools and support you need to build a successful referral business.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Partner Network</h3>
                  <p className="text-gray-600">Join our growing network of successful referral partners earning residual income.</p>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Deal Pipeline</h3>
                  <p className="text-gray-600">Track your referrals through our comprehensive pipeline management system.</p>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Revenue Tracking</h3>
                  <p className="text-gray-600">Monitor your earnings and commission payments in real-time.</p>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
                  <p className="text-gray-600">Enterprise-grade security protecting your data and transactions.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                  <img 
                    src="https://merchantfeeadvocate.com/wp-content/uploads/2025/01/MFA-Logo-Arrow.png" 
                    alt="Merchant Fee Advocate" 
                    className="h-10 w-auto mb-4 filter brightness-0 invert"
                  />
                  <p className="text-gray-400 mb-4">
                    Empowering businesses and partners through innovative payment processing solutions 
                    and residual income opportunities.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors">Partner Program</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Agent Portal</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Training</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Contact</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li>Email: support@merchantfeeadvocate.com</li>
                    <li>Phone: (555) 123-4567</li>
                    <li>Hours: Mon-Fri 9AM-6PM EST</li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2025 Merchant Fee Advocate. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      )
    }
    
    if (funnelStep === 'login') {
      return (
        <LoginPage 
          onBackToFunnel={() => setFunnelStep('landing')}
          onAdminLogin={() => setFunnelStep('admin-login')}
        />
      )
    }
    
    if (funnelStep === 'admin-login') {
      return (
        <AdminLogin 
          onLoginSuccess={(adminUser) => {
            setUser(adminUser)
            setFunnelStep('home')
          }}
          onBackToFunnel={() => setFunnelStep('login')}
        />
      )
    }
    
    if (funnelStep === 'checkout') {
      return (
        <CheckoutPage 
          onPurchaseComplete={(email) => {
            setPurchaseEmail(email)
            setFunnelStep('documents')
          }}
          onBack={() => setFunnelStep('home')}
        />
      )
    }
    
    if (funnelStep === 'documents') {
      return (
        <DocumentSigning 
          userEmail={purchaseEmail}
          onComplete={() => setFunnelStep('complete')}
        />
      )
    }
    
    if (funnelStep === 'complete') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to the Team!</h1>
            <p className="text-gray-600 mb-6">
              Your enrollment is complete! You now have access to the partner portal and training materials.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Please sign in with your email ({purchaseEmail}) to access your dashboard.
            </p>
            <button 
              onClick={() => setFunnelStep('login')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Sign In to Portal
            </button>
          </div>
        </div>
      )
    }
  }

  const renderContent = () => {
    // Show admin dashboard for admin users on admin-related tabs
    if (user?.email === 'admin@merchantfeeadvocate.com' && ['dashboard', 'partners', 'revenue', 'settings'].includes(activeTab)) {
      return <AdminDashboard user={user} activeTab={activeTab} />
    }
    
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard user={user} onTabChange={setActiveTab} />
      case 'leads':
        return <LeadManagement user={user} />
      case 'pipeline':
        return <DealPipeline user={user} />
      case 'revenue':
        return <RevenueTracking user={user} />
      case 'training':
        return <TrainingPage />
      case 'forum':
        return <Forum user={user} />
      case 'profile':
        return <AgentProfile user={user} />
      case 'settings':
        return <div className="p-6">Settings - Coming Soon</div>
      case 'terms':
        return <TermsConditions />
      case 'privacy':
        return <PrivacyPolicy />
      case 'cookies':
        return <CookiePolicy />
      case 'dmca':
        return <DMCAPolicy />
      case 'acceptable-use':
        return <AcceptableUsePolicy />
      case 'data-processing':
        return <DataProcessingAgreement />
      default:
        return <Dashboard user={user} onTabChange={setActiveTab} />
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex flex-1">
        <Sidebar 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          user={user}
        />
        
        <div className="flex-1 flex flex-col">
          <Header 
            user={user}
            onMenuClick={() => setSidebarOpen(true)}
            onNavigate={setActiveTab}
          />
          
          <main className="flex-1 overflow-y-auto">
            {/* Check if we're showing a legal page to remove padding */}
            {['terms', 'privacy', 'cookies', 'dmca', 'acceptable-use', 'data-processing'].includes(activeTab) ? (
              renderContent()
            ) : (
              <div className="p-6">
                {renderContent()}
              </div>
            )}
          </main>
        </div>
      </div>
      
      <Footer onNavigate={setActiveTab} />
    </div>
  )
}

export default App