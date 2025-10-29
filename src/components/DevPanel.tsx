import { useState } from 'react'
import { useFeatureFlags } from '../contexts/FeatureFlagsContext'
import { Settings, X, RotateCcw, Flag } from 'lucide-react'
import { Button } from './ui/button'

export function DevPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const { flags, toggleFlag, resetFlags } = useFeatureFlags()

  const featureDefinitions = [
    {
      key: 'chartV2' as const,
      name: 'Chart v2',
      description: 'New line chart showing status codes over time',
      category: 'Charts',
    },
    {
      key: 'modernColors' as const,
      name: 'Modern Color Scheme',
      description: 'Updated color palette for better accessibility',
      category: 'Design',
    },
  ]

  const activeFlags = Object.entries(flags).filter(([, value]) => value).length

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full w-12 h-12 shadow-lg bg-blue-600 hover:bg-blue-700"
          size="sm"
          data-testid="dev-panel-toggle"
        >
          <Settings className="h-5 w-5" />
        </Button>
        {activeFlags > 0 && (
          <div
            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold"
            data-testid="active-flags-counter"
          >
            {activeFlags}
          </div>
        )}
      </div>

      {/* Dev Panel */}
      {isOpen && (
        <div
          className="fixed bottom-20 right-4 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-hidden"
          data-testid="dev-panel"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2">
              <Flag className="h-4 w-4 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Feature Flags</h3>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                DEV
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={resetFlags}
                variant="outline"
                size="sm"
                className="h-8"
                data-testid="reset-flags-button"
              >
                <RotateCcw className="h-3 w-3" />
              </Button>
              <Button
                onClick={() => setIsOpen(false)}
                variant="outline"
                size="sm"
                className="h-8"
                data-testid="close-panel-button"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Feature Toggles */}
          <div className="p-4 space-y-4 max-h-64 overflow-y-auto">
            {featureDefinitions.map(feature => (
              <div key={feature.key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label
                      className="flex items-center cursor-pointer"
                      data-testid={`feature-toggle-${feature.key}`}
                    >
                      <input
                        type="checkbox"
                        checked={flags[feature.key]}
                        onChange={() => toggleFlag(feature.key)}
                        className="sr-only"
                      />
                      <div
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                          flags[feature.key]
                            ? 'bg-blue-600 border-blue-600'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {flags[feature.key] && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="ml-2 font-medium text-gray-900">
                        {feature.name}
                      </span>
                    </label>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {feature.category}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 ml-6">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-gray-200 bg-gray-50">
            <p className="text-xs text-gray-500 text-center">
              {activeFlags} of {featureDefinitions.length} features enabled
            </p>
          </div>
        </div>
      )}
    </>
  )
}
