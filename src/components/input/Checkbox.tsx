import { InputHTMLAttributes } from 'react'
import './Checkbox.css'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  indeterminate?: boolean
}

export default function Checkbox({ label, className = '', ...props }: CheckboxProps) {
  return (
    <label className={`bedi-checkbox ${className}`}>
      <input type="checkbox" className="bedi-checkbox-input" {...props} />
      <span className="bedi-checkbox-box">
        <svg className="bedi-checkbox-icon" viewBox="0 0 12 12" fill="none">
          <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
      {label && <span className="bedi-checkbox-label">{label}</span>}
    </label>
  )
}
