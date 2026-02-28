import { SelectHTMLAttributes } from 'react'
import './Select.css'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { label: string; value: string | number; disabled?: boolean }[]
}

export default function Select({
  label,
  error,
  options,
  className = '',
  ...props
}: SelectProps) {
  return (
    <div className="bedi-select-wrapper">
      {label && <label className="bedi-select-label">{label}</label>}
      <div className={`bedi-select-container ${error ? 'bedi-select-error' : ''}`}>
        <select className={`bedi-select ${className}`} {...props}>
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="bedi-select-arrow">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
      {error && <span className="bedi-select-error-text">{error}</span>}
    </div>
  )
}
