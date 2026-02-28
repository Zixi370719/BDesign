import { motion } from 'framer-motion'
import './Empty.css'

export interface EmptyProps {
  image?: React.ReactNode
  imageStyle?: React.CSSProperties
  description?: React.ReactNode
  children?: React.ReactNode
}

export default function Empty({
  image,
  imageStyle,
  description = '暂无数据',
  children
}: EmptyProps) {
  const renderImage = () => {
    if (image) {
      return <div className="bedi-empty-image" style={imageStyle}>{image}</div>
    }
    
    return (
      <div className="bedi-empty-image" style={imageStyle}>
        <div className="bedi-empty-image-default">
          <div className="bedi-empty-image-box">
            <div className="bedi-empty-image-lid"></div>
            <div className="bedi-empty-image-body"></div>
          </div>
        </div>
      </div>
    )
  }

  const renderDescription = () => {
    if (description) {
      return <div className="bedi-empty-description">{description}</div>
    }
    return null
  }

  const renderChildren = () => {
    if (children) {
      return <div className="bedi-empty-footer">{children}</div>
    }
    return null
  }

  return (
    <motion.div
      className="bedi-empty"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bedi-empty-content">
        {renderImage()}
        {renderDescription()}
        {renderChildren()}
      </div>
    </motion.div>
  )
}
