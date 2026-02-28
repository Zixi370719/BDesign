import React from 'react'
import './Avatar.css'

export interface AvatarProps {
  src?: string
  alt?: string
  size?: number | 'small' | 'medium' | 'large' | 'default'
  shape?: 'circle' | 'square'
  icon?: React.ReactNode
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '',
  size = 'default',
  shape = 'circle',
  icon,
  children,
  className = '',
  style
}) => {
  const getSizeClass = () => {
    if (typeof size === 'number') return ''
    return `bedi-avatar-size-${size}`
  }

  const getSizeStyle = () => {
    if (typeof size === 'number') {
      return {
        width: size,
        height: size,
        fontSize: size * 0.4
      }
    }
    return {}
  }

  const renderContent = () => {
    if (src) {
      return (
        <img 
          src={src} 
          alt={alt}
          className="bedi-avatar-image"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      )
    }

    if (icon) {
      return <div className="bedi-avatar-icon">{icon}</div>
    }

    if (children) {
      return <div className="bedi-avatar-text">{children}</div>
    }

    return <div className="bedi-avatar-icon">👤</div>
  }

  return (
    <div 
      className={`bedi-avatar ${getSizeClass()} bedi-avatar-shape-${shape} ${className}`}
      style={{ ...getSizeStyle(), ...style }}
    >
      {renderContent()}
    </div>
  )
}

export default Avatar
