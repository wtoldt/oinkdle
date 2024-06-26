import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';
import { type LetterEvaluation } from '@/domain';

const tileVariants = cva(
  `flex h-14 w-14 items-center justify-center rounded-md text-4xl font-bold sm:h-20
  sm:w-20 sm:text-5xl`,
  {
    variants: {
      evaluation: {
        correct: 'bg-green-500 text-white',
        present: 'bg-yellow-500 text-white',
        absent: 'bg-slate-500 text-white',
        unevaluated: 'bg-slate-300 text-black',
      },
    },
    defaultVariants: {
      evaluation: 'unevaluated',
    },
  },
);
type TileProps = React.ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof tileVariants> &
  LetterEvaluation;

const Tile: React.FC<TileProps> = ({ letter, evaluation }) => {
  return <div className={cn(tileVariants({ evaluation }))}>{letter}</div>;
};

export { Tile };
