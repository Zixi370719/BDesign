import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Skeleton.css'

export interface SkeletonProps {
  loading?: boolean
  active?: boolean
  children?: React.ReactNode
  avatar?: boolean | SkeletonAvatarProps
  paragraph?: boolean | SkeletonParagraphProps
  title?: boolean | SkeletonTitleProps
  round?: boolean
}

interface SkeletonAvatarProps {
  size?: 'small' | 'default' | 'large' | number
  shape?: 'circle' | 'square'
}

interface SkeletonParagraphProps {
  rows?: number
  width?: string | string[]
}

interface SkeletonTitleProps {
  width?: string | number
}

export default function Skeleton({
  loading = true,
  active = true,
  children,
  avatar = false,
  paragraph = true,
  title = true,
  round = false
}: SkeletonProps) {
  const [skeletonItems, setSkeletonItems] = useState<Array<{ key: string; width?: string }>>([])

  useEffect(() => {
    if (loading) {
      const items: Array<{ key: string; width?: string }> = []
      
      if (title) {
        const titleWidth = typeof title === 'object' ? title.width : '38%'
        items.push({ key: 'title', width: typeof titleWidth === 'number' ? `${titleWidth}px` : titleWidth })
      }
      
      if (paragraph) {
        const paragraphProps = typeof paragraph === 'object' ? paragraph : { rows: 3 }
        const rows = paragraphProps.rows || 3
        const widths = Array.isArray(paragraphProps.width) ? paragraphProps.width : [paragraphProps.width]
        
        for (let i = 0; i < rows; i++) {
          const width = widths[i] || (i === rows - 1 ? '61%' : '100%')
          items.push({ 
            key: `paragraph-${i}`, 
            width: typeof width === 'number' ? `${width}px` : width 
          })
        }
      }
      
      setSkeletonItems(items)
    } else {
      setSkeletonItems([])
    }
  }, [loading, title, paragraph])

  const renderAvatar = () => {
    if (!avatar) return null

    const avatarProps = typeof avatar === 'object' ? avatar : {}
    const { size = 'default', shape = 'circle' } = avatarProps

    return (
      <div className={`bedi-skeleton-avatar bedi-skeleton-avatar-${size} bedi-skeleton-avatar-${shape}`}>
        {active && <div className="bedi-skeleton-avatar-shimmer"></div>}
      </div>
    )
  }

  const renderSkeleton = () => {
    return (
      <div className={`bedi-skeleton ${round ? 'bedi-skeleton-round' : ''}`}>
        {avatar && (
          <div className="bedi-skeleton-header">
            {renderAvatar()}
            <div className="bedi-skeleton-content">
              {skeletonItems.map((item) => (
                <div
                  key={item.key}
                  className="bedi-skeleton-item"
                  style={{ width: item.width }}
                >
                  {active && <div className="bedi-skeleton-shimmer"></div>}
                </div>
              ))}
            </div>
          </div>
        )}
        {!avatar && (
          <div className="bedi-skeleton-content">
            {skeletonItems.map((item) => (
              <div
                key={item.key}
                className="bedi-skeleton-item"
                style={{ width: item.width }}
              >
                {active && <div className="bedi-skeleton-shimmer"></div>}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  if (loading) {
    return renderSkeleton()
  }

  return <>{children}</>
}
