import { useState } from 'react'
import './CodeEditor.css'

interface CodeEditorProps {
  code: string
  onChange?: (code: string) => void
  readOnly?: boolean
  language?: string
}

export default function CodeEditor({ code, onChange, readOnly = false, language = 'jsx' }: CodeEditorProps) {
  const [localCode, setLocalCode] = useState(code)
  const [copied, setCopied] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value
    setLocalCode(newCode)
    onChange?.(newCode)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(localCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="bedi-code-editor">
      <div className="bedi-code-editor-header">
        <span className="bedi-code-language">{language}</span>
        <button className="bedi-code-copy-btn" onClick={handleCopy}>
          {copied ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="5.5" y="5.5" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M3.5 10.5H2.5C1.94772 10.5 1.5 10.0523 1.5 9.5V2.5C1.5 1.94772 1.94772 1.5 2.5 1.5H9.5C10.0523 1.5 10.5 1.94772 10.5 2.5V3.5" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          )}
          {copied ? '已复制' : '复制代码'}
        </button>
      </div>
      <textarea
        className="bedi-code-editor-textarea"
        value={localCode}
        onChange={handleChange}
        readOnly={readOnly}
        spellCheck={false}
      />
    </div>
  )
}
