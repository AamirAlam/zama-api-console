import { Key, Activity, AlertCircle, TrendingUp } from 'lucide-react'
import { StatCard } from '../components/StatCard'
import { getDashboardMetrics } from '../lib/dataUtils'

export function Dashboard() {
  // Get metrics from synthetic data
  const dashboardData = getDashboardMetrics()

  const metrics = [
    {
      title: 'Total API Keys',
      number: dashboardData.totalApiKeys.toString(),
      iconComponent: Key,
    },
    {
      title: 'API Calls Today',
      number: dashboardData.apiCallsToday.toLocaleString(),
      iconComponent: Activity,
    },
    {
      title: 'Success Rate',
      number: dashboardData.successRate,
      iconComponent: TrendingUp,
    },
    {
      title: 'Errors Today',
      number: dashboardData.errorsToday.toString(),
      iconComponent: AlertCircle,
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <div className="flex  justify-between">
          <div>
            <p className="mt-2 text-sm text-gray-600">
              Welcome to your API Console. Here's an overview of your API usage
              and performance.
            </p>
          </div>
          <div></div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {metrics.map(metric => (
          <StatCard key={metric.title} {...metric} />
        ))}
      </div>
    </div>
  )
}
