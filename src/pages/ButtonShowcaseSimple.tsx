import Button from '../components/basic/Button'

export default function ButtonShowcaseSimple() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Button 组件展示</h1>
      <p>这是简化版本，用于测试基本功能</p>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>基础按钮</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button variant="primary">主要按钮</Button>
          <Button variant="secondary">次要按钮</Button>
          <Button variant="outline">描边按钮</Button>
          <Button variant="text">文字按钮</Button>
          <Button variant="danger">危险按钮</Button>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>不同尺寸</h2>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Button variant="primary" size="small">小号</Button>
          <Button variant="primary" size="medium">中号</Button>
          <Button variant="primary" size="large">大号</Button>
          <Button variant="primary" size="extra-large">特大号</Button>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>状态按钮</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button variant="primary" loading>加载中</Button>
          <Button variant="secondary" disabled>禁用状态</Button>
          <Button variant="outline" loading disabled>加载禁用</Button>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>图标按钮</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button variant="primary" icon="📤">发送</Button>
          <Button variant="secondary" icon="👤">用户</Button>
          <Button variant="outline" icon="📧">邮件</Button>
          <Button variant="text" icon="🔍">搜索</Button>
          <Button variant="primary" shape="circle" icon="⚙️" />
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Block 按钮</h2>
        <div style={{ maxWidth: '400px' }}>
          <Button variant="primary" block style={{ marginBottom: '10px' }}>
            块级按钮
          </Button>
          <Button variant="outline" block>
            块级描边按钮
          </Button>
        </div>
      </div>
    </div>
  )
}
