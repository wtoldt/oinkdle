import * as React from 'react';
import { cn } from '@/utils';
import { CornerDownLeft, Delete } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

const topRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
const middleRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
const bottomRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

//perfect px is px-[0.85rem] sm:px-6
//widths measured on screen: 37.09px sm:59px
const keyVariants = cva(
  `btn flex h-14 flex-1 items-center justify-center rounded-sm font-mono text-lg
  font-semibold text-black sm:h-12 sm:flex-none sm:rounded-md sm:px-6 sm:text-xl
  sm:font-bold`,
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

const Keyboard = () => {
  const rowStyle = 'flex w-full items-center justify-center gap-x-1 ';
  return (
    <div className="flex flex-col items-center justify-center gap-y-3 pb-3 sm:gap-y-1">
      <div className={rowStyle}>
        {topRow.map((letter) => (
          <Key key={letter}>{letter}</Key>
        ))}
      </div>
      <div className={rowStyle}>
        <div style={{ flex: '.5' }}>{/*spacer*/}</div>
        {middleRow.map((letter) => (
          <Key key={letter}>{letter}</Key>
        ))}
        <div style={{ flex: '.5' }}>{/*spacer*/}</div>
      </div>
      <div className={rowStyle}>
        <Key className="w-14 sm:w-20">
          <CornerDownLeft />
        </Key>
        {bottomRow.map((letter) => (
          <Key key={letter}>{letter}</Key>
        ))}
        <Key className="w-14 sm:w-20">
          <Delete />
        </Key>
      </div>
    </div>
  );
};

export { Keyboard };
