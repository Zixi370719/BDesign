import React from 'react';
import './Divider.css';

export interface DividerProps {
  type?: 'horizontal' | 'vertical';
  orientation?: 'left' | 'center' | 'right';
  dashed?: boolean;
  plain?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const Divider: React.FC<DividerProps> = ({
  type = 'horizontal',
  orientation = 'center',
  dashed = false,
  plain = false,
  className = '',
  style = {},
  children
}) => {
  const dividerClassName = [
    'bedi-divider',
    `bedi-divider-${type}`,
    children ? `bedi-divider-with-text bedi-divider-with-text-${orientation}` : '',
    dashed ? 'bedi-divider-dashed' : '',
    plain ? 'bedi-divider-plain' : '',
    className
  ].filter(Boolean).join(' ');

  if (type === 'vertical') {
    return <div className={dividerClassName} style={style} />;
  }

  return (
    <div className={dividerClassName} style={style}>
      {children && (
        <span className="bedi-divider-inner-text">
          {children}
        </span>
      )}
    </div>
  );
};

export default Divider;
