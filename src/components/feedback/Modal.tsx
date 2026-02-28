import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Modal.css'

export interface ModalProps {
  open: boolean
  onClose: () => void
  title?: React.ReactNode
  footer?: React.ReactNode
  width?: number | string
  centered?: boolean
  maskClosable?: boolean
  closable?: boolean
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  footer,
  width = 520,
  centered = false,
  maskClosable = true,
  closable = true,
  children,
  className = '',
  style
}) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleMaskClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && maskClosable) {
      onClose()
    }
  }

  const handleClose = () => {
    if (closable) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="bedi-modal-mask"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleMaskClick}
        >
          <motion.div
            className={`bedi-modal-content ${centered ? 'bedi-modal-centered' : ''} ${className}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ width, ...style }}
            onClick={(e) => e.stopPropagation()}
          >
            {title && (
              <div className="bedi-modal-header">
                <div className="bedi-modal-title">{title}</div>
                {closable && (
                  <button className="bedi-modal-close" onClick={handleClose}>
                    ×
                  </button>
                )}
              </div>
            )}
            
            <div className="bedi-modal-body">
              {children}
            </div>
            
            {footer && (
              <div className="bedi-modal-footer">
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal
