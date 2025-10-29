import { useState } from 'react'
import { Button } from '../components/ui/button'
import { StatCard } from '../components/StatCard'
import { BarChart } from '../components/BarChart'
import { StatusCodeLineChart } from '../components/StatusCodeLineChart'
import { UsageDetailsTable } from '../components/UsageDetailsTable'
import { useFeatureFlags } from '../contexts/FeatureFlagsContext'
import { Calendar, Download, AlertCircle, TrendingUp } from 'lucide-react'
import {
  exportUsageDataToCSV,
  getSyntheticStats,
  getSyntheticTableData,
} from '../lib/dataUtils'

export function Usage() {
  const [timeFilter, setTimeFilter] = useState('7d')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const { flags } = useFeatureFlags()

  const usageData = getSyntheticTableData(timeFilter)
  const syntheticStats = getSyntheticStats(timeFilter)

  const handleFilterChange = (newFilter: string) => {
    setLoading(true)
    setTimeFilter(newFilter)

    // Simulate delay to demonstrate loading state
    setTimeout(() => {
      setLoading(false)
      setError(Math.random() < 0.1)
    }, 1000)
  }

  const exportData = () => {
    exportUsageDataToCSV(usageData, `usage-data-${timeFilter}.csv`)
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex  justify-between">
          <div>
            <p className="mt-2 text-sm text-gray-600">
              Monitor your API usage, performance metrics, and error rates.
            </p>
          </div>
          <Button onClick={exportData} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Calendar className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">
              Time Period:
            </span>
            <div className="flex gap-2">
              {[
                { value: '24h', label: 'Last 24 hours' },
                { value: '7d', label: 'Last 7 days' },
                { value: '30d', label: 'Last 30 days' },
                { value: '90d', label: 'Last 90 days' },
              ].map(option => (
                <Button
                  key={option.value}
                  variant={timeFilter === option.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {flags.chartV2 && (
            <div className="flex items-center gap-2">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                Chart v2 Active
              </span>
            </div>
          )}
        </div>
      </div>

      <div
        className={`grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8 ${flags.compactLayout ? 'gap-3 mb-6' : ''}`}
      >
        <StatCard
          title="Total Requests"
          iconComponent={TrendingUp}
          number={syntheticStats.totalRequests}
        />

        <StatCard
          title="Total Errors"
          iconComponent={AlertCircle}
          number={syntheticStats.totalErrors}
        />

        <StatCard
          title="Avg Error Rate"
          iconComponent={TrendingUp}
          number={`${syntheticStats.averageErrorRate.toFixed(2)}%`}
        />

        <StatCard
          title="Avg Latency"
          iconComponent={TrendingUp}
          number={`${syntheticStats.averageLatency}ms`}
        />
      </div>

      <div className="mb-8">
        {flags.chartV2 ? (
          <StatusCodeLineChart timeFilter={timeFilter} />
        ) : (
          <BarChart
            data={usageData}
            useSyntheticData={true}
            timeFilter={timeFilter}
          />
        )}
      </div>

      <UsageDetailsTable data={usageData} loading={loading} error={error} />
    </div>
  )
}
