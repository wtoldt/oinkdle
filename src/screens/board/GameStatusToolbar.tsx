import { Logo } from '@/components/layout';
import { Target } from 'lucide-react';

export interface GameStatusToolbarProps
  extends React.ComponentPropsWithoutRef<'div'> {
  score: number;
  currentWordIndex: number;
  totalWords: number;
}

const GameStatusToolbar = ({
  score,
  currentWordIndex,
  totalWords,
}: GameStatusToolbarProps) => {
  return (
    <div className="m-0 mb-6 flex h-16 w-full flex-row items-center justify-evenly">
      <span className="text-nowrap">
        {currentWordIndex + 1}/{totalWords} Words
      </span>
      <Logo className="max-w-32 sm:max-w-56" />
      <div className="flex w-16 shrink-0 flex-row items-center justify-evenly">
        <Target />
        {score}
      </div>
    </div>
  );
};

export { GameStatusToolbar };
