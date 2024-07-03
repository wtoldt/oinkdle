import { Logo } from '@/components';
import { Target } from 'lucide-react';

export interface GameStatusToolbarProps
  extends React.ComponentPropsWithoutRef<'div'> {
  score: number;
  currentRound: number;
  totalRounds: number;
}

const GameStatusToolbar = ({
  score,
  currentRound,
  totalRounds,
}: GameStatusToolbarProps) => {
  return (
    <div className="m-0 mb-6 flex h-16 w-full flex-row items-center justify-evenly">
      <span className="text-nowrap">
        {currentRound}/{totalRounds} Rounds
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
