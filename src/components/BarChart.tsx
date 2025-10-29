import { getFilteredChartData, getStatusCodeBreakdown } from '../lib/dataUtils'
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface BarChartData {
  date: string
  requests: number
}

interface FormattedChartData extends BarChartData {
  displayDate: string
  fullDate: string
}

interface TooltipPayload {
  payload: FormattedChartData
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayload[]
}

interface BarChartProps {
  data?: BarChartData[]
  title?: string
  useSyntheticData?: boolean
  timeFilter?: string
}

export function BarChart({
  data,
  title = 'API Requests Over Time',
  useSyntheticData = false,
  timeFilter = '7d',
}: BarChartProps) {
  // Use synthetic data if enabled, otherwise use provided data
  const chartData = useSyntheticData
    ? getFilteredChartData(timeFilter)
    : data || []

  // Format data for recharts
  const formattedData = chartData.map(item => ({
    ...item,
    displayDate: item.date.split('-').slice(1).join('/'),
    fullDate: item.date,
  }))

  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length > 0) {
      const chartData = payload[0].payload
      const statusCodes = useSyntheticData
        ? getStatusCodeBreakdown(chartData.fullDate)
        : null

      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{`Date: ${chartData.fullDate}`}</p>
          <p className="text-blue-600">{`Requests: ${chartData.requests.toLocaleString()}`}</p>
          {statusCodes && (
            <div className="mt-2 text-sm">
              <p className="text-green-600">
                Success: {statusCodes['200'] || 0}
              </p>
              <p className="text-yellow-600">
                Client Errors:{' '}
                {(statusCodes['400'] || 0) + (statusCodes['401'] || 0)}
              </p>
              <p className="text-red-600">
                Server Errors: {statusCodes['500'] || 0}
              </p>
            </div>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={formattedData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 60,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="displayDate"
              angle={-45}
              textAnchor="end"
              height={60}
              fontSize={12}
              stroke="#6b7280"
            />
            <YAxis
              fontSize={12}
              stroke="#6b7280"
              tickFormatter={(value: number) => value.toLocaleString()}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="requests" fill="#3b82f6" />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
