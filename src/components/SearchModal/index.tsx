import { useEffect, useRef, useState } from 'react'
import Fuse from 'fuse.js'
import { useNavigate } from 'react-router-dom'
import './SearchModal.css'

interface SearchItem {
  key: string
  label: string
  group: string
}

interface SearchModalProps {
  open: boolean
  items: SearchItem[]
  onClose: () => void
}

export default function SearchModal({ open, items, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchItem[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const fuse = new Fuse(items, {
    keys: ['label', 'key', 'group'],
    threshold: 0.35,
    includeScore: true,
  })

  useEffect(() => {
    if (open) {
      setQuery('')
      setResults(items.slice(0, 8))
      setActiveIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    if (!query.trim()) {
      setResults(items.slice(0, 8))
    } else {
      const fuseResults = fuse.search(query).map((r) => r.item)
      setResults(fuseResults.slice(0, 8))
    }
    setActiveIndex(0)
  }, [query])

  const handleSelect = (item: SearchItem) => {
    navigate(`/components/${item.key}`)
    onClose()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      if (results[activeIndex]) handleSelect(results[activeIndex])
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!open) return null

  return (
    <div className="search-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="搜索组件">
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-input-row">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 11l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            className="search-input"
            placeholder="搜索组件…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="search-esc-hint">ESC</kbd>
        </div>

        <div className="search-results">
          {results.length === 0 ? (
            <div className="search-empty">未找到匹配的组件</div>
          ) : (
            results.map((item, i) => (
              <button
                key={item.key}
                className={`search-result-item ${i === activeIndex ? 'active' : ''}`}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setActiveIndex(i)}
              >
                <span className="search-result-label">{item.label}</span>
                <span className="search-result-group">{item.group}</span>
              </button>
            ))
          )}
        </div>

        <div className="search-footer">
          <span className="search-hint"><kbd>↑</kbd><kbd>↓</kbd> 导航</span>
          <span className="search-hint"><kbd>↵</kbd> 选择</span>
          <span className="search-hint"><kbd>ESC</kbd> 关闭</span>
        </div>
      </div>
    </div>
  )
}
