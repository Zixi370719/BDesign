import { motion } from 'framer-motion'
import { 
  // 基础组件
  Button, Icon, Link,
  // 布局组件  
  Divider, Grid, Layout, Space,
  // 导航组件
  Affix, BackTop, Menu,
  // 输入组件
  Input, Checkbox, Radio, Switch,
  // 数据展示组件
  Avatar, Badge, Card, Tag, Tooltip,
  // 消息提醒组件
  Alert,
  // 子组件
  Header, Content, Footer, MenuItem
} from '../components'

const { Row, Col } = Grid

export default function ComponentShowcaseSimple() {
  return (
    <div className="component-showcase">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="showcase-header">
          <h1>🎨 组件展示</h1>
          <p>基于新分类结构的组件库展示</p>
        </div>

        {/* 基础组件展示 */}
        <section className="showcase-section">
          <h2>🔧 基础组件</h2>
          <div className="component-grid">
            <Card title="Button 按钮">
              <Space direction="vertical" size={16}>
                <div>
                  <h4>变体</h4>
                  <Space wrap>
                    <Button variant="primary">主要按钮</Button>
                    <Button variant="secondary">次要按钮</Button>
                    <Button variant="outline">线性按钮</Button>
                    <Button variant="text">文字按钮</Button>
                    <Button variant="danger">危险按钮</Button>
                    <Button variant="ghost">幽灵按钮</Button>
                  </Space>
                </div>
                
                <div>
                  <h4>尺寸</h4>
                  <Space align="center">
                    <Button variant="primary" size="small">小号</Button>
                    <Button variant="primary" size="medium">中号</Button>
                    <Button variant="primary" size="large">大号</Button>
                    <Button variant="primary" size="extra-large">特大号</Button>
                  </Space>
                </div>
                
                <div>
                  <h4>形状</h4>
                  <Space align="center">
                    <Button variant="primary" shape="square">方形</Button>
                    <Button variant="primary" shape="round">圆角</Button>
                    <Button variant="primary" shape="circle" icon="⚙️" />
                  </Space>
                </div>
                
                <div>
                  <h4>状态</h4>
                  <Space>
                    <Button variant="primary" loading>加载中</Button>
                    <Button variant="primary" disabled>禁用</Button>
                    <Button variant="primary" block>块级按钮</Button>
                  </Space>
                </div>
              </Space>
            </Card>
            
            <Card title="Icon 图标">
              <Space>
                <Icon name="home" size={20} />
                <Icon name="user" size={24} color="#1890ff" />
                <Icon name="setting" size={28} color="#52c41a" />
              </Space>
            </Card>
            
            <Card title="Link 链接">
              <Space direction="vertical">
                <Link href="#" underline={false}>无下划线链接</Link>
                <Link href="#">默认链接</Link>
              </Space>
            </Card>
          </div>
        </section>

        {/* 布局组件展示 */}
        <section className="showcase-section">
          <h2>📐 布局组件</h2>
          <div className="component-grid">
            <Card title="Divider 分割线">
              <Space direction="vertical" style={{ width: '100%' }}>
                <span>上方内容</span>
                <Divider />
                <span>下方内容</span>
                <Divider>带文字的分割线</Divider>
                <span>更多内容</span>
              </Space>
            </Card>
            
            <Card title="Grid 栅格">
              <Row gutter={16}>
                <Col span={8}>
                  <div className="grid-demo">col-8</div>
                </Col>
                <Col span={8}>
                  <div className="grid-demo">col-8</div>
                </Col>
                <Col span={8}>
                  <div className="grid-demo">col-8</div>
                </Col>
              </Row>
            </Card>
            
            <Card title="Space 间距">
              <Space size="large">
                <Avatar>A</Avatar>
                <Avatar>B</Avatar>
                <Avatar>C</Avatar>
              </Space>
            </Card>
          </div>
        </section>

        {/* 导航组件展示 */}
        <section className="showcase-section">
          <h2>🧭 导航组件</h2>
          <div className="component-grid">
            <Card title="Menu 导航菜单">
              <Menu mode="vertical" style={{ width: '200px' }}>
                <MenuItem key="1">菜单项1</MenuItem>
                <MenuItem key="2">菜单项2</MenuItem>
                <MenuItem key="3">菜单项3</MenuItem>
              </Menu>
            </Card>
            
            <Card title="Affix 固钉">
              <Affix offsetTop={10}>
                <Button variant="primary">固定在顶部</Button>
              </Affix>
            </Card>
          </div>
        </section>

        {/* 输入组件展示 */}
        <section className="showcase-section">
          <h2>📝 输入组件</h2>
          <div className="component-grid">
            <Card title="Input 输入框">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Input placeholder="请输入内容" />
                <Input placeholder="禁用状态" disabled />
              </Space>
            </Card>
            
            <Card title="Checkbox & Radio">
              <Space direction="vertical">
                <Checkbox>复选框选项</Checkbox>
                <Radio>单选框选项</Radio>
                <Switch />
              </Space>
            </Card>
          </div>
        </section>

        {/* 数据展示组件展示 */}
        <section className="showcase-section">
          <h2>👁️ 数据展示组件</h2>
          <div className="component-grid">
            <Card title="Avatar & Badge">
              <Space>
                <Badge count={5}>
                  <Avatar>A</Avatar>
                </Badge>
                <Badge dot>
                  <Avatar>B</Avatar>
                </Badge>
              </Space>
            </Card>
            
            <Card title="Tag 标签">
              <Space>
                <Tag>标签1</Tag>
                <Tag color="primary">主要标签</Tag>
                <Tag color="success">成功标签</Tag>
              </Space>
            </Card>
            
            <Card title="Tooltip 文字提示">
              <Space>
                <Tooltip title="这是一个提示">
                  <Button>悬停显示提示</Button>
                </Tooltip>
              </Space>
            </Card>
          </div>
        </section>

        {/* 消息提醒组件展示 */}
        <section className="showcase-section">
          <h2>💬 消息提醒组件</h2>
          <div className="component-grid">
            <Card title="Alert 警告提醒">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Alert type="success">成功提示</Alert>
                <Alert type="warning">警告提示</Alert>
                <Alert type="error">错误提示</Alert>
              </Space>
            </Card>
          </div>
        </section>

        {/* 综合展示 */}
        <section className="showcase-section">
          <h2>🎯 综合展示</h2>
          <Card title="完整的页面布局示例">
            <Layout style={{ height: '300px' }}>
              <Header style={{ background: '#f0f2f5', padding: '0 20px' }}>
                <Space>
                  <Icon name="home" />
                  <span>设计系统</span>
                </Space>
              </Header>
              <Content style={{ padding: '20px', background: '#fff' }}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Card title="用户信息">
                      <Space>
                        <Avatar>U</Avatar>
                        <div>
                          <div>用户名</div>
                          <div style={{ fontSize: '12px', color: '#999' }}>user@example.com</div>
                        </div>
                      </Space>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card title="操作按钮">
                      <Space>
                        <Button variant="primary">编辑</Button>
                        <Button variant="outline">删除</Button>
                      </Space>
                    </Card>
                  </Col>
                </Row>
              </Content>
              <Footer style={{ textAlign: 'center', background: '#f0f2f5' }}>
                <Space>
                  <Link href="#" underline={false}>隐私政策</Link>
                  <Divider type="vertical" />
                  <Link href="#" underline={false}>使用条款</Link>
                </Space>
              </Footer>
            </Layout>
          </Card>
        </section>

        {/* 统计信息 */}
        <section className="showcase-section">
          <h2>📊 组件统计</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">6</div>
              <div className="stat-label">组件分类</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">65</div>
              <div className="stat-label">组件总数</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">11</div>
              <div className="stat-label">已实现</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">54</div>
              <div className="stat-label">开发中</div>
            </div>
          </div>
        </section>
      </motion.div>

      {/* 回到顶部按钮 */}
      <BackTop />
    </div>
  )
}
