import React from 'react';
import { designTokens } from '@/lib/design-tokens';

<<<<<<< HEAD
type BoxProps = React.HTMLAttributes<HTMLDivElement> & {
=======
export type BoxProps = React.HTMLAttributes<HTMLDivElement> & {
>>>>>>> 1770abf (Update package.json and improve text formatting across multiple components)
  as?: React.ElementType;
  padding?: keyof typeof designTokens.spacing;
  margin?: keyof typeof designTokens.spacing;
  gap?: keyof typeof designTokens.layout.gap;
  display?: React.CSSProperties['display'];
  justifyContent?: React.CSSProperties['justifyContent'];
  alignItems?: React.CSSProperties['alignItems'];
  flexDirection?: React.CSSProperties['flexDirection'];
  width?: React.CSSProperties['width'];
  height?: React.CSSProperties['height'];
  borderRadius?: keyof typeof designTokens.borderRadius;
  shadow?: keyof typeof designTokens.shadows;
  bgColor?: React.CSSProperties['backgroundColor'];
  borderColor?: React.CSSProperties['borderColor'];
  border?: React.CSSProperties['border'];
  opacity?: React.CSSProperties['opacity'];
  cursor?: React.CSSProperties['cursor'];
  overflow?: React.CSSProperties['overflow'];
  position?: React.CSSProperties['position'];
  top?: React.CSSProperties['top'];
  right?: React.CSSProperties['right'];
  bottom?: React.CSSProperties['bottom'];
  left?: React.CSSProperties['left'];
  zIndex?: keyof typeof designTokens.zIndex;
  transition?: React.CSSProperties['transition'];
};

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      as: Component = 'div',
      padding,
      margin,
      gap,
      display,
      justifyContent,
      alignItems,
      flexDirection,
      width,
      height,
      borderRadius: radius,
      shadow,
      bgColor,
      borderColor,
      border,
      opacity,
      cursor,
      overflow,
      position,
      top,
      right,
      bottom,
      left,
      zIndex: z,
      transition,
      style,
      ...props
    },
    ref
  ) => {
    const computedStyle: React.CSSProperties = {
      padding: padding ? `var(--spacing-${padding})` : undefined,
      margin: margin ? `var(--spacing-${margin})` : undefined,
      gap: gap ? designTokens.layout.gap[gap as keyof typeof designTokens.layout.gap] : undefined,
      display,
      justifyContent,
      alignItems,
      flexDirection,
      width,
      height,
      borderRadius: radius ? designTokens.borderRadius[radius as keyof typeof designTokens.borderRadius] : undefined,
<<<<<<< HEAD
      boxShadow: shadow ? designTokens.shadows[shadow as keyof typeof designTokens.shadows] : undefined,
=======
      boxShadow: shadow ? (designTokens.shadows[shadow as keyof typeof designTokens.shadows] as any) : undefined,
>>>>>>> 1770abf (Update package.json and improve text formatting across multiple components)
      backgroundColor: bgColor,
      borderColor,
      border,
      opacity,
      cursor,
      overflow,
      position,
      top,
      right,
      bottom,
      left,
      zIndex: z ? designTokens.zIndex[z as keyof typeof designTokens.zIndex] : undefined,
      transition: transition || (padding || bgColor || borderColor ? `var(--transition-base)` : undefined),
      ...style,
    };

    return <Component ref={ref} style={computedStyle} {...props} />;
  }
);

Box.displayName = 'Box';
