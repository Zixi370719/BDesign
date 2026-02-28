import React from 'react'
import './Badge.css'

export interface BadgeProps {
  children?: React.ReactNode
  count?: number | string
  dot?: boolean
  color?: string
  showZero?: boolean
  max?: number
  status?: 'success' | 'error' | 'warning' | 'info'
  text?: string
  className?: string
}

const Badge: React.FC<BadgeProps> = ({
  children,
  count = 0,
  dot = false,
  color,
  showZero = false,
  max = 99,
  status,
  text,
  className = ''
}) => {
  const getDisplayCount = () => {
    if (typeof count === 'string') return count
    if (count > max) return `${max}+`
    return count.toString()
  }

  const shouldShow = () => {
    if (dot) return true
    if (count === 0 && !showZero) return false
    return true
  }

  const renderBadge = () => {
    if (status) {
      return (
        <span className={`bedi-badge-status bedi-badge-status-${status}`}>
          <span className="bedi-badge-status-dot"></span>
          {text && <span className="bedi-badge-status-text">{text}</span>}
        </span>
      )
    }

    if (!shouldShow()) return null

    return (
      <span 
        className={`bedi-badge ${dot ? 'bedi-badge-dot' : 'bedi-badge-count'} ${className}`}
        style={color ? { backgroundColor: color } : {}}
      >
        {!dot && getDisplayCount()}
      </span>
    )
  }

  if (children) {
    return (
      <span className="bedi-badge-wrapper">
        {children}
        {renderBadge()}
      </span>
    )
  }

  return renderBadge()
}

export default Badge
