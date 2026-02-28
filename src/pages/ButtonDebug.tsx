import { Button } from '../components'

export default function ButtonDebug() {
  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h1>Button Hover Debug - 深度调查</h1>
      
      <div>
        <h3>1. 原始Button组件测试</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </div>

      <div>
        <h3>2. 强制移除所有可能的覆盖元素</h3>
        <style>{`
          .no-overlay::before,
          .no-overlay::after {
            display: none !important;
          }
          .no-overlay *::before,
          .no-overlay *::after {
            display: none !important;
          }
          .no-overlay {
            box-shadow: none !important;
            filter: none !important;
            backdrop-filter: none !important;
          }
        `}</style>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button variant="primary" className="no-overlay">No Overlay Primary</Button>
          <Button variant="danger" className="no-overlay">No Overlay Danger</Button>
        </div>
      </div>

      <div>
        <h3>3. 检查文字元素本身</h3>
        <style>{`
          .text-debug .bedi-button-text {
            background: red !important;
            z-index: 9999 !important;
            position: relative !important;
          }
        `}</style>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button variant="primary" className="text-debug">Text Debug Primary</Button>
          <Button variant="danger" className="text-debug">Text Debug Danger</Button>
        </div>
      </div>

      <div>
        <h3>4. 检查是否是CSS变量问题</h3>
        <style>{`
          .no-vars {
            --color-primary: #165DFF !important;
            --color-primary-hover: #4080FF !important;
            --color-primary-active: #0E42D2 !important;
            --color-error: #F53F3F !important;
            --color-error-hover: #F76560 !important;
            --color-error-active: #CB272D !important;
          }
        `}</style>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button variant="primary" className="no-vars">Fixed Vars Primary</Button>
          <Button variant="danger" className="no-vars">Fixed Vars Danger</Button>
        </div>
      </div>

      <div>
        <h3>5. 完全重写的按钮（对比）</h3>
        <button 
          style={{
            backgroundColor: '#165DFF',
            color: '#ffffff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          Custom Primary
        </button>
        <button 
          style={{
            backgroundColor: '#F53F3F',
            color: '#ffffff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          Custom Danger
        </button>
      </div>

      <div>
        <h3>6. 完全隔离的测试 - 移除所有外部CSS影响</h3>
        <style>{`
          .isolated {
            all: initial !important;
            font-family: inherit !important;
            font-size: 14px !important;
            font-weight: 500 !important;
            line-height: 1 !important;
            text-align: center !important;
            white-space: nowrap !important;
            vertical-align: middle !important;
            box-sizing: border-box !important;
            margin: 0 !important;
            padding: 8px 16px !important;
            height: 32px !important;
            border: 1px solid transparent !important;
            border-radius: 4px !important;
            cursor: pointer !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            position: relative !important;
            overflow: visible !important;
            background: #165DFF !important;
            color: #ffffff !important;
            transition: all 0.2s !important;
          }
          
          .isolated:hover {
            background: #4080FF !important;
          }
          
          .isolated:active {
            background: #0E42D2 !important;
            transform: translateY(1px) !important;
          }
          
          .isolated-danger {
            background: #F53F3F !important;
            color: #ffffff !important;
          }
          
          .isolated-danger:hover {
            background: #F76560 !important;
          }
          
          .isolated-danger:active {
            background: #CB272D !important;
            transform: translateY(1px) !important;
          }
        `}</style>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="isolated">Isolated Primary</button>
          <button className="isolated-danger">Isolated Danger</button>
        </div>
      </div>

      <div>
        <h3>7. 检查HTML结构</h3>
        <p>请在开发者工具中检查：</p>
        <ul>
          <li>Button组件渲染的HTML结构</li>
          <li>是否有嵌套的span元素</li>
          <li>hover时的计算样式变化</li>
          <li>是否有意外的CSS规则被应用</li>
        </ul>
      </div>
    </div>
  )
}
