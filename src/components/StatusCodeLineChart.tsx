import { getFilteredChartData, getStatusCodeBreakdown } from '../lib/dataUtils'
import { useFeatureFlags } from '../contexts/FeatureFlagsContext'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

interface StatusCodeChartData {
  date: string
  displayDate: string
  fullDate: string
  '200': number
  '400': number
  '401': number
  '500': number
}

interface TooltipPayload {
  payload: StatusCodeChartData
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayload[]
}

interface StatusCodeLineChartProps {
  title?: string
  timeFilter?: string
}

export function StatusCodeLineChart({
  title = 'Status Codes Over Time',
  timeFilter = '7d',
}: StatusCodeLineChartProps) {
  const { flags } = useFeatureFlags()

  // Color schemes
  const defaultColors = {
    '200': '#10b981', // green
    '400': '#f59e0b', // yellow
    '401': '#f97316', // orange
    '500': '#ef4444', // red
  }

  const modernColors = {
    '200': '#06d6a0', // modern teal
    '400': '#ffd166', // modern yellow
    '401': '#f25c54', // modern coral
    '500': '#4d194d', // modern purple
  }

  const colors = flags.modernColors ? modernColors : defaultColors

  // Get chart data and enhance with status code breakdown
  const baseChartData = getFilteredChartData(timeFilter)

  const chartData: StatusCodeChartData[] = baseChartData.map(item => {
    const statusCodes = getStatusCodeBreakdown(item.date) || {}
    return {
      date: item.date,
      displayDate: item.date.split('-').slice(1).join('/'),
      fullDate: item.date,
      '200': statusCodes['200'] || 0,
      '400': statusCodes['400'] || 0,
      '401': statusCodes['401'] || 0,
      '500': statusCodes['500'] || 0,
    }
  })

  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length > 0) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{`Date: ${data.fullDate}`}</p>
          <div className="space-y-1 text-sm">
            <p className="text-green-600">
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              Success (200): {data['200'].toLocaleString()}
            </p>
            <p className="text-yellow-600">
              <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
              Bad Request (400): {data['400'].toLocaleString()}
            </p>
            <p className="text-orange-600">
              <span className="inline-block w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
              Unauthorized (401): {data['401'].toLocaleString()}
            </p>
            <p className="text-red-600">
              <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
              Server Error (500): {data['500'].toLocaleString()}
            </p>
          </div>
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
          <LineChart
            data={chartData}
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
            <Legend />
            <Line
              type="monotone"
              dataKey="200"
              stroke={colors['200']}
              strokeWidth={2}
              dot={{ fill: colors['200'], strokeWidth: 2, r: 4 }}
              name="Success (200)"
            />
            <Line
              type="monotone"
              dataKey="400"
              stroke={colors['400']}
              strokeWidth={2}
              dot={{ fill: colors['400'], strokeWidth: 2, r: 4 }}
              name="Bad Request (400)"
            />
            <Line
              type="monotone"
              dataKey="401"
              stroke={colors['401']}
              strokeWidth={2}
              dot={{ fill: colors['401'], strokeWidth: 2, r: 4 }}
              name="Unauthorized (401)"
            />
            <Line
              type="monotone"
              dataKey="500"
              stroke={colors['500']}
              strokeWidth={2}
              dot={{ fill: colors['500'], strokeWidth: 2, r: 4 }}
              name="Server Error (500)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
