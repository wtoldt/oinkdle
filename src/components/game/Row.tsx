import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Tile } from '@/components/game/Tile';
import {
  DefaultLetterEvaluation,
  type Guess,
  type LetterEvaluation,
} from '@/domain/game';
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
    wordLength: number;
  };

const Row = ({ guess, className, size, current, wordLength }: RowProps) => {
  const emptyTiles: Guess = new Array<LetterEvaluation>(
    wordLength - guess.length,
  ).fill(new DefaultLetterEvaluation());
  return (
    <div className={cn(rowVariants({ size, current }), className)}>
      {[...guess, ...emptyTiles].map(({ letter, evaluation }, index) => (
        <Tile
          key={index}
          letter={letter}
          evaluation={evaluation}
          size={size}
          style={{ '--order': `${index}` } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

Row.displayName = 'Row';
export { Row };
