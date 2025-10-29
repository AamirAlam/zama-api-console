import { useState } from 'react'
import { Button } from './ui/button'
import { Eye, EyeOff, Copy, RotateCcw, Trash2 } from 'lucide-react'
import type { ApiKey } from '../hooks/useApiKeys'

interface ApiKeyCardProps {
  apiKey: ApiKey
  isOperating: boolean
  onRegenerateKey: (id: string) => Promise<void>
  onRevokeKey: (id: string) => Promise<void>
  onDeleteKey: (id: string) => Promise<void>
  onCopyToClipboard: (key: string) => void
}

export function ApiKeyCard({
  apiKey,
  isOperating,
  onRegenerateKey,
  onRevokeKey,
  onDeleteKey,
  onCopyToClipboard,
}: ApiKeyCardProps) {
  const [isVisible, setIsVisible] = useState(false)

  const maskKey = (key: string) => {
    return key.slice(0, 8) + '•'.repeat(20) + key.slice(-4)
  }

  const toggleKeyVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h4 className="text-sm font-medium text-gray-900">{apiKey.name}</h4>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                apiKey.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {apiKey.status}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
              {isVisible ? apiKey.key : maskKey(apiKey.key)}
            </code>
            <Button
              variant="ghost"
              size="icon-sm"
              data-testid="toggle-key-visibility"
              onClick={toggleKeyVisibility}
            >
              {isVisible ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              data-testid="copy-key"
              onClick={() => onCopyToClipboard(apiKey.key)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
            Created: {apiKey.created}
            {apiKey.lastUsed && ` • Last used: ${apiKey.lastUsed}`}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {apiKey.status === 'active' && (
            <>
              <Button
                variant="outline"
                size="sm"
                data-testid="regenerate-key"
                onClick={() => void onRegenerateKey(apiKey.id)}
                disabled={isOperating}
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                Regenerate
              </Button>
              <Button
                variant="outline"
                size="sm"
                data-testid="revoke-key"
                onClick={() => void onRevokeKey(apiKey.id)}
                disabled={isOperating}
              >
                Revoke
              </Button>
            </>
          )}
          <Button
            variant="outline"
            size="sm"
            data-testid="delete-key"
            onClick={() => void onDeleteKey(apiKey.id)}
            disabled={isOperating}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
