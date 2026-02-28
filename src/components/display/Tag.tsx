import { ReactNode } from 'react'
import './Tag.css'

export interface TagProps {
  children: ReactNode
  color?: 'primary' | 'success' | 'warning' | 'error' | 'default'
  closable?: boolean
  onClose?: () => void
  className?: string
}

export default function Tag({
  children,
  color = 'default',
  closable = false,
  onClose,
  className = ''
}: TagProps) {
  return (
    <span className={`bedi-tag bedi-tag-${color} ${className}`}>
      {children}
      {closable && (
        <button className="bedi-tag-close" onClick={onClose}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 3L9 9M9 3L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </span>
  )
}
