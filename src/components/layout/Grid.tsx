import React from 'react';
import './Grid.css';

export interface GridProps {
  gutter?: number | [number, number];
  align?: 'top' | 'middle' | 'bottom';
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
  wrap?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export interface ColProps {
  span?: number;
  offset?: number;
  order?: number;
  push?: number;
  pull?: number;
  xs?: number | ColProps;
  sm?: number | ColProps;
  md?: number | ColProps;
  lg?: number | ColProps;
  xl?: number | ColProps;
  xxl?: number | ColProps;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  gutter?: number | [number, number];
}

export const Row: React.FC<GridProps> = ({
  gutter = 0,
  align,
  justify,
  wrap = true,
  className = '',
  style = {},
  children
}) => {
  const rowClassName = [
    'bedi-row',
    align ? `bedi-row-align-${align}` : '',
    justify ? `bedi-row-justify-${justify}` : '',
    !wrap ? 'bedi-row-no-wrap' : '',
    className
  ].filter(Boolean).join(' ');

  const rowStyle = React.useMemo(() => {
    const gutterStyle: React.CSSProperties = {};
    if (typeof gutter === 'number') {
      gutterStyle.marginLeft = -gutter / 2;
      gutterStyle.marginRight = -gutter / 2;
    } else if (Array.isArray(gutter)) {
      gutterStyle.marginLeft = -gutter[0] / 2;
      gutterStyle.marginRight = -gutter[0] / 2;
      gutterStyle.marginTop = -gutter[1] / 2;
      gutterStyle.marginBottom = -gutter[1] / 2;
    }
    return { ...gutterStyle, ...style };
  }, [gutter, style]);

  return (
    <div className={rowClassName} style={rowStyle}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === Col) {
          return React.cloneElement(child, { gutter } as any);
        }
        return child;
      })}
    </div>
  );
};

export const Col: React.FC<ColProps> = ({
  span = 24,
  offset,
  order,
  push,
  pull,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  className = '',
  style = {},
  children,
  gutter
}) => {
  const colClassName = [
    'bedi-col',
    `bedi-col-${span}`,
    offset && `bedi-col-offset-${offset}`,
    order && `bedi-col-order-${order}`,
    push && `bedi-col-push-${push}`,
    pull && `bedi-col-pull-${pull}`,
    typeof xs === 'number' ? `bedi-col-xs-${xs}` : '',
    typeof sm === 'number' ? `bedi-col-sm-${sm}` : '',
    typeof md === 'number' ? `bedi-col-md-${md}` : '',
    typeof lg === 'number' ? `bedi-col-lg-${lg}` : '',
    typeof xl === 'number' ? `bedi-col-xl-${xl}` : '',
    typeof xxl === 'number' ? `bedi-col-xxl-${xxl}` : '',
    className
  ].filter(Boolean).join(' ');

  const colStyle = React.useMemo(() => {
    const paddingStyle: React.CSSProperties = {};
    if (typeof gutter === 'number') {
      paddingStyle.paddingLeft = gutter / 2;
      paddingStyle.paddingRight = gutter / 2;
    } else if (Array.isArray(gutter)) {
      paddingStyle.paddingLeft = gutter[0] / 2;
      paddingStyle.paddingRight = gutter[0] / 2;
      paddingStyle.paddingTop = gutter[1] / 2;
      paddingStyle.paddingBottom = gutter[1] / 2;
    }
    return { ...paddingStyle, ...style };
  }, [gutter, style]);

  return (
    <div className={colClassName} style={colStyle}>
      {children}
    </div>
  );
};

export default { Row, Col };
