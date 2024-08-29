import * as React from 'react';
import { Board } from '@/components/game/Board';
import { GameStatusToolbar } from '@/components/game/GameStatusToolbar';
import { Keyboard } from '@/components/game/Keyboard';
import { type GameSettings, type Guess } from '@/domain/game';
import { cn } from '@/utils/cn';
import { copyAndUpdateAtIndex } from '@/utils/game-state-utils';
import { createUnfinishedGuess } from '@/utils/guess-utils';

type BoardScreenProps = React.ComponentPropsWithoutRef<'div'> & {
  evaluateGuess: (word: string) => void;
  addLetter: (letter: string) => void;
  removeLetter: () => void;
  gameSettings: GameSettings;
  score: number;
  currentRoundIndex: number;
  currentGuessWord: string;
  currentGuesses: Guess[];
  currentGuessIndex: number;
};

const BoardScreen = ({
  evaluateGuess,
  addLetter,
  removeLetter,
  gameSettings,
  score,
  currentRoundIndex,
  currentGuessWord,
  currentGuesses,
  currentGuessIndex,
}: BoardScreenProps) => {
  const [animateInvalidGuessLength, setAnimateInvalidGuessLength] =
    React.useState(false);

  const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.animationName === 'headShake') {
      setAnimateInvalidGuessLength(false);
    }
  };

  const { rounds, wordLength } = gameSettings;
  const evaluateGuessIfValid = React.useCallback(
    (word: string) => {
      if (word.length === wordLength) {
        evaluateGuess(word);
      } else {
        setAnimateInvalidGuessLength(true);
      }
    },
    [evaluateGuess, wordLength],
  );

  const parseKey = React.useCallback(
    (e: KeyboardEvent | { key: string }) => {
      let isKeyRepeating = false;
      if (e instanceof KeyboardEvent) {
        isKeyRepeating = e.repeat;
      }
      // Prevent repeating keys
      if (isKeyRepeating) {
        return;
      }
      const { key } = e;
      const aplhaOnly = /^[a-z]$/;

      if (key === 'Enter') {
        evaluateGuessIfValid(currentGuessWord);
      } else if (key === 'Backspace') {
        removeLetter();
      } else if (aplhaOnly.test(key)) {
        addLetter(key);
      }
    },
    [evaluateGuessIfValid, currentGuessWord, removeLetter, addLetter],
  );

  React.useEffect(() => {
    document.addEventListener('keydown', parseKey);
    return () => document.removeEventListener('keydown', parseKey);
  }, [parseKey]);

  const currentGuess = createUnfinishedGuess(currentGuessWord, wordLength);

  return (
    <div className="container flex h-screen flex-col justify-center px-4">
      <GameStatusToolbar
        score={score}
        currentRound={currentRoundIndex + 1}
        totalRounds={rounds}
      />
      <Board
        guesses={copyAndUpdateAtIndex(
          currentGuesses,
          currentGuessIndex,
          currentGuess,
        )}
        currentGuessIndex={currentGuessIndex}
        onAnimationEnd={handleAnimationEnd}
        className={cn('animate-evaluation mb-3', {
          'shake-unfilled': animateInvalidGuessLength,
        })}
      />
      <div className="flex flex-1 items-end justify-center">
        <Keyboard parseKey={parseKey} currentGuesses={currentGuesses} />
      </div>
    </div>
  );
};

BoardScreen.displayName = 'BoardScreen';
export { BoardScreen };
