import { Code, Terminal } from 'lucide-react'
import { CodeBlock } from '../components/CodeBlock'
import { codeExamples } from '../data/codeExamples'

export function Docs() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold mb-4">API Documentation</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Simple, powerful API integration. Get started in minutes with our
          comprehensive guides and examples.
        </p>
      </div>

      <div className="mb-12">
        <div className="border rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Terminal className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold">Quick Start</h2>
          </div>
          <p className="text-gray-700 mb-6">
            Get your API key and start making requests in under 5 minutes.
          </p>

          <div className="bg-white rounded-lg p-4 mb-6 border">
            <div className="flex items-center gap-3 mb-2">
              <Terminal className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Base URL</span>
            </div>
            <code className="text-blue-700 font-mono text-sm">
              https://api.example.com/v1
            </code>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Authentication</h3>
            <p className="text-gray-700 mb-4">
              Include your API key in the Authorization header:
            </p>
            <CodeBlock
              code={codeExamples.auth.header}
              language="http"
              title="Required Header"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-8 mb-12">
        <div className="border rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Terminal className="h-6 w-6 text-green-600" />
            <h2 className="text-xl font-semibold">cURL Examples</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-3">GET Request</h3>
              <CodeBlock
                code={codeExamples.curl.get}
                language="bash"
                title="Fetch Data"
              />
            </div>
            <div>
              <h3 className="font-medium mb-3">POST Request</h3>
              <CodeBlock
                code={codeExamples.curl.post}
                language="bash"
                title="Create Data"
              />
            </div>
          </div>
        </div>

        <div className="border rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Code className="h-6 w-6 text-yellow-600" />
            <h2 className="text-xl font-semibold">JavaScript / Node.js</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-3">Installation</h3>
              <CodeBlock
                code={codeExamples.install.npm}
                language="bash"
                title="Install Dependencies"
              />
            </div>
            <div>
              <h3 className="font-medium mb-3">Example Code</h3>
              <CodeBlock
                code={codeExamples.javascript}
                language="javascript"
                title="app.js"
              />
            </div>
          </div>
        </div>

        <div className="border rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Code className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold">Python</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-3">Installation</h3>
              <CodeBlock
                code={codeExamples.install.pip}
                language="bash"
                title="Install Dependencies"
              />
            </div>
            <div>
              <h3 className="font-medium mb-3">Example Code</h3>
              <CodeBlock
                code={codeExamples.python}
                language="python"
                title="main.py"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border rounded-xl p-8 mb-12">
        <h2 className="text-xl font-semibold mb-6">Response Format</h2>
        <p className="text-gray-600 mb-6">
          All responses are returned in JSON format with consistent structure.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-3">Success Response</h3>
            <CodeBlock
              code={codeExamples.responses.success}
              language="json"
              title="200 OK"
            />
          </div>
          <div>
            <h3 className="font-medium mb-3">Error Response</h3>
            <CodeBlock
              code={codeExamples.responses.error}
              language="json"
              title="401 Unauthorized"
            />
          </div>
        </div>
      </div>

      <div className="border rounded-xl p-8 mb-12">
        <h2 className="text-xl font-semibold mb-6">Rate Limits</h2>
        <div className="grid md:grid-cols-2 gap-6">
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
            <div key={index} className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-4">{rate.name}</h3>
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
