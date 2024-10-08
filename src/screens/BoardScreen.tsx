import * as React from 'react';
import { debounce } from 'lodash-es';
import { Board } from '@/components/game/Board';
import { GameStatusToolbar } from '@/components/game/GameStatusToolbar';
import { Keyboard } from '@/components/game/Keyboard';
import { type GameSettings, type Guess } from '@/domain/game';
import { cn } from '@/utils/cn';

type BoardScreenProps = React.ComponentPropsWithoutRef<'div'> & {
  evaluateGuess: () => void;
  addLetter: (letter: string) => void;
  removeLetter: () => void;
  endRound: () => void;
  gameSettings: GameSettings;
  isRoundComplete: boolean;
  score: number;
  currentRoundIndex: number;
  currentGuesses: Guess[];
};

const BoardScreen = ({
  evaluateGuess,
  addLetter,
  removeLetter,
  endRound,
  gameSettings,
  isRoundComplete,
  score,
  currentRoundIndex,
  currentGuesses,
}: BoardScreenProps) => {
  const [animateInvalidGuessLength, setAnimateInvalidGuessLength] =
    React.useState(false);

  // debounced because it's called by the revealEvaluation animation ending
  //   and that event fires 5 times in a row
  const debouncedEndRound = debounce(() => {
    endRound();
  }, 200);
  const currentGuess = currentGuesses[currentGuesses.length - 1];

  const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.animationName === 'headShake') {
      setAnimateInvalidGuessLength(false);
    } else if (isRoundComplete && e.animationName === 'revealEvaluation') {
      debouncedEndRound();
    }
  };

  const { rounds, wordLength, guessesPerRound } = gameSettings;
  const evaluateGuessIfValid = React.useCallback(
    (guess: Guess) => {
      if (guess.length === wordLength) {
        evaluateGuess();
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
        evaluateGuessIfValid(currentGuess);
      } else if (key === 'Backspace') {
        removeLetter();
      } else if (aplhaOnly.test(key)) {
        addLetter(key);
      }
    },
    [evaluateGuessIfValid, currentGuess, removeLetter, addLetter],
  );

  React.useEffect(() => {
    document.addEventListener('keydown', parseKey);
    return () => document.removeEventListener('keydown', parseKey);
  }, [parseKey]);

  return (
    <div className="container flex h-screen flex-col justify-center px-4">
      <GameStatusToolbar
        score={score}
        currentRound={currentRoundIndex + 1}
        totalRounds={rounds}
      />
      <Board
        guesses={currentGuesses}
        guessesPerRound={guessesPerRound}
        wordLength={wordLength}
        onAnimationEnd={handleAnimationEnd}
        className={cn('animate mb-3', {
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
