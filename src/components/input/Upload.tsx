import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import './Upload.css'

interface UploadFile {
  id: string
  name: string
  size: number
  status: 'uploading' | 'done' | 'error'
  progress?: number
  url?: string
  error?: string
}

export interface UploadProps {
  accept?: string
  multiple?: boolean
  disabled?: boolean
  drag?: boolean
  listType?: 'text' | 'picture' | 'picture-card'
  maxCount?: number
  maxSize?: number
  showUploadList?: boolean
  customRequest?: (options: UploadRequestOptions) => void
  beforeUpload?: (file: File) => boolean | Promise<boolean>
  onChange?: (fileList: UploadFile[]) => void
  onPreview?: (file: UploadFile) => void
  onRemove?: (file: UploadFile) => void
}

interface UploadRequestOptions {
  file: File
  onProgress: (percent: number) => void
  onSuccess: (url?: string) => void
  onError: (error: string) => void
}

export default function Upload({
  accept,
  multiple = false,
  disabled = false,
  drag = false,
  listType = 'text',
  maxCount,
  maxSize,
  showUploadList = true,
  customRequest,
  beforeUpload,
  onChange,
  onPreview,
  onRemove
}: UploadProps) {
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const simulateUpload = (file: File, options: UploadRequestOptions) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 30
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        options.onSuccess(URL.createObjectURL(file))
      } else {
        options.onProgress(progress)
      }
    }, 200)
  }

  const handleFileSelect = (files: FileList) => {
    const filesArray = Array.from(files)
    
    if (maxCount && fileList.length + filesArray.length > maxCount) {
      alert(`最多只能上传 ${maxCount} 个文件`)
      return
    }

    filesArray.forEach(async (file) => {
      if (maxSize && file.size > maxSize) {
        alert(`文件 ${file.name} 超过大小限制 ${formatFileSize(maxSize)}`)
        return
      }

      if (beforeUpload) {
        const result = await beforeUpload(file)
        if (result === false) return
      }

      const uploadFile: UploadFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        status: 'uploading',
        progress: 0
      }

      setFileList(prev => {
        const newList = [...prev, uploadFile]
        onChange?.(newList)
        return newList
      })

      const uploadOptions: UploadRequestOptions = {
        file,
        onProgress: (percent) => {
          setFileList(prev => prev.map(f =>
            f.id === uploadFile.id
              ? { ...f, progress: percent }
              : f
          ))
        },
        onSuccess: (url) => {
          setFileList(prev => prev.map(f =>
            f.id === uploadFile.id
              ? { ...f, status: 'done', progress: 100, url }
              : f
          ))
          onChange?.(fileList)
        },
        onError: (error) => {
          setFileList(prev => prev.map(f =>
            f.id === uploadFile.id
              ? { ...f, status: 'error', error }
              : f
          ))
          onChange?.(fileList)
        }
      }

      if (customRequest) {
        customRequest(uploadOptions)
      } else {
        simulateUpload(file, uploadOptions)
      }
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileSelect(e.target.files)
    }
    e.target.value = ''
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) {
      setDragOver(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    if (!disabled && e.dataTransfer.files) {
      handleFileSelect(e.dataTransfer.files)
    }
  }

  const handleClick = () => {
    if (!disabled) {
      inputRef.current?.click()
    }
  }

  const handleRemove = (file: UploadFile) => {
    const newList = fileList.filter(f => f.id !== file.id)
    setFileList(newList)
    onChange?.(newList)
    onRemove?.(file)
  }

  const handlePreview = (file: UploadFile) => {
    onPreview?.(file)
  }

  const renderUploadArea = () => {
    if (drag) {
      return (
        <div
          className={`bedi-upload-dragger ${dragOver ? 'drag-over' : ''} ${disabled ? 'disabled' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <div className="bedi-upload-drag-icon">
            <div className="bedi-upload-icon">📁</div>
          </div>
          <p className="bedi-upload-text">
            点击或拖拽文件到此区域上传
          </p>
          <p className="bedi-upload-hint">
            {accept && `支持格式: ${accept}`}
            {maxSize && `，单个文件不超过 ${formatFileSize(maxSize)}`}
          </p>
        </div>
      )
    }

    return (
      <button
        className={`bedi-upload-btn ${disabled ? 'disabled' : ''}`}
        onClick={handleClick}
        disabled={disabled}
      >
        <span className="bedi-upload-icon">📤</span>
        <span>选择文件</span>
      </button>
    )
  }

  const renderFileList = () => {
    if (!showUploadList) return null

    return (
      <div className="bedi-upload-list">
        {fileList.map(file => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bedi-upload-list-item ${file.status}`}
          >
            <div className="bedi-upload-list-item-info">
              <div className="bedi-upload-list-item-name">{file.name}</div>
              <div className="bedi-upload-list-item-size">{formatFileSize(file.size)}</div>
              {file.status === 'uploading' && (
                <div className="bedi-upload-progress">
                  <div
                    className="bedi-upload-progress-bar"
                    style={{ width: `${file.progress || 0}%` }}
                  ></div>
                </div>
              )}
              {file.status === 'error' && (
                <div className="bedi-upload-error">{file.error || '上传失败'}</div>
              )}
            </div>
            <div className="bedi-upload-list-item-actions">
              {file.status === 'done' && listType === 'picture' && (
                <button
                  className="bedi-upload-action-btn"
                  onClick={() => handlePreview(file)}
                >
                  👁️
                </button>
              )}
              <button
                className="bedi-upload-action-btn"
                onClick={() => handleRemove(file)}
              >
                ❌
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <div className={`bedi-upload bedi-upload-${listType}`}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleInputChange}
        style={{ display: 'none' }}
      />
      {renderUploadArea()}
      {renderFileList()}
    </div>
  )
}
