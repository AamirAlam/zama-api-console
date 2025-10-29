import { Code, Terminal, Zap, Globe } from 'lucide-react'
import { CodeBlock } from '../components/CodeBlock'
import { codeExamples } from '../data/codeExamples'

export function Docs() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-between">
          <div>
            <p className="mt-2 text-sm text-gray-600">
              Simple, powerful API integration. Get started in minutes with our
              comprehensive guides and examples.
            </p>
          </div>
          <div></div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-medium text-gray-900">Quick Start</h2>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Get your API key and start making requests in under 5 minutes.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Base URL</span>
            </div>
            <code className="text-blue-700 font-mono text-xs">
              https://api.example.com/v1
            </code>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Terminal className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Authentication</span>
            </div>
            <code className="text-green-700 font-mono text-xs">
              Authorization: Bearer YOUR_API_KEY
            </code>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Terminal className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-medium text-gray-900">cURL Examples</h3>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">GET Request</h4>
              <CodeBlock
                code={codeExamples.curl.get}
                language="bash"
                title="Fetch Data"
              />
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">POST Request</h4>
              <CodeBlock
                code={codeExamples.curl.post}
                language="bash"
                title="Create Data"
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Code className="h-5 w-5 text-yellow-600" />
            <h3 className="text-lg font-medium text-gray-900">
              JavaScript / Node.js
            </h3>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Installation</h4>
              <CodeBlock
                code={codeExamples.install.npm}
                language="bash"
                title="Install Dependencies"
              />
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Example Code</h4>
              <CodeBlock
                code={codeExamples.javascript}
                language="javascript"
                title="app.js"
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Code className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-medium text-gray-900">Python</h3>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Installation</h4>
              <CodeBlock
                code={codeExamples.install.pip}
                language="bash"
                title="Install Dependencies"
              />
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Example Code</h4>
              <CodeBlock
                code={codeExamples.python}
                language="python"
                title="main.py"
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Response Format
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            All responses are returned in JSON format with consistent structure.
          </p>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Success Response</h4>
              <CodeBlock
                code={codeExamples.responses.success}
                language="json"
                title="200 OK"
              />
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Error Response</h4>
              <CodeBlock
                code={codeExamples.responses.error}
                language="json"
                title="401 Unauthorized"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Rate Limits</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              name: 'Free Tier',
              daily: '1,000',
              hourly: '100',
              perMinute: '10',
            },
            {
              name: 'Pro Tier',
              daily: '100,000',
              hourly: '10,000',
              perMinute: '1,000',
            },
          ].map((rate, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium mb-3">{rate.name}</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Daily requests:</span>
                  <span className="font-medium">{rate.daily}</span>
                </div>
                <div className="flex justify-between">
                  <span>Hourly requests:</span>
                  <span className="font-medium">{rate.hourly}</span>
                </div>
                <div className="flex justify-between">
                  <span>Per minute:</span>
                  <span className="font-medium">{rate.perMinute}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
