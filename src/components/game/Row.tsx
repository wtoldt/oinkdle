import * as React from 'react';
import { cn } from '@/utils';
import { Guess } from '@/domain';
import { Tile } from '@/components';

interface RowProps extends React.ComponentPropsWithoutRef<'div'> {
  guess: Guess;
}

const Row: React.FC<RowProps> = ({ guess, className }) => {
  return (
    <div className={cn('board-element mx-auto flex', className)}>
      {guess.map(({ letter, evaluation }, index) => (
        <Tile key={index} letter={letter} evaluation={evaluation} />
      ))}
    </div>
  );
};

export { Row };
