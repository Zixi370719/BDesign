import { ReactNode, ButtonHTMLAttributes } from 'react'
import './Button.css'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text' | 'outline' | 'danger' | 'ghost' | 'success' | 'warning' | 'info'
  size?: 'small' | 'medium' | 'large' | 'extra-large'
  icon?: ReactNode
  loading?: boolean
  block?: boolean
  disabled?: boolean
  shape?: 'square' | 'round' | 'circle'
  iconOnly?: boolean
}

export default function Button({
  variant = 'secondary',
  size = 'medium',
  icon,
  loading = false,
  block = false,
  disabled = false,
  shape = 'square',
  iconOnly = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const classNames = [
    'bedi-button',
    `bedi-button-${variant}`,
    `bedi-button-${size}`,
    `bedi-button-${shape}`,
    block && 'bedi-button-block',
    loading && 'bedi-button-loading',
    disabled && 'bedi-button-disabled',
    iconOnly && 'bedi-button-icon-only',
    (iconOnly || (!children && icon)) && 'bedi-button-icon-only',
    className
  ].filter(Boolean).join(' ')

  const isDisabled = disabled || loading

  return (
    <button
      className={classNames}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <span className="bedi-button-loading-icon">
          <svg className="bedi-button-loading-svg" viewBox="0 0 16 16" fill="none">
            <circle 
              cx="8" 
              cy="8" 
              r="6" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeDasharray="10 30" 
              className="bedi-button-loading-circle"
            />
          </svg>
        </span>
      )}
      {!loading && icon && (
        <span className="bedi-button-icon">{icon}</span>
      )}
      {children && (
        <span className="bedi-button-label">{children}</span>
      )}
    </button>
  )
}
