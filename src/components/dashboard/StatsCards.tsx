import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown, DollarSign, FileText, Target, Award } from 'lucide-react'
import { DashboardStats } from '@/types'

interface StatsCardsProps {
  stats: DashboardStats
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'Total Referrals',
      value: stats.totalReferrals,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Projects',
      value: stats.activeProjects,
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Estimated Monthly Residuals',
      value: `$${stats.estimatedMonthlyResiduals.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Potential New Monthly Residuals',
      value: `$${stats.potentialNewMonthlyResiduals.toLocaleString()}`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Closed Won',
      value: stats.closedWon,
      icon: Award,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'Conversion Rate',
      value: `${stats.conversionRate.toFixed(1)}%`,
      icon: stats.conversionRate >= 20 ? TrendingUp : TrendingDown,
      color: stats.conversionRate >= 20 ? 'text-green-600' : 'text-red-600',
      bgColor: stats.conversionRate >= 20 ? 'bg-green-50' : 'bg-red-50'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${card.bgColor}`}>
                <Icon className={`h-5 w-5 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {card.value}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}