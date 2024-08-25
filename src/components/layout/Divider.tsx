import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const dividerVariants = cva('', {
  variants: {
    width: {
      full: 'w-full',
      'mostly-full': 'w-5/6',
      half: 'w-1/2',
      quarter: 'w-1/4',
    },
    thickness: {
      thin: 'border-b',
      medium: 'border-b-2',
      thick: 'border-b-4',
      chonk: 'border-b-8',
    },
    rounded: {
      round: 'rounded-full',
      square: 'rounded-none',
    },
    color: {
      primary: 'border-primary',
      secondary: 'border-secondary',
    },
  },
  defaultVariants: {
    width: 'mostly-full',
    thickness: 'medium',
    rounded: 'square',
    color: 'primary',
  },
});

type DividerProps = React.ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof dividerVariants>;

const Divider = ({
  className,
  width,
  thickness,
  rounded,
  color,
}: DividerProps) => {
  return (
    <div className={cn('my-3 flex items-center justify-center', className)}>
      <div
        className={cn(dividerVariants({ width, thickness, rounded, color }))}
      ></div>
    </div>
  );
};
export { Divider };
