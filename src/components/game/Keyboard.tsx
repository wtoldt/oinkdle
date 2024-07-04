import * as React from 'react';
import { cn } from '@/utils';
import { type Guess, type Evaluation } from '@/domain';
import { CornerDownLeft, Delete } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

const topRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
const middleRow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
const bottomRow = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

//perfect px is px-[0.85rem] sm:px-6
//widths measured on screen: 37.09px sm:59px
const keyVariants = cva(
  `btn flex h-14 flex-1 items-center justify-center rounded-sm font-mono text-lg
  font-semibold sm:h-12 sm:flex-none sm:rounded-md sm:px-6 sm:text-xl sm:font-bold`,
  {
    variants: {
      evaluation: {
        correct: 'evaluation-correct',
        present: 'evaluation-present',
        absent: 'evaluation-absent',
        unevaluated: 'evaluation-unevaluated',
      },
    },
    defaultVariants: {
      evaluation: 'unevaluated',
    },
  },
);
type KeyProps = React.ComponentPropsWithoutRef<'button'> &
  VariantProps<typeof keyVariants>;
const Key = ({ children, className, evaluation }: KeyProps) => {
  return (
    <button className={cn(keyVariants({ evaluation }), className)}>
      {children}
    </button>
  );
};

const Keyboard = ({ currentGuesses }: { currentGuesses: Guess[] }) => {
  const letterEvaluationLookup = (letter: string): Evaluation => {
    return (
      currentGuesses
        .flat()
        .find(({ letter: evaluatedLetter }) => evaluatedLetter === letter)
        ?.evaluation ?? 'unevaluated'
    );
  };
  const rowStyle = 'flex w-full items-center justify-center gap-x-1 ';
  return (
    <div className="flex flex-col items-center justify-center gap-y-3 pb-3 sm:gap-y-1">
      <div className={rowStyle}>
        {topRow.map((letter) => (
          <Key key={letter} evaluation={letterEvaluationLookup(letter)}>
            {letter}
          </Key>
        ))}
      </div>
      <div className={rowStyle}>
        <div style={{ flex: '.5' }}>{/*spacer*/}</div>
        {middleRow.map((letter) => (
          <Key key={letter} evaluation={letterEvaluationLookup(letter)}>
            {letter}
          </Key>
        ))}
        <div style={{ flex: '.5' }}>{/*spacer*/}</div>
      </div>
      <div className={rowStyle}>
        <Key className="w-14 sm:w-20">
          <CornerDownLeft />
        </Key>
        {bottomRow.map((letter) => (
          <Key key={letter} evaluation={letterEvaluationLookup(letter)}>
            {letter}
          </Key>
        ))}
        <Key className="w-14 sm:w-20">
          <Delete />
        </Key>
      </div>
    </div>
  );
};

export { Keyboard };
