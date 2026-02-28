import { Button } from '../components'

export default function ButtonTest() {
  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h1>Button Test Page - Debug</h1>
      
      <div>
        <h3>1. 原生button元素（作为对比）</h3>
        <button style={{
          backgroundColor: '#165DFF',
          color: '#ffffff',
          border: 'none',
          padding: '0 24px',
          height: '40px',
          fontSize: '16px',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          Native Button
        </button>
      </div>
      
      <div>
        <h3>2. Button组件 - 检查渲染的HTML</h3>
        <Button variant="primary" size="large">Primary Button</Button>
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          请在浏览器开发者工具中检查上面这个按钮的实际HTML结构和计算样式
        </div>
      </div>
      
      <div>
        <h3>3. 强制内联样式的Button组件</h3>
        <Button 
          variant="primary" 
          size="large"
          style={{
            color: '#ffffff !important',
            backgroundColor: '#165DFF !important',
            borderColor: '#165DFF !important'
          }}
        >
          Forced Inline Style Button
        </Button>
      </div>
      
      <div>
        <h3>4. 检查Button组件的className</h3>
        <Button variant="primary" size="large" className="test-primary-button">
          Button with custom className
        </Button>
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          className应该是: "bedi-button bedi-button-primary bedi-button-large test-primary-button"
        </div>
      </div>
      
      <div>
        <h3>5. 简化的div模拟Button</h3>
        <div 
          className="bedi-button bedi-button-primary bedi-button-large"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 24px',
            height: '40px',
            fontSize: '16px',
            borderRadius: '6px',
            cursor: 'pointer',
            border: '1px solid #165DFF',
            backgroundColor: '#165DFF',
            color: '#ffffff'
          }}
        >
          Div as Button
        </div>
      </div>
    </div>
  )
}
