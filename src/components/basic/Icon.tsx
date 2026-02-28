import React from 'react';

export interface IconProps {
  name?: string;
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const Icon: React.FC<IconProps> = ({
  name = 'default',
  size = 16,
  color = 'currentColor',
  className = '',
  style = {},
  onClick
}) => {
  const iconStyle: React.CSSProperties = {
    width: size,
    height: size,
    color,
    ...style
  };

  return (
    <span
      className={`bedi-icon bedi-icon-${name} ${className}`}
      style={iconStyle}
      onClick={onClick}
      role="img"
      aria-label={`icon-${name}`}
    >
      {name}
    </span>
  );
};

export default Icon;
