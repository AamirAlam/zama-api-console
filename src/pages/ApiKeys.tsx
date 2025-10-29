import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Plus, Key } from 'lucide-react'
import { useApiKeys } from '../hooks/useApiKeys'
import { ApiKeyCard } from '../components/ApiKeyCard'

export function ApiKeys() {
  const {
    apiKeys,
    isLoading,
    isOperating,
    createApiKey: createApiKeyHook,
    regenerateKey,
    revokeKey,
    deleteKey,
  } = useApiKeys()

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')

  const handleCreateApiKey = async () => {
    if (!newKeyName.trim()) return

    try {
      await createApiKeyHook(newKeyName)
      setNewKeyName('')
      setShowCreateForm(false)
    } catch (error) {
      // TODO: Display error toast message
      // eslint-disable-next-line no-console
      console.error('Failed to create API key:', error)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // : todo display toast message
      })
      .catch(() => {
        // : todo display toast message
      })
  }

  if (isLoading) {
    return (
      <div className="flex  justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading API keys...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex  justify-between">
          <div>
            <p className="mt-2 text-sm text-gray-600">
              Manage your API keys for accessing our services.
            </p>
          </div>
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create API Key
          </Button>
        </div>
      </div>

      {/* Create API Key Form */}
      {showCreateForm && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Create New API Key
          </h3>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter API key name"
              value={newKeyName}
              onChange={e => setNewKeyName(e.target.value)}
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <Button
              onClick={() => void handleCreateApiKey()}
              disabled={!newKeyName.trim() || isOperating}
            >
              {isOperating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating...
                </>
              ) : (
                'Create'
              )}
            </Button>
            <Button variant="outline" onClick={() => setShowCreateForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            API Keys ({apiKeys.length})
          </h3>

          {apiKeys.length === 0 ? (
            <div className="text-center py-12">
              <Key className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No API keys
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating your first API key.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {apiKeys.map(apiKey => (
                <ApiKeyCard
                  key={apiKey.id}
                  apiKey={apiKey}
                  isOperating={isOperating}
                  onRegenerateKey={regenerateKey}
                  onRevokeKey={revokeKey}
                  onDeleteKey={deleteKey}
                  onCopyToClipboard={copyToClipboard}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
