import React from 'react';
import { Box, type BoxProps } from './Box';

type GridProps = BoxProps & {
  columns?: number | string;
  rows?: number | string;
  gap?: string | number;
  rowGap?: string | number;
  colGap?: string | number;
  autoFlow?: React.CSSProperties['gridAutoFlow'];
  autoRows?: React.CSSProperties['gridAutoRows'];
  autoColumns?: React.CSSProperties['gridAutoColumns'];
};

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      columns,
      rows,
      gap,
      rowGap,
      colGap,
      autoFlow,
      autoRows,
      autoColumns,
      style,
      ...props
    },
    ref
  ) => {
    const gridStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns,
      gridTemplateRows: typeof rows === 'number' ? `repeat(${rows}, 1fr)` : rows,
      gap: typeof gap === 'string' ? gap : gap ? `${gap}px` : undefined,
      rowGap: typeof rowGap === 'string' ? rowGap : rowGap ? `${rowGap}px` : undefined,
      columnGap: typeof colGap === 'string' ? colGap : colGap ? `${colGap}px` : undefined,
      gridAutoFlow: autoFlow,
      gridAutoRows: autoRows,
      gridAutoColumns: autoColumns,
      ...style,
    };

    return <Box ref={ref} style={gridStyle} {...props} />;
  }
);

Grid.displayName = 'Grid';
