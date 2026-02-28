import React from 'react';
import './StickyTool.css';

export interface StickyToolItemProps {
  key: string;
  icon: React.ReactNode;
  title?: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface StickyToolProps {
  position?: 'left' | 'right';
  offset?: number;
  direction?: 'vertical' | 'horizontal';
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const StickyToolItem: React.FC<StickyToolItemProps> = ({
  key,
  icon,
  title,
  onClick,
  className = '',
  style = {}
}) => {
  return (
    <div
      className={`bedi-sticky-tool-item ${className}`}
      style={style}
      onClick={onClick}
      title={title}
    >
      {icon}
    </div>
  );
};

export const StickyTool: React.FC<StickyToolProps> = ({
  position = 'right',
  offset = 100,
  direction = 'vertical',
  className = '',
  style = {},
  children
}) => {
  const toolClassName = [
    'bedi-sticky-tool',
    `bedi-sticky-tool-${position}`,
    `bedi-sticky-tool-${direction}`,
    className
  ].filter(Boolean).join(' ');

  const toolStyle: React.CSSProperties = {
    [position]: offset,
    ...style
  };

  return (
    <div className={toolClassName} style={toolStyle}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === StickyToolItem) {
          return child;
        }
        return null;
      })}
    </div>
  );
};

StickyTool.Item = StickyToolItem;

export default StickyTool;
