import { useState, useEffect, useCallback } from 'react'
import { StatsCards } from './StatsCards'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, TrendingUp } from 'lucide-react'
import { blink } from '@/blink/client'
import { DashboardStats, Lead, Deal } from '@/types'

interface DashboardProps {
  user: any
  onTabChange: (tab: string) => void
}

export function Dashboard({ user, onTabChange }: DashboardProps) {
  const [stats, setStats] = useState<DashboardStats>({
    totalReferrals: 0,
    activeProjects: 0,
    estimatedMonthlyResiduals: 0,
    potentialNewMonthlyResiduals: 0,
    closedWon: 0,
    closedLost: 0,
    conversionRate: 0
  })
  const [recentLeads, setRecentLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  const loadDashboardData = useCallback(async () => {
    try {
      // Load leads
      const leads = await blink.db.leads.list({
        where: { userId: user.id },
        orderBy: { submittedAt: 'desc' },
        limit: 5
      })

      // Load deals
      const deals = await blink.db.deals.list({
        where: { userId: user.id }
      })

      // Calculate stats
      const totalReferrals = leads.length
      const activeProjects = leads.filter(lead => 
        ['submitted', 'contacted', 'qualified', 'proposal_sent'].includes(lead.status)
      ).length
      
      const closedWon = deals.filter(deal => deal.stage === 'closed_won').length
      const closedLost = deals.filter(deal => deal.stage === 'closed_lost').length
      const totalClosed = closedWon + closedLost
      const conversionRate = totalClosed > 0 ? (closedWon / totalClosed) * 100 : 0

      const estimatedMonthlyResiduals = deals
        .filter(deal => deal.stage === 'closed_won')
        .reduce((sum, deal) => sum + (deal.commissionAmount || 0), 0)

      const potentialNewMonthlyResiduals = leads
        .filter(lead => ['submitted', 'contacted', 'qualified', 'proposal_sent'].includes(lead.status))
        .reduce((sum, lead) => sum + (lead.potentialMonthlyRevenue || 0), 0)

      setStats({
        totalReferrals,
        activeProjects,
        estimatedMonthlyResiduals,
        potentialNewMonthlyResiduals,
        closedWon,
        closedLost,
        conversionRate
      })

      setRecentLeads(leads)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }, [user?.id])

  useEffect(() => {
    if (user?.id) {
      loadDashboardData()
    }
  }, [user?.id, loadDashboardData])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your referral performance overview.</p>
        </div>
        <Button onClick={() => onTabChange('leads')} className="gradient-bg">
          <Plus className="h-4 w-4 mr-2" />
          Submit New Lead
        </Button>
      </div>

      <StatsCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Leads
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentLeads.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No leads submitted yet</p>
                <Button onClick={() => onTabChange('leads')} variant="outline">
                  Submit Your First Lead
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {recentLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{lead.businessName}</p>
                      <p className="text-sm text-gray-500">{lead.contactName}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        lead.status === 'closed_won' ? 'bg-green-100 text-green-800' :
                        lead.status === 'closed_lost' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {lead.status.replace('_', ' ').toUpperCase()}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">
                        ${lead.potentialMonthlyRevenue?.toLocaleString() || 0}/mo
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => onTabChange('leads')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Submit New Lead
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => onTabChange('pipeline')}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              View Deal Pipeline
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => onTabChange('revenue')}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Track Revenue
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}