import React, { useState, useEffect, useRef } from 'react';
import './Affix.css';

export interface AffixProps {
  offsetTop?: number;
  offsetBottom?: number;
  target?: () => Window | HTMLElement;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  onChange?: (affixed: boolean) => void;
}

export const Affix: React.FC<AffixProps> = ({
  offsetTop = 0,
  offsetBottom,
  target = () => window,
  className = '',
  style = {},
  children,
  onChange
}) => {
  const [affixed, setAffixed] = useState(false);
  const [affixedStyle, setAffixedStyle] = useState<React.CSSProperties>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const targetElement = target();
      const scrollTop = targetElement instanceof Window 
        ? targetElement.pageYOffset 
        : targetElement.scrollTop;
      
      const containerRect = containerRef.current?.getBoundingClientRect();
      const placeholderRect = placeholderRef.current?.getBoundingClientRect();

      if (!containerRect || !placeholderRect) return;

      let shouldAffix = false;
      let newStyle: React.CSSProperties = {};

      if (offsetBottom !== undefined) {
        const windowHeight = targetElement instanceof Window 
          ? targetElement.innerHeight 
          : targetElement.clientHeight;
        const distanceToBottom = windowHeight - (placeholderRect.bottom);
        shouldAffix = distanceToBottom <= offsetBottom;
        
        if (shouldAffix) {
          newStyle = {
            position: 'fixed',
            bottom: offsetBottom,
            left: placeholderRect.left,
            width: placeholderRect.width,
            zIndex: 1000
          };
        }
      } else {
        shouldAffix = placeholderRect.top <= offsetTop;
        
        if (shouldAffix) {
          newStyle = {
            position: 'fixed',
            top: offsetTop,
            left: placeholderRect.left,
            width: placeholderRect.width,
            zIndex: 1000
          };
        }
      }

      if (shouldAffix !== affixed) {
        setAffixed(shouldAffix);
        onChange?.(shouldAffix);
      }

      setAffixedStyle(newStyle);
    };

    const targetElement = target();
    targetElement.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      targetElement.removeEventListener('scroll', handleScroll);
    };
  }, [offsetTop, offsetBottom, target, affixed, onChange]);

  return (
    <div ref={placeholderRef} style={{ position: 'relative' }}>
      <div
        ref={containerRef}
        className={`bedi-affix ${affixed ? 'bedi-affix-fixed' : ''} ${className}`}
        style={affixed ? { ...style, ...affixedStyle } : style}
      >
        {children}
      </div>
    </div>
  );
};

export default Affix;
