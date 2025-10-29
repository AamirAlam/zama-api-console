import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  iconComponent: LucideIcon
  number: string | number
}

export function StatCard({
  title,
  iconComponent: IconComponent,
  number,
}: StatCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <IconComponent className="h-6 w-6 text-gray-400" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="text-2xl font-semibold text-gray-900">
                {typeof number === 'number' ? number.toLocaleString() : number}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
