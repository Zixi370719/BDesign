# 三级标题样式使用指南

## 概述

项目中定义了统一的三级标题样式，用于保持设计的一致性。三级标题通常用于：

- 应用指南下的子标题（如"UI应用指南"、"数据可视化应用指南"）
- 组件文档中的子章节标题
- 功能模块中的小节标题

## 样式类名

### 基础样式

| 类名 | 用途 | margin-bottom |
|------|------|---------------|
| `.third-level-title` | 标准三级标题 | `var(--spacing-md)` (16px) |
| `.third-level-title-small-margin` | 小间距三级标题 | `var(--spacing-sm)` (8px) |
| `.third-level-title-no-margin` | 无间距三级标题 | 0 |

### 对齐方式

| 类名 | 用途 | 对齐方式 |
|------|------|----------|
| `.third-level-title-left-align` | 左对齐三级标题 | left |
| `.third-level-title-center` | 居中三级标题 | center |

### 特殊样式

| 类名 | 用途 | 特点 |
|------|------|------|
| `.third-level-title-underline` | 带下划线的三级标题 | 浅灰色渐变下划线 |

## 使用示例

### 基础用法

```jsx
// 标准三级标题
<h4 className="third-level-title">UI 应用指南</h4>

// 小间距三级标题
<h4 className="third-level-title-small-margin">功能介绍</h4>

// 居中对齐
<h4 className="third-level-title-center">章节标题</h4>
```

### 带下划线样式

```jsx
// 带浅灰色渐变下划线
<h4 className="third-level-title-underline">重要说明</h4>
```

## 样式规范

- **字体大小**: 18px
- **字体粗细**: 600 (semi-bold)
- **颜色**: `var(--color-text-1)` (主文本色)
- **间距**: 根据类名不同而变化

## 已应用位置

- Design页面：应用指南下的"UI应用指南"和"数据可视化应用指南"
- 可扩展到其他需要三级标题的页面

## 注意事项

1. 三级标题不添加分割线（区别于二级标题）
2. 使用语义化的HTML标签（如`<h4>`）
3. 保持与二级标题的视觉层次清晰
