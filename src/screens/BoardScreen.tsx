import * as React from 'react';
import { GameStatusToolbar, Board } from '@/components';
import { type GameSettings, type Guess } from '@/domain';
import { createUnfinishedGuess, copyAndUpdateAtIndex } from '@/utils';

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
  const { rounds, wordLength } = gameSettings;

  const parseKey = (e: KeyboardEvent) => {
    const { key } = e;
    const aplhaOnly = /^[a-z]$/;

    if (key === 'Enter') {
      if (currentGuessWord.length === wordLength) {
        //todo: test if word is in wordList
        // if not, show error
        // if yes, evaluateGuess
        evaluateGuess(currentGuessWord);
      } else {
        //todo: play animation
        console.log(
          `${currentGuessWord} is not ${wordLength} letters long (it is ${currentGuessWord.length})`,
        );
      }
    } else if (key === 'Backspace') {
      removeLetter();
    } else if (aplhaOnly.test(key)) {
      addLetter(key);
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', parseKey);
    return () => document.removeEventListener('keydown', parseKey);
  }, [currentGuessWord]);

  const currentGuess = createUnfinishedGuess(currentGuessWord, wordLength);

  return (
    <div className="container flex flex-col justify-center px-4">
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
        className="mb-3"
      />
    </div>
  );
};

export { BoardScreen };
