import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

//perfect px is px-[0.85rem] sm:px-6
//widths measured on screen: 37.09px sm:59px
const keyVariants = cva(
  `btn flex h-14 flex-1 items-center justify-center rounded-sm font-mono text-lg
  font-semibold sm:h-12 sm:flex-none sm:rounded-md sm:px-6 sm:text-xl sm:font-bold`,
  {
    variants: {
      evaluation: {
        correct: 'evaluation-correct',
        present: 'evaluation-present',
        absent: 'evaluation-absent',
        unevaluated: 'evaluation-unevaluated',
      },
    },
    defaultVariants: {
      evaluation: 'unevaluated',
    },
  },
);
type KeyProps = React.ComponentPropsWithoutRef<'button'> &
  VariantProps<typeof keyVariants>;
const Key = ({ children, className, evaluation, onClick }: KeyProps) => {
  return (
    <button
      className={cn(keyVariants({ evaluation }), className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Key.displayName = 'Key';
export { Key };
