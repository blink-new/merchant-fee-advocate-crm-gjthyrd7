import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DollarSign, TrendingUp, Calendar, Download, Eye } from 'lucide-react'
import { blink } from '@/blink/client'
import { Deal } from '@/types'

interface RevenueTrackingProps {
  user: any
}

interface RevenueData {
  month: string
  totalRevenue: number
  commissionEarned: number
  dealsWon: number
  averageDealSize: number
}

export function RevenueTracking({ user }: RevenueTrackingProps) {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const [timeframe, setTimeframe] = useState('12') // months
  const [revenueData, setRevenueData] = useState<RevenueData[]>([])

  const loadRevenueData = useCallback(async () => {
    try {
      // Load all deals for the user
      const userDeals = await blink.db.deals.list({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' }
      })
      setDeals(userDeals)

      // Process revenue data by month
      const monthlyData: { [key: string]: RevenueData } = {}
      const months = parseInt(timeframe)
      
      // Initialize last N months
      for (let i = 0; i < months; i++) {
        const date = new Date()
        date.setMonth(date.getMonth() - i)
        const monthKey = date.toISOString().slice(0, 7) // YYYY-MM format
        const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        
        monthlyData[monthKey] = {
          month: monthName,
          totalRevenue: 0,
          commissionEarned: 0,
          dealsWon: 0,
          averageDealSize: 0
        }
      }

      // Process deals
      userDeals.forEach(deal => {
        if (deal.stage === 'closed_won' && deal.createdAt) {
          const dealDate = new Date(deal.createdAt)
          const monthKey = dealDate.toISOString().slice(0, 7)
          
          if (monthlyData[monthKey]) {
            monthlyData[monthKey].totalRevenue += deal.value || 0
            monthlyData[monthKey].commissionEarned += deal.commissionAmount || 0
            monthlyData[monthKey].dealsWon += 1
          }
        }
      })

      // Calculate average deal sizes
      Object.keys(monthlyData).forEach(key => {
        const data = monthlyData[key]
        data.averageDealSize = data.dealsWon > 0 ? data.totalRevenue / data.dealsWon : 0
      })

      // Convert to array and sort by month
      const sortedData = Object.values(monthlyData).reverse()
      setRevenueData(sortedData)
    } catch (error) {
      console.error('Error loading revenue data:', error)
    } finally {
      setLoading(false)
    }
  }, [user?.id, timeframe])

  useEffect(() => {
    loadRevenueData()
  }, [loadRevenueData])

  const totalRevenue = deals
    .filter(deal => deal.stage === 'closed_won')
    .reduce((sum, deal) => sum + (deal.value || 0), 0)

  const totalCommission = deals
    .filter(deal => deal.stage === 'closed_won')
    .reduce((sum, deal) => sum + (deal.commissionAmount || 0), 0)

  const monthlyRecurring = deals
    .filter(deal => deal.stage === 'closed_won')
    .reduce((sum, deal) => sum + (deal.commissionAmount || 0), 0)

  const pipelineValue = deals
    .filter(deal => !['closed_won', 'closed_lost'].includes(deal.stage))
    .reduce((sum, deal) => sum + (deal.commissionAmount || 0), 0)

  const currentMonth = revenueData[revenueData.length - 1]
  const previousMonth = revenueData[revenueData.length - 2]
  const monthlyGrowth = previousMonth && previousMonth.commissionEarned > 0
    ? ((currentMonth?.commissionEarned || 0) - previousMonth.commissionEarned) / previousMonth.commissionEarned * 100
    : 0

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
          <h1 className="text-3xl font-bold text-gray-900">Revenue Tracking</h1>
          <p className="text-gray-600">Monitor your commission earnings and revenue performance</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3 Months</SelectItem>
              <SelectItem value="6">6 Months</SelectItem>
              <SelectItem value="12">12 Months</SelectItem>
              <SelectItem value="24">24 Months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue Generated</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">From closed deals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commission Earned</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalCommission.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Your earnings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Recurring</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">${monthlyRecurring.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {monthlyGrowth !== 0 && (
                <span className={monthlyGrowth > 0 ? 'text-green-600' : 'text-red-600'}>
                  {monthlyGrowth > 0 ? '+' : ''}{monthlyGrowth.toFixed(1)}%
                </span>
              )}
              <span className="ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">${pipelineValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Potential commission</p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {revenueData.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No revenue data available yet</p>
                <p className="text-sm">Close some deals to see your revenue trends</p>
              </div>
            ) : (
              <div className="space-y-3">
                {revenueData.map((data, index) => {
                  const maxRevenue = Math.max(...revenueData.map(d => d.commissionEarned))
                  const barWidth = maxRevenue > 0 ? (data.commissionEarned / maxRevenue) * 100 : 0
                  
                  return (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-20 text-sm text-gray-600">{data.month}</div>
                      <div className="flex-1 relative">
                        <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300"
                            style={{ width: `${barWidth}%` }}
                          />
                        </div>
                        <div className="absolute inset-y-0 left-3 flex items-center">
                          <span className="text-sm font-medium text-white">
                            ${data.commissionEarned.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="w-20 text-right">
                        <div className="text-sm font-medium">{data.dealsWon} deals</div>
                        <div className="text-xs text-gray-500">
                          ${data.averageDealSize.toLocaleString()} avg
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Closed Deals */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Closed Deals</CardTitle>
        </CardHeader>
        <CardContent>
          {deals.filter(deal => deal.stage === 'closed_won').length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No closed deals yet</p>
              <p className="text-sm">Your closed deals will appear here</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Business</th>
                    <th className="text-left p-3">Contact</th>
                    <th className="text-left p-3">Deal Value</th>
                    <th className="text-left p-3">Commission Rate</th>
                    <th className="text-left p-3">Commission Earned</th>
                    <th className="text-left p-3">Closed Date</th>
                    <th className="text-left p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {deals
                    .filter(deal => deal.stage === 'closed_won')
                    .slice(0, 10)
                    .map((deal) => (
                      <tr key={deal.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div>
                            <p className="font-medium text-gray-900">{deal.businessName || 'Unnamed Deal'}</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <p className="text-gray-900">{deal.contactName || '-'}</p>
                          <p className="text-sm text-gray-500">{deal.contactEmail || ''}</p>
                        </td>
                        <td className="p-3">
                          <span className="font-medium">${deal.value?.toLocaleString() || 0}</span>
                        </td>
                        <td className="p-3">
                          <span>{deal.commissionRate}%</span>
                        </td>
                        <td className="p-3">
                          <span className="font-medium text-green-600">
                            ${deal.commissionAmount?.toLocaleString() || 0}
                          </span>
                        </td>
                        <td className="p-3">
                          {new Date(deal.updatedAt || deal.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-3">
                          <Badge className="bg-green-100 text-green-800">
                            Closed Won
                          </Badge>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}