import { ReactNode } from 'react'
import './Alert.css'

export interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  children?: ReactNode
  closable?: boolean
  onClose?: () => void
  showIcon?: boolean
  className?: string
}

export default function Alert({
  type = 'info',
  title,
  children,
  closable = false,
  onClose,
  showIcon = true,
  className = ''
}: AlertProps) {
  const icons = {
    info: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 6V10M10 14H10.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    success: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 10L9 13L14 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    warning: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L2 17H18L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M10 8V11M10 14H10.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    error: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 7L13 13M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  }

  return (
    <div className={`bedi-alert bedi-alert-${type} ${className}`}>
      {showIcon && <span className="bedi-alert-icon">{icons[type]}</span>}
      <div className="bedi-alert-content">
        {title && <div className="bedi-alert-title">{title}</div>}
        {children && <div className="bedi-alert-message">{children}</div>}
      </div>
      {closable && (
        <button className="bedi-alert-close" onClick={onClose}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </div>
  )
}
