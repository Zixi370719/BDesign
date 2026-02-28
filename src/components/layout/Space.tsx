import React from 'react';
import './Space.css';

export interface SpaceProps {
  size?: 'small' | 'medium' | 'large' | number;
  direction?: 'horizontal' | 'vertical';
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  wrap?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const Space: React.FC<SpaceProps> = ({
  size = 'medium',
  direction = 'horizontal',
  align = 'start',
  wrap = false,
  className = '',
  style = {},
  children
}) => {
  const spaceClassName = [
    'bedi-space',
    `bedi-space-${direction}`,
    `bedi-space-align-${align}`,
    wrap ? 'bedi-space-wrap' : '',
    className
  ].filter(Boolean).join(' ');

  const spaceStyle = React.useMemo(() => {
    const gapStyle: React.CSSProperties = {};
    
    if (typeof size === 'number') {
      gapStyle.gap = `${size}px`;
    } else {
      const sizeMap = {
        small: '8px',
        medium: '16px',
        large: '24px'
      };
      gapStyle.gap = sizeMap[size];
    }

    return { ...gapStyle, ...style };
  }, [size, style]);

  return (
    <div className={spaceClassName} style={spaceStyle}>
      {React.Children.map(children, (child) => {
        if (child === null || child === undefined) {
          return null;
        }
        return <div className="bedi-space-item">{child}</div>;
      })}
    </div>
  );
};

export default Space;
