import * as React from 'react';
import { Guess } from '@/domain';
import { Row } from '@/components';
import { cn } from '@/utils';

type BoardProps = React.ComponentPropsWithoutRef<'div'> & {
  guesses: Guess[];
};

const Board = ({ guesses, className }: BoardProps) => {
  return (
    <div
      className={cn('board-element flex flex-col justify-center', className)}
    >
      {guesses.map((guess, index) => (
        <Row key={index} guess={guess} />
      ))}
    </div>
  );
};

export { Board };
