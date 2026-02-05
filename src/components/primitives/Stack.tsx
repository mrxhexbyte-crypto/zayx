import React from 'react';
import { Flex, type FlexProps } from './Flex';

type StackProps = Omit<FlexProps, 'direction'> & {
  direction?: 'vertical' | 'horizontal';
};

/**
 * Stack: Convenient wrapper for Flex with preset direction
 * - VStack: Vertical stack (column)
 * - HStack: Horizontal stack (row)
 */
export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ direction = 'vertical', ...props }, ref) => {
    const flexDirection = direction === 'vertical' ? 'column' : 'row';

    return <Flex ref={ref} direction={flexDirection} {...props} />;
  }
);

Stack.displayName = 'Stack';

export const VStack = React.forwardRef<HTMLDivElement, Omit<FlexProps, 'direction'>>(
  (props, ref) => <Stack ref={ref} direction="vertical" {...props} />
);

VStack.displayName = 'VStack';

export const HStack = React.forwardRef<HTMLDivElement, Omit<FlexProps, 'direction'>>(
  (props, ref) => <Stack ref={ref} direction="horizontal" {...props} />
);

HStack.displayName = 'HStack';
