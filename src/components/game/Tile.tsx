import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { type LetterEvaluation } from '@/domain/game';
import { cn } from '@/utils/cn';

const tileVariants = cva('flex items-center justify-center', {
  variants: {
    evaluation: {
      correct: 'evaluated evaluation-correct',
      present: 'evaluated evaluation-present',
      absent: 'evaluated evaluation-absent',
      unevaluated: 'evaluation-unevaluated',
    },
    size: {
      big: 'h-14 w-14 rounded-md text-4xl font-bold sm:h-20 sm:w-20 sm:text-5xl',
      small: [
        `h-7 w-7 rounded text-base font-medium sm:h-12 sm:w-12 sm:rounded-md sm:text-3xl
        sm:font-bold`,
      ],
      tiny: 'h-2 w-2 sm:h-3 sm:w-3 sm:rounded',
    },
  },
  defaultVariants: {
    evaluation: 'unevaluated',
    size: 'big',
  },
});
type TileProps = React.ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof tileVariants> &
  LetterEvaluation;

const Tile = ({ letter, evaluation, size, className, ...props }: TileProps) => {
  return (
    <div
      className={cn(
        tileVariants({ evaluation, size }),
        { filled: letter },
        { unfilled: !letter },
        className,
      )}
      {...props}
    >
      {size === 'tiny' ? '' : letter}
    </div>
  );
};

Tile.displayName = 'Tile';
export { Tile };
