import { Key, Activity, AlertCircle, TrendingUp } from 'lucide-react'
import { Card } from '../components/Card'

export function Dashboard() {
  // Dummy metric data to display API stats
  const metrics = [
    {
      title: 'Total API Keys',
      value: '12',
      change: '+2 this month',
      changeType: 'positive' as const,
      icon: Key,
    },
    {
      title: 'API Calls Today',
      value: '2,847',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: Activity,
    },
    {
      title: 'Success Rate',
      value: '99.2%',
      change: '+0.3%',
      changeType: 'positive' as const,
      icon: TrendingUp,
    },
    {
      title: 'Errors Today',
      value: '23',
      change: '-4.2%',
      changeType: 'positive' as const,
      icon: AlertCircle,
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Welcome to your API Console. Here's an overview of your API usage and
          performance.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {metrics.map(metric => (
          <Card key={metric.title} {...metric} />
        ))}
      </div>
    </div>
  )
}
