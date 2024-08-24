import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Row } from '@/components';
import { Guess } from '@/domain';
import { cn } from '@/utils';

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
  };

const Board = ({ guesses, size, className }: BoardProps) => {
  return (
    <div className={cn(boardVariants({ size }), className)}>
      {guesses.map((guess, index) => (
        <Row key={index} guess={guess} size={size} />
      ))}
    </div>
  );
};

export { Board };
