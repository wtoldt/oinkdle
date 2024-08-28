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
    currentGuessIndex?: number;
  };

const Board = ({
  guesses,
  size,
  className,
  currentGuessIndex,
  ...props
}: BoardProps) => {
  return (
    <div className={cn(boardVariants({ size }), className)} {...props}>
      {guesses.map((guess, index) => (
        <Row
          key={index}
          guess={guess}
          size={size}
          current={index === currentGuessIndex}
        />
      ))}
    </div>
  );
};

Board.displayName = 'Board';
export { Board };
