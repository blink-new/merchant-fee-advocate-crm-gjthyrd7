import { useState, useEffect } from 'react'
import { PartnerManagement } from './PartnerManagement'
import { blink } from '../../blink/client'

interface AdminDashboardProps {
  user: any
  activeTab?: string
}

export function AdminDashboard({ user, activeTab: propActiveTab }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState(propActiveTab === 'partners' ? 'partners' : 'overview')
  const [partners, setPartners] = useState<any[]>([])
  const [purchases, setPurchases] = useState<any[]>([])
  const [signatures, setSignatures] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalPartners: 0,
    activePartners: 0,
    pendingPartners: 0,
    totalRevenue: 0,
    completedPurchases: 0
  })
  const [loading, setLoading] = useState(true)

  const loadAdminData = async () => {
    try {
      // Load all partners
      const allPartners = await blink.db.users.list({
        where: { role: 'partner' },
        orderBy: { createdAt: 'desc' }
      })
      setPartners(allPartners)

      // Load all purchases
      const allPurchases = await blink.db.purchases.list({
        orderBy: { createdAt: 'desc' }
      })
      setPurchases(allPurchases)

      // Load all signatures
      const allSignatures = await blink.db.documentSignatures.list({
        orderBy: { createdAt: 'desc' }
      })
      setSignatures(allSignatures)

      // Calculate stats
      const totalPartners = allPartners.length
      const activePartners = allPartners.filter(p => p.status === 'active').length
      const pendingPartners = allPartners.filter(p => p.status === 'pending').length
      const completedPurchases = allPurchases.filter(p => p.status === 'completed').length
      const totalRevenue = allPurchases
        .filter(p => p.status === 'completed')
        .reduce((sum, p) => sum + (p.amount || 0), 0)

      setStats({
        totalPartners,
        activePartners,
        pendingPartners,
        totalRevenue,
        completedPurchases
      })
    } catch (error) {
      console.error('Error loading admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user?.email === 'admin@merchantfeeadvocate.com') {
      loadAdminData()
    }
  }, [user])

  useEffect(() => {
    if (propActiveTab === 'partners') {
      setActiveTab('partners')
    } else if (propActiveTab === 'dashboard') {
      setActiveTab('overview')
    }
  }, [propActiveTab])

  const updatePartnerStatus = async (partnerId: string, newStatus: string) => {
    try {
      await blink.db.users.update(partnerId, {
        status: newStatus,
        updatedAt: new Date().toISOString()
      })
      loadAdminData() // Refresh data
    } catch (error) {
      console.error('Error updating partner status:', error)
    }
  }

  if (user?.email !== 'admin@merchantfeeadvocate.com') {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
        <p className="text-gray-600">You do not have admin privileges.</p>
      </div>
    )
  }

  if (loading && activeTab === 'overview') {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'partners':
        return <PartnerManagement user={user} />
      case 'overview':
      default:
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Partners</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalPartners}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Partners</p>
                    <p className="text-2xl font-bold text-green-600">{stats.activePartners}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending Partners</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.pendingPartners}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-purple-600">${stats.totalRevenue.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Purchases</p>
                    <p className="text-2xl font-bold text-indigo-600">{stats.completedPurchases}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Purchases */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Purchases</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {purchases.slice(0, 10).map((purchase) => (
                      <tr key={purchase.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{purchase.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${purchase.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            purchase.status === 'completed' 
                              ? 'bg-green-100 text-green-800'
                              : purchase.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {purchase.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(purchase.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {purchases.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No purchases yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage partners, track revenue, and monitor system activity</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <svg className="w-2 h-2 mr-1" fill="currentColor" viewBox="0 0 8 8">
              <circle cx={4} cy={4} r={3} />
            </svg>
            Admin Access
          </span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('partners')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'partners'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Manage Partners
          </button>
        </nav>
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  )
}