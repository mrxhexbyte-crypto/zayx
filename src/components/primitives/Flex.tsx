import React from 'react';
import { Box, type BoxProps } from './Box';

<<<<<<< HEAD
type FlexProps = BoxProps & {
=======
export type FlexProps = BoxProps & {
>>>>>>> 1770abf (Update package.json and improve text formatting across multiple components)
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
  gap?: string | number;
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  flex?: React.CSSProperties['flex'];
};

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      direction = 'row',
      align = 'stretch',
      justify = 'start',
      gap,
      wrap = 'nowrap',
      flex,
      ...props
    },
    ref
  ) => {
    const alignMap: Record<string, React.CSSProperties['alignItems']> = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      stretch: 'stretch',
      baseline: 'baseline',
    };

    const justifyMap: Record<string, React.CSSProperties['justifyContent']> = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      'space-between': 'space-between',
      'space-around': 'space-around',
      'space-evenly': 'space-evenly',
    };

    return (
      <Box
        ref={ref}
        display="flex"
        flexDirection={direction as React.CSSProperties['flexDirection']}
        alignItems={alignMap[align]}
        justifyContent={justifyMap[justify]}
        gap={typeof gap === 'string' ? gap : gap ? `${gap}px` : undefined}
<<<<<<< HEAD
        style={{ flexWrap: wrap, ...props.style }}
        flex={flex}
=======
        style={{ flexWrap: wrap, flex, ...props.style }}
>>>>>>> 1770abf (Update package.json and improve text formatting across multiple components)
        {...props}
      />
    );
  }
);

Flex.displayName = 'Flex';
