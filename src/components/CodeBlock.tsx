import { useState, useEffect } from 'react'
import { Copy, Check } from 'lucide-react'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'

interface CodeBlockProps {
  code: string
  language: string
  title?: string
}

export function CodeBlock({ code, language, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [highlightedCode, setHighlightedCode] = useState('')

  useEffect(() => {
    // Map language aliases
    const languageMap: Record<string, string> = {
      curl: 'bash',
      shell: 'bash',
      js: 'javascript',
      ts: 'javascript',
      py: 'python',
    }

    const prismLanguage = languageMap[language] || language

    try {
      const highlighted = Prism.highlight(
        code.trim(),
        Prism.languages[prismLanguage] || Prism.languages.text,
        prismLanguage
      )
      setHighlightedCode(highlighted)
    } catch (error) {
      // Fallback to plain text if highlighting fails
      setHighlightedCode(code.trim())
      // eslint-disable-next-line no-console
      console.error('Failed to highlight code:', error)
    }
  }, [code, language])

  const copyToClipboard = () => {
    void navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      {title && (
        <div className="bg-gray-50 px-4 py-2 text-sm font-medium border-b">
          {title}
        </div>
      )}
      <div className="relative">
        <div className="p-4 overflow-x-auto text-left">
          <pre className="text-sm leading-relaxed font-mono text-left">
            <code
              className={`language-${language} text-left`}
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          </pre>
        </div>
        <button
          onClick={copyToClipboard}
          className="absolute top-3 right-3 p-1.5 rounded bg-white border shadow-sm hover:bg-gray-50 transition-colors"
          title={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <Copy className="h-4 w-4 text-gray-600" />
          )}
        </button>
      </div>
    </div>
  )
}
