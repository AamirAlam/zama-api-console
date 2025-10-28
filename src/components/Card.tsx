import React from 'react'

interface CardProps {
  title: string
  value: string
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon?: React.ComponentType<{ className?: string }>
}

export function Card({
  title,
  value,
  change,
  changeType,
  icon: Icon,
}: CardProps) {
  return (
    <div className="bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 rounded-xl border border-gray-100">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {Icon && (
              <div className="flex-shrink-0">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            )}
            <div className="min-w-0 flex-1">
              <dt className="text-sm font-medium text-gray-600 truncate">
                {title}
              </dt>
              <dd className="mt-1">
                <div className="text-2xl font-bold text-gray-900">{value}</div>
              </dd>
            </div>
          </div>
        </div>
        {change && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div
              className={`inline-flex items-center text-sm font-medium ${
                changeType === 'positive'
                  ? 'text-green-600'
                  : changeType === 'negative'
                    ? 'text-red-600'
                    : 'text-gray-500'
              }`}
            >
              {change}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
