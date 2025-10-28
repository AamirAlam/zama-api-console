import { Button } from '../components/ui/button'


export function Usage() {
 

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Usage Analytics</h1>
            <p className="mt-2 text-sm text-gray-600">
              Monitor your API usage, performance metrics, and error rates.
            </p>
          </div>
          <Button  variant="outline">
            Export Data
          </Button>
        </div>
      </div>


    </div>
  )
}
