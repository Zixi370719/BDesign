import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from './Button'
import Space from '../layout/Space'
import Card from '../display/Card'
import './ButtonDoc.css'

export default function ButtonDoc() {
  const [expandedCode, setExpandedCode] = useState<string | null>(null)
  const [config, setConfig] = useState<{
    block: boolean
    disabled: boolean
    loading: boolean
    shape: 'square' | 'round' | 'circle'
    size: 'small' | 'medium' | 'large' | 'extra-large'
    type: 'primary'
    variant: 'primary' | 'secondary' | 'outline' | 'text' | 'danger' | 'ghost' | 'success' | 'warning' | 'info'
  }>({
    block: false,
    disabled: false,
    loading: false,
    shape: 'square',
    size: 'medium',
    type: 'primary',
    variant: 'primary'
  })

  const toggleCode = (codeId: string) => {
    setExpandedCode(expandedCode === codeId ? null : codeId)
  }

  const updateConfig = (key: keyof typeof config, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }))
  }

  const resetConfig = () => {
    setConfig({
      block: false,
      disabled: false,
      loading: false,
      shape: 'square',
      size: 'medium',
      type: 'primary',
      variant: 'primary'
    })
  }

  const getConfigCode = () => {
    return `<Button 
  variant="${config.variant}"
  size="${config.size}"
  shape="${config.shape}"
  ${config.block ? 'block' : ''}
  ${config.disabled ? 'disabled' : ''}
  ${config.loading ? 'loading' : ''}
>
  示例按钮
</Button>`
  }

  const codeExamples = {
    basic: `<Button variant="primary">填充按钮</Button>
<Button variant="outline">描边按钮</Button>
<Button variant="ghost">虚框按钮</Button>
<Button variant="text">文字按钮</Button>`,
    icons: `<Button variant="primary" icon="📤">发送</Button>
<Button variant="secondary" icon="👤">用户</Button>
<Button variant="outline" icon="📧">邮件</Button>
<Button variant="text" icon="🔍">搜索</Button>

{/* 纯图标按钮 */}
<Button variant="primary" shape="circle" icon="🔍" />
<Button variant="secondary" shape="circle" icon="⚙️" />
<Button variant="outline" shape="circle" icon="📝" />`,
    ghost: `<Button variant="ghost">幽灵按钮</Button>
<Button variant="ghost" icon="🔍">搜索</Button>
<Button variant="ghost" disabled>禁用状态</Button>`,
    block: `<Button variant="primary" block>Block按钮</Button>
<Button variant="outline" block>Block描边按钮</Button>
<Button variant="text" block>Block文字按钮</Button>`,
    themes: `<Button variant="primary">主要按钮</Button>
<Button variant="success">成功按钮</Button>
<Button variant="warning">警告按钮</Button>
<Button variant="danger">危险按钮</Button>
<Button variant="info">信息按钮</Button>`,
    sizes: `<Button variant="primary" size="small">小号按钮</Button>
<Button variant="primary" size="medium">中号按钮</Button>
<Button variant="primary" size="large">大号按钮</Button>
<Button variant="primary" size="extra-large">特大号按钮</Button>`,
    custom: `<Button variant="primary">
  <span style={{ marginRight: '8px' }}>🚀</span>
  快速开始
</Button>

<Button variant="secondary">
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <span style={{ fontSize: '18px' }}>💎</span>
    <span>高级功能</span>
    <span style={{ fontSize: '12px', opacity: 0.7 }}>PRO</span>
  </div>
</Button>

<Button variant="outline">
  <span>
    <span style={{ display: 'block', fontSize: '12px', opacity: 0.7 }}>上传文件</span>
    <span style={{ display: 'block', fontSize: '10px' }}>支持拖拽</span>
  </span>
</Button>`
  }

  return (
    <div className="design">
      <div className="design-layout">
        <div className="bedi-design-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
        {/* BEDI 风格的页面头部 */}
        <div className="bedi-header">
          <div className="bedi-breadcrumb">
            <span>组件</span>
            <span className="separator">/</span>
            <span className="current">Button 按钮</span>
          </div>
          <h1 className="bedi-title">Button 按钮</h1>
          <p className="bedi-description">
            按钮用于开始一个即时操作。当用户点击按钮时，会触发相应的业务逻辑。
          </p>
          <div className="bedi-meta">
            <div className="bedi-meta-item">
              <span className="bedi-meta-label">类型:</span>
              <span className="bedi-meta-value">组件</span>
            </div>
            <div className="bedi-meta-item">
              <span className="bedi-meta-label">状态:</span>
              <span className="bedi-meta-value stable">Stable</span>
            </div>
          </div>
        </div>

        {/* 使用指南 */}
        <section className="bedi-section">
          <h2 className="bedi-section-title">何时使用</h2>
          <div className="bedi-usage-grid">
            <Card className="bedi-usage-card">
              <h3>✅ 推荐使用</h3>
              <ul>
                <li>标记了一个（或封装一组）操作命令，响应用户点击行为</li>
                <li>点击后触发相应的业务逻辑</li>
                <li>用于页面中最重要的操作，如"提交"、"确认"、"创建"等</li>
              </ul>
            </Card>
            <Card className="bedi-usage-card">
              <h3>❌ 不推荐使用</h3>
              <ul>
                <li>用于页面跳转，请使用链接组件</li>
                <li>用于多选操作，请使用复选框组件</li>
                <li>用于选择操作，请使用单选框组件</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* 示例 */}
        <section className="bedi-section">
          <h2 className="bedi-section-title">示例</h2>
          
          {/* 动态配置部分 */}
          <div className="bedi-demo-section">
            <h3 className="bedi-demo-title">动态配置</h3>
            <p className="bedi-demo-description">
              通过右侧属性面板实时调整按钮样式，左侧预览区域会即时更新显示效果。
            </p>
            <div className="bedi-dynamic-config-container">
              {/* 左侧预览 */}
              <div className="bedi-preview-panel">
                <div className="bedi-preview-header">
                  <h4>预览</h4>
                  <Button variant="outline" size="small" onClick={resetConfig}>重置</Button>
                </div>
                <div className="bedi-preview-content">
                  <Space>
                    <Button 
                      variant={config.variant}
                      size={config.size}
                      shape={config.shape}
                      block={config.block}
                      disabled={config.disabled}
                      loading={config.loading}
                    >
                      示例按钮
                    </Button>
                  </Space>
                </div>
                <div className="bedi-preview-actions">
                  <Button 
                    variant="outline" 
                    size="small"
                    icon="📋"
                    onClick={() => toggleCode('dynamic')}
                  >
                    {expandedCode === 'dynamic' ? '隐藏代码' : '显示代码'}
                  </Button>
                </div>
                {expandedCode === 'dynamic' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bedi-code-block"
                  >
                    <pre><code>{getConfigCode()}</code></pre>
                  </motion.div>
                )}
              </div>

              {/* 右侧配置 */}
              <div className="bedi-config-panel">
                <div className="bedi-config-header">
                  <h4>属性配置</h4>
                </div>
                <div className="bedi-config-content">
                  <div className="bedi-config-group">
                    <label>variant</label>
                    <select value={config.variant} onChange={(e) => updateConfig('variant', e.target.value)}>
                      <option value="primary">primary</option>
                      <option value="secondary">secondary</option>
                      <option value="outline">outline</option>
                      <option value="text">text</option>
                      <option value="danger">danger</option>
                      <option value="ghost">ghost</option>
                      <option value="success">success</option>
                      <option value="warning">warning</option>
                      <option value="info">info</option>
                    </select>
                  </div>
                  
                  <div className="bedi-config-group">
                    <label>size</label>
                    <select value={config.size} onChange={(e) => updateConfig('size', e.target.value)}>
                      <option value="small">small</option>
                      <option value="medium">medium</option>
                      <option value="large">large</option>
                      <option value="extra-large">extra-large</option>
                    </select>
                  </div>
                  
                  <div className="bedi-config-group">
                    <label>shape</label>
                    <select value={config.shape} onChange={(e) => updateConfig('shape', e.target.value)}>
                      <option value="square">square</option>
                      <option value="round">round</option>
                      <option value="circle">circle</option>
                    </select>
                  </div>
                  
                  <div className="bedi-config-group">
                    <label>block</label>
                    <input 
                      type="checkbox" 
                      checked={config.block} 
                      onChange={(e) => updateConfig('block', e.target.checked)}
                    />
                  </div>
                  
                  <div className="bedi-config-group">
                    <label>disabled</label>
                    <input 
                      type="checkbox" 
                      checked={config.disabled} 
                      onChange={(e) => updateConfig('disabled', e.target.checked)}
                    />
                  </div>
                  
                  <div className="bedi-config-group">
                    <label>loading</label>
                    <input 
                      type="checkbox" 
                      checked={config.loading} 
                      onChange={(e) => updateConfig('loading', e.target.checked)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 基础按钮 */}
          <div className="bedi-demo-section">
            <h3 className="bedi-demo-title">基础按钮</h3>
            <div className="bedi-style-description">
              <h4>样式解读</h4>
              <p>基础按钮包含四种主要样式：填充按钮、描边按钮、虚框按钮和文字按钮。</p>
              <ul>
                <li><strong>填充按钮</strong>：具有背景色，用于主要操作</li>
                <li><strong>描边按钮</strong>：仅有边框，用于次要操作</li>
                <li><strong>虚框按钮</strong>：虚线边框，用于可选操作</li>
                <li><strong>文字按钮</strong>：无边框背景，仅文字显示</li>
              </ul>
            </div>
            <div className="bedi-usage-description">
              <h4>使用说明</h4>
              <p>在同一个操作区域中，主要按钮（填充按钮）最多出现一次，其他按钮可多次使用。</p>
            </div>
            <div className="bedi-demo-container">
              <Space>
                <Button variant="primary">填充按钮</Button>
                <Button variant="outline">描边按钮</Button>
                <Button variant="ghost">虚框按钮</Button>
                <Button variant="text">文字按钮</Button>
              </Space>
            </div>
            <div className="bedi-demo-actions">
              <Button 
                variant="outline" 
                size="small"
                icon="📋"
                onClick={() => toggleCode('basic')}
              >
                {expandedCode === 'basic' ? '隐藏代码' : '显示代码'}
              </Button>
            </div>
            {expandedCode === 'basic' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bedi-code-block"
              >
                <pre><code>{codeExamples.basic}</code></pre>
              </motion.div>
            )}
          </div>

          {/* 图标按钮 */}
          <div className="bedi-demo-section">
            <h3 className="bedi-demo-title">图标按钮</h3>
            <div className="bedi-style-description">
              <h4>样式解读</h4>
              <p>图标按钮可以增强用户识别度，提供更直观的操作提示。</p>
              <ul>
                <li><strong>左图标</strong>：图标在文字左侧，常见于发送、保存等操作</li>
                <li><strong>右图标</strong>：图标在文字右侧，常见于展开、下一步等操作</li>
                <li><strong>纯图标</strong>：仅显示图标，节省空间，常用于工具栏</li>
              </ul>
            </div>
            <div className="bedi-usage-description">
              <h4>使用说明</h4>
              <p>图标应简洁明了，符合用户认知习惯。纯图标按钮建议配合tooltip使用。</p>
            </div>
            <div className="bedi-demo-container">
              <Space wrap>
                <Button variant="primary" icon="📤">发送</Button>
                <Button variant="secondary" icon="👤">用户</Button>
                <Button variant="outline" icon="📧">邮件</Button>
                <Button variant="text" icon="🔍">搜索</Button>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '8px', background: 'var(--color-bg-2)', borderRadius: '8px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-3)' }}>纯图标:</span>
                  <Button variant="primary" shape="circle" icon="🔍" />
                  <Button variant="secondary" shape="circle" icon="⚙️" />
                  <Button variant="outline" shape="circle" icon="📝" />
                </div>
              </Space>
            </div>
            <div className="bedi-demo-actions">
              <Button 
                variant="outline" 
                size="small"
                icon="📋"
                onClick={() => toggleCode('icons')}
              >
                {expandedCode === 'icons' ? '隐藏代码' : '显示代码'}
              </Button>
            </div>
            {expandedCode === 'icons' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bedi-code-block"
              >
                <pre><code>{codeExamples.icons}</code></pre>
              </motion.div>
            )}
          </div>

          {/* 幽灵按钮 */}
          <div className="bedi-demo-section">
            <h3 className="bedi-demo-title">幽灵按钮</h3>
            <div className="bedi-style-description">
              <h4>样式解读</h4>
              <p>幽灵按钮在深色背景或复杂背景中表现更佳，具有更好的视觉层次。</p>
              <ul>
                <li><strong>背景透明</strong>：按钮背景透明，融入背景</li>
                <li><strong>边框可见</strong>：保持边框清晰可见</li>
                <li><strong>悬停效果</strong>：悬停时轻微显示背景</li>
              </ul>
            </div>
            <div className="bedi-usage-description">
              <h4>使用说明</h4>
              <p>适用于深色背景、图片背景或需要弱化按钮视觉强度的场景。</p>
            </div>
            <div className="bedi-demo-container" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px' }}>
              <Space>
                <Button variant="ghost">幽灵按钮</Button>
                <Button variant="ghost" icon="🔍">搜索</Button>
                <Button variant="ghost" disabled>禁用状态</Button>
              </Space>
            </div>
            <div className="bedi-demo-actions">
              <Button 
                variant="outline" 
                size="small"
                icon="📋"
                onClick={() => toggleCode('ghost')}
              >
                {expandedCode === 'ghost' ? '隐藏代码' : '显示代码'}
              </Button>
            </div>
            {expandedCode === 'ghost' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bedi-code-block"
              >
                <pre><code>{codeExamples.ghost}</code></pre>
              </motion.div>
            )}
          </div>

          {/* Block按钮 */}
          <div className="bedi-demo-section">
            <h3 className="bedi-demo-title">Block按钮</h3>
            <div className="bedi-style-description">
              <h4>样式解读</h4>
              <p>Block按钮会占满父容器的宽度，提供更强的视觉冲击力。</p>
              <ul>
                <li><strong>宽度100%</strong>：占满父容器宽度</li>
                <li><strong>居中对齐</strong>：文字内容居中显示</li>
                <li><strong>适合移动端</strong>：在移动设备上更易点击</li>
              </ul>
            </div>
            <div className="bedi-usage-description">
              <h4>使用说明</h4>
              <p>常用于表单提交、弹窗底部操作、页面主要操作入口等场景。</p>
            </div>
            <div className="bedi-demo-container">
              <div style={{ width: '100%', maxWidth: '400px' }}>
                <Button variant="primary" block>Block按钮</Button>
                <div style={{ height: '8px' }} />
                <Button variant="outline" block>Block描边按钮</Button>
                <div style={{ height: '8px' }} />
                <Button variant="text" block>Block文字按钮</Button>
              </div>
            </div>
            <div className="bedi-demo-actions">
              <Button 
                variant="outline" 
                size="small"
                icon="📋"
                onClick={() => toggleCode('block')}
              >
                {expandedCode === 'block' ? '隐藏代码' : '显示代码'}
              </Button>
            </div>
            {expandedCode === 'block' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bedi-code-block"
              >
                <pre><code>{codeExamples.block}</code></pre>
              </motion.div>
            )}
          </div>

          {/* 不同颜色主题按钮 */}
          <div className="bedi-demo-section">
            <h3 className="bedi-demo-title">不同颜色主题按钮</h3>
            <div className="bedi-style-description">
              <h4>样式解读</h4>
              <p>不同颜色主题用于传达不同的语义和情感。</p>
              <ul>
                <li><strong>主要色</strong>：用于主要操作，视觉重点</li>
                <li><strong>成功色</strong>：用于成功、完成等积极操作</li>
                <li><strong>警告色</strong>：用于警告、注意等操作</li>
                <li><strong>危险色</strong>：用于删除、取消等危险操作</li>
                <li><strong>信息色</strong>：用于信息提示、帮助等操作</li>
              </ul>
            </div>
            <div className="bedi-usage-description">
              <h4>使用说明</h4>
              <p>颜色选择应符合用户认知习惯，保持界面的一致性和可预测性。</p>
            </div>
            <div className="bedi-demo-container">
              <Space wrap>
                <Button variant="primary">主要按钮</Button>
                <Button variant="success">成功按钮</Button>
                <Button variant="warning">警告按钮</Button>
                <Button variant="danger">危险按钮</Button>
                <Button variant="info">信息按钮</Button>
              </Space>
            </div>
            <div className="bedi-demo-actions">
              <Button 
                variant="outline" 
                size="small"
                icon="📋"
                onClick={() => toggleCode('themes')}
              >
                {expandedCode === 'themes' ? '隐藏代码' : '显示代码'}
              </Button>
            </div>
            {expandedCode === 'themes' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bedi-code-block"
              >
                <pre><code>{codeExamples.themes}</code></pre>
              </motion.div>
            )}
          </div>

          {/* 不同尺寸按钮 */}
          <div className="bedi-demo-section">
            <h3 className="bedi-demo-title">不同尺寸按钮</h3>
            <div className="bedi-style-description">
              <h4>样式解读</h4>
              <p>不同尺寸的按钮适用于不同的场景和设备。</p>
              <ul>
                <li><strong>小号</strong>：高度24px，用于紧凑布局</li>
                <li><strong>中号</strong>：高度32px，默认尺寸，通用场景</li>
                <li><strong>大号</strong>：高度40px，用于重要操作</li>
                <li><strong>特大号</strong>：高度48px，用于移动端或主要入口</li>
              </ul>
            </div>
            <div className="bedi-usage-description">
              <h4>使用说明</h4>
              <p>尺寸选择应考虑使用场景、设备类型和视觉层次。移动端建议使用大号或特大号。</p>
            </div>
            <div className="bedi-demo-container">
              <Space>
                <Button variant="primary" size="small">小号按钮</Button>
                <Button variant="primary" size="medium">中号按钮</Button>
                <Button variant="primary" size="large">大号按钮</Button>
                <Button variant="primary" size="extra-large">特大号按钮</Button>
              </Space>
            </div>
            <div className="bedi-demo-actions">
              <Button 
                variant="outline" 
                size="small"
                icon="📋"
                onClick={() => toggleCode('sizes')}
              >
                {expandedCode === 'sizes' ? '隐藏代码' : '显示代码'}
              </Button>
            </div>
            {expandedCode === 'sizes' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bedi-code-block"
              >
                <pre><code>{codeExamples.sizes}</code></pre>
              </motion.div>
            )}
          </div>

          {/* 自定义渲染元素 */}
          <div className="bedi-demo-section">
            <h3 className="bedi-demo-title">自定义渲染元素</h3>
            <div className="bedi-style-description">
              <h4>样式解读</h4>
              <p>按钮支持自定义渲染元素，可以实现更复杂的交互效果。</p>
              <ul>
                <li><strong>自定义图标</strong>：支持emoji、svg、图片等</li>
                <li><strong>组合元素</strong>：支持多个元素组合</li>
                <li><strong>条件渲染</strong>：根据状态显示不同内容</li>
              </ul>
            </div>
            <div className="bedi-usage-description">
              <h4>使用说明</h4>
              <p>自定义渲染应保持按钮的基本特性，确保可访问性和用户体验。</p>
            </div>
            <div className="bedi-demo-container">
              <Space wrap>
                <Button variant="primary">
                  <span style={{ marginRight: '8px' }}>🚀</span>
                  快速开始
                </Button>
                <Button variant="secondary">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '18px' }}>💎</span>
                    <span>高级功能</span>
                    <span style={{ fontSize: '12px', opacity: 0.7 }}>PRO</span>
                  </div>
                </Button>
                <Button variant="outline">
                  <span>
                    <span style={{ display: 'block', fontSize: '12px', opacity: 0.7 }}>上传文件</span>
                    <span style={{ display: 'block', fontSize: '10px' }}>支持拖拽</span>
                  </span>
                </Button>
              </Space>
            </div>
            <div className="bedi-demo-actions">
              <Button 
                variant="outline" 
                size="small"
                icon="📋"
                onClick={() => toggleCode('custom')}
              >
                {expandedCode === 'custom' ? '隐藏代码' : '显示代码'}
              </Button>
            </div>
            {expandedCode === 'custom' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bedi-code-block"
              >
                <pre><code>{codeExamples.custom}</code></pre>
              </motion.div>
            )}
          </div>
        </section>

        {/* API 文档 */}
        <section className="bedi-section">
          <h2 className="bedi-section-title">API</h2>
          <div className="bedi-api-table">
            <h3>Button Props</h3>
            <table className="bedi-table">
              <thead>
                <tr>
                  <th>参数</th>
                  <th>说明</th>
                  <th>类型</th>
                  <th>默认值</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>variant</code></td>
                  <td>按钮类型</td>
                  <td><code>'primary' | 'secondary' | 'outline' | 'text' | 'danger' | 'ghost' | 'success' | 'warning' | 'info'</code></td>
                  <td><code>'secondary'</code></td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td>按钮尺寸</td>
                  <td><code>'small' | 'medium' | 'large' | 'extra-large'</code></td>
                  <td><code>'medium'</code></td>
                </tr>
                <tr>
                  <td><code>shape</code></td>
                  <td>按钮形状</td>
                  <td><code>'square' | 'round' | 'circle'</code></td>
                  <td><code>'square'</code></td>
                </tr>
                <tr>
                  <td><code>icon</code></td>
                  <td>按钮图标</td>
                  <td><code>ReactNode</code></td>
                  <td>-</td>
                </tr>
                <tr>
                  <td><code>loading</code></td>
                  <td>是否加载中</td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                </tr>
                <tr>
                  <td><code>disabled</code></td>
                  <td>是否禁用</td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                </tr>
                <tr>
                  <td><code>block</code></td>
                  <td>是否块级按钮</td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </motion.div>
        </div>
      </div>
    </div>
  )
}
