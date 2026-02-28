import { InputHTMLAttributes } from 'react'
import './Switch.css'

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  size?: 'small' | 'medium' | 'large'
}

export default function Switch({ label, size = 'medium', className = '', ...props }: SwitchProps) {
  return (
    <label className={`bedi-switch bedi-switch-${size} ${className}`}>
      <input type="checkbox" className="bedi-switch-input" {...props} />
      <span className="bedi-switch-slider"></span>
      {label && <span className="bedi-switch-label">{label}</span>}
    </label>
  )
}
