import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Row } from '@/components/game/Row';
import { Guess } from '@/domain/game';
import { cn } from '@/utils/cn';

const boardVariants = cva('flex flex-col justify-center', {
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
type BoardProps = React.ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof boardVariants> & {
    guesses: Guess[];
    guessesPerRound: number;
    wordLength: number;
  };

const Board = ({
  guesses,
  guessesPerRound,
  wordLength,
  size,
  className,
  ...props
}: BoardProps) => {
  const emptyRows: Guess[] = new Array<Guess>(
    guessesPerRound - guesses.length,
  ).fill([]);
  return (
    <div className={cn(boardVariants({ size }), className)} {...props}>
      {[...guesses, ...emptyRows].map((guess, index) => (
        <Row
          key={index}
          guess={guess}
          wordLength={wordLength}
          size={size}
          current={guesses.length === index + 1}
        />
      ))}
    </div>
  );
};

Board.displayName = 'Board';
export { Board };
