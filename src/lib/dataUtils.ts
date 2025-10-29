import syntheticData from '../data/syntheticData.json'

// Interfaces

export interface UsageData {
  date: string
  requests: number
  errors: number
  latency: number
}

export interface DailyUsageData {
  date: string
  requests: number
  status_codes: {
    [key: string]: number
  }
  api_keys: {
    [key: string]: number
  }
}

export interface ApiKeyInfo {
  id: string
  name: string
  created: string
  lastUsed: string
  status: 'active' | 'revoked'
}

export interface SyntheticDataset {
  dailyUsage: DailyUsageData[]
  apiKeys: ApiKeyInfo[]
}

/**
 * Load synthetic dataset from JSON file
 */
export function loadSyntheticData(): SyntheticDataset {
  return syntheticData as SyntheticDataset
}

/**
 * Convert time filter to number of days (for synthetic data)
 */
export function getDaysFromTimeFilter(filter: string): number {
  switch (filter) {
    case '24h':
      return 1
    case '7d':
      return 7
    case '30d':
      return 20 // Show 20 days for 30d filter
    case '90d':
      return 29 // Show all 29 days for 90d filter
    default:
      return 7
  }
}

/**
 * Get chart data for BarChart component
 */
export function getChartData(
  days?: number
): { date: string; requests: number }[] {
  const data = loadSyntheticData()
  const chartData = data.dailyUsage.map(item => ({
    date: item.date,
    requests: item.requests,
  }))

  if (days) {
    return chartData.slice(-days)
  }

  return chartData
}

/**
 * Get filtered chart data based on time period
 */
export function getFilteredChartData(
  timeFilter: string
): { date: string; requests: number }[] {
  const days = getDaysFromTimeFilter(timeFilter)
  return getChartData(days)
}

/**
 * Get table data from synthetic JSON based on time filter
 * Converts synthetic data format to UsageData format expected by table
 */
export function getSyntheticTableData(timeFilter: string): UsageData[] {
  const days = getDaysFromTimeFilter(timeFilter)
  const data = loadSyntheticData()
  const filteredData = data.dailyUsage.slice(-days)

  return filteredData.map(item => ({
    date: item.date,
    requests: item.requests,
    errors:
      (item.status_codes['400'] || 0) +
      (item.status_codes['401'] || 0) +
      (item.status_codes['500'] || 0),
    latency: Math.round(
      50 + Math.floor(item.requests / 100) * 2 + Math.random() * 20
    ), // Simulate latency based on request volume
  }))
}

/**
 * Calculate stats from synthetic data based on time filter
 */
export function getSyntheticStats(timeFilter: string) {
  const days = getDaysFromTimeFilter(timeFilter)
  const data = loadSyntheticData()
  const filteredData = data.dailyUsage.slice(-days)

  const totalRequests = filteredData.reduce(
    (sum, item) => sum + item.requests,
    0
  )
  const totalErrors = filteredData.reduce((sum, item) => {
    const statusCodes = item.status_codes
    return (
      sum +
      (statusCodes['400'] || 0) +
      (statusCodes['401'] || 0) +
      (statusCodes['500'] || 0)
    )
  }, 0)

  const averageErrorRate =
    filteredData.length > 0
      ? filteredData.reduce((sum, item) => {
          const errors =
            (item.status_codes['400'] || 0) +
            (item.status_codes['401'] || 0) +
            (item.status_codes['500'] || 0)
          return sum + (errors / item.requests) * 100
        }, 0) / filteredData.length
      : 0

  // Calculate average latency (simulate from request volume)
  const averageLatency =
    filteredData.length > 0
      ? Math.round(
          filteredData.reduce((sum, item) => {
            // Simulate latency based on request volume (higher volume = higher latency)
            const baseLatency = 50
            const volumeImpact = Math.floor(item.requests / 100) * 2
            return sum + baseLatency + volumeImpact + Math.random() * 20
          }, 0) / filteredData.length
        )
      : 0

  return {
    totalRequests,
    totalErrors,
    averageErrorRate,
    averageLatency,
  }
}

/**
 * Get status code breakdown for a specific date
 */
export function getStatusCodeBreakdown(
  date: string
): { [key: string]: number } | null {
  const data = loadSyntheticData()
  const dayData = data.dailyUsage.find(item => item.date === date)
  return dayData ? dayData.status_codes : null
}

/**
 * Export usage data to CSV format
 */
export function exportUsageDataToCSV(
  data: UsageData[],
  filename: string
): void {
  const csvContent = [
    ['Date', 'Requests', 'Errors', 'Error Rate', 'Avg Latency'],
    ...data.map(item => [
      item.date,
      item.requests.toString(),
      item.errors.toString(),
      ((item.errors / item.requests) * 100 || 0).toFixed(2) + '%',
      item.latency.toString() + 'ms',
    ]),
  ]
    .map(row => row.join(','))
    .join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

/**
 * Calculate total requests across all synthetic data days
 */
export function getTotalRequests(): number {
  const data = loadSyntheticData()
  return data.dailyUsage.reduce((sum, item) => sum + item.requests, 0)
}

/**
 * Get dashboard metrics derived from synthetic data
 */
export function getDashboardMetrics() {
  const data = loadSyntheticData()
  const today = new Date().toISOString().split('T')[0]

  // Find today's data or use the latest available data
  const todayData =
    data.dailyUsage.find(item => item.date === today) ||
    data.dailyUsage[data.dailyUsage.length - 1]

  // Calculate total API keys
  const totalApiKeys = data.apiKeys.filter(
    key => key.status === 'active'
  ).length

  // Calculate API calls today
  const apiCallsToday = todayData ? todayData.requests : 0

  // Calculate success rate for today
  const successRate = todayData
    ? (
        ((todayData.status_codes['200'] || 0) / todayData.requests) *
        100
      ).toFixed(1)
    : '0.0'

  // Calculate errors today
  const errorsToday = todayData
    ? (todayData.status_codes['400'] || 0) +
      (todayData.status_codes['401'] || 0) +
      (todayData.status_codes['500'] || 0)
    : 0

  return {
    totalApiKeys,
    apiCallsToday,
    successRate: `${successRate}%`,
    errorsToday,
  }
}
