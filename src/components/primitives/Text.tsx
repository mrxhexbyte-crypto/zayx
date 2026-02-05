import React from 'react';
import { Box, type BoxProps } from './Box';
import { designTokens } from '@/lib/design-tokens';

type TextProps = BoxProps & {
  as?: 'p' | 'span' | 'div' | 'label';
  size?: keyof typeof designTokens.typography.fontSize;
  weight?: keyof typeof designTokens.typography.fontWeight;
  color?: React.CSSProperties['color'];
  lineHeight?: keyof typeof designTokens.typography.lineHeight;
  letterSpacing?: keyof typeof designTokens.typography.letterSpacing;
  align?: React.CSSProperties['textAlign'];
  truncate?: boolean;
  ellipsis?: boolean;
  italic?: boolean;
  uppercase?: boolean;
  lowercase?: boolean;
  capitalize?: boolean;
  variant?: 'body' | 'caption' | 'label' | 'code';
};

export const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      as = 'p',
      size,
      weight,
      color,
      lineHeight,
      letterSpacing,
      align,
      truncate,
      ellipsis,
      italic,
      uppercase,
      lowercase,
      capitalize,
      variant,
      style,
      ...props
    },
    ref
  ) => {
    const getVariantStyles = (v?: string): React.CSSProperties => {
      switch (v) {
        case 'body':
          return {
            fontSize: designTokens.typography.fontSize.base,
            fontWeight: designTokens.typography.fontWeight.normal,
            lineHeight: designTokens.typography.lineHeight.normal,
          };
        case 'caption':
          return {
            fontSize: designTokens.typography.fontSize.sm,
            fontWeight: designTokens.typography.fontWeight.normal,
            lineHeight: designTokens.typography.lineHeight.tight,
          };
        case 'label':
          return {
            fontSize: designTokens.typography.fontSize.sm,
            fontWeight: designTokens.typography.fontWeight.medium,
            lineHeight: designTokens.typography.lineHeight.tight,
          };
        case 'code':
          return {
            fontSize: designTokens.typography.fontSize.sm,
            fontFamily: designTokens.typography.fontFamily.mono,
            lineHeight: designTokens.typography.lineHeight.normal,
          };
        default:
          return {};
      }
    };

    const computedStyle: React.CSSProperties = {
      ...getVariantStyles(variant),
      fontSize: size ? designTokens.typography.fontSize[size as keyof typeof designTokens.typography.fontSize] : undefined,
      fontWeight: weight ? designTokens.typography.fontWeight[weight as keyof typeof designTokens.typography.fontWeight] : undefined,
      color,
      lineHeight: lineHeight ? designTokens.typography.lineHeight[lineHeight as keyof typeof designTokens.typography.lineHeight] : undefined,
      letterSpacing: letterSpacing ? designTokens.typography.letterSpacing[letterSpacing as keyof typeof designTokens.typography.letterSpacing] : undefined,
      textAlign: align,
      fontStyle: italic ? 'italic' : undefined,
      textTransform: uppercase ? 'uppercase' : lowercase ? 'lowercase' : capitalize ? 'capitalize' : undefined,
      whiteSpace: truncate ? 'nowrap' : undefined,
      overflow: truncate ? 'hidden' : undefined,
      textOverflow: (truncate || ellipsis) ? 'ellipsis' : undefined,
      display: ellipsis ? '-webkit-box' : undefined,
      WebkitBoxOrient: ellipsis ? 'vertical' : undefined,
      WebkitLineClamp: ellipsis ? 2 : undefined,
      ...style,
    };

    return <Box ref={ref} as={as} style={computedStyle} {...props} />;
  }
);

Text.displayName = 'Text';
