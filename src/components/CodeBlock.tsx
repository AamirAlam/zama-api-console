import { CodeBlock as ReactCodeBlock, atomOneLight } from 'react-code-blocks'
import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CodeBlockProps {
  code: string
  language: string
  title?: string
}

export function CodeBlock({ code, language, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    void navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      {title && (
        <div className="bg-gray-50 px-4 py-2 text-sm font-medium border-b">
          {title}
        </div>
      )}
      <div className="relative">
        <ReactCodeBlock
          text={code}
          language={language}
          theme={atomOneLight}
          showLineNumbers={false}
        />
        <button
          onClick={copyToClipboard}
          className="absolute top-3 right-3 p-1.5 rounded bg-white border shadow-sm hover:bg-gray-50"
          title={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  )
}
