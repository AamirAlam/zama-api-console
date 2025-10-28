import { Button } from '../components/ui/button'
import { Plus } from 'lucide-react'

export function ApiKeys() {

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">API Keys</h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage your API keys for accessing our services.
            </p>
          </div>
          <Button >
            <Plus className="h-4 w-4 mr-2" />
            Create API Key
          </Button>
        </div>
      </div>
  
    </div>
  )
}
