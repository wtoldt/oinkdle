import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Tile } from '@/components';
import { Guess } from '@/domain';
import { cn } from '@/utils';

const rowVariants = cva('mx-auto flex', {
  variants: {
    size: {
      big: 'board-gap-big',
      small: 'board-gap-small',
      tiny: 'board-gap-tiny',
    },
  },
  defaultVariants: {
    size: 'big',
  },
});
type RowProps = React.ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof rowVariants> & {
    guess: Guess;
  };

const Row: React.FC<RowProps> = ({ guess, className, size }) => {
  return (
    <div className={cn(rowVariants({ size }), className)}>
      {guess.map(({ letter, evaluation }, index) => (
        <Tile key={index} letter={letter} evaluation={evaluation} size={size} />
      ))}
    </div>
  );
};

export { Row };
