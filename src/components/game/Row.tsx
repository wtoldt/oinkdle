import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Tile } from '@/components/game/Tile';
import { Guess } from '@/domain/game';
import { cn } from '@/utils/cn';

const rowVariants = cva('mx-auto flex', {
  variants: {
    size: {
      big: 'board-gap-big',
      small: 'board-gap-small',
      tiny: 'board-gap-tiny',
    },
    current: {
      true: 'current',
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

const Row = ({ guess, className, size, current }: RowProps) => {
  return (
    <div className={cn(rowVariants({ size, current }), className)}>
      {guess.map(({ letter, evaluation }, index) => (
        <Tile key={index} letter={letter} evaluation={evaluation} size={size} />
      ))}
    </div>
  );
};

Row.displayName = 'Row';
export { Row };
