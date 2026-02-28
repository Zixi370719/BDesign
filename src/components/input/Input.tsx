import { InputHTMLAttributes, ReactNode } from 'react'
import './Input.css'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  prefix?: ReactNode
  suffix?: ReactNode
  addonBefore?: string
  addonAfter?: string
}

export default function Input({
  label,
  error,
  prefix,
  suffix,
  addonBefore,
  addonAfter,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="bedi-input-wrapper">
      {label && <label className="bedi-input-label">{label}</label>}
      <div className={`bedi-input-container ${error ? 'bedi-input-error' : ''}`}>
        {addonBefore && <span className="bedi-input-addon">{addonBefore}</span>}
        {prefix && <span className="bedi-input-prefix">{prefix}</span>}
        <input className={`bedi-input ${className}`} {...props} />
        {suffix && <span className="bedi-input-suffix">{suffix}</span>}
        {addonAfter && <span className="bedi-input-addon">{addonAfter}</span>}
      </div>
      {error && <span className="bedi-input-error-text">{error}</span>}
    </div>
  )
}
