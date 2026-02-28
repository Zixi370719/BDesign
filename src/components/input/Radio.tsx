import { InputHTMLAttributes } from 'react'
import './Radio.css'

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

export default function Radio({ label, className = '', ...props }: RadioProps) {
  return (
    <label className={`bedi-radio ${className}`}>
      <input type="radio" className="bedi-radio-input" {...props} />
      <span className="bedi-radio-circle">
        <span className="bedi-radio-dot"></span>
      </span>
      {label && <span className="bedi-radio-label">{label}</span>}
    </label>
  )
}
