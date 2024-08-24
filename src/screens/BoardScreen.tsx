import * as React from 'react';
import { Board, GameStatusToolbar, Keyboard } from '@/components';
import { type GameSettings, type Guess } from '@/domain';
import { copyAndUpdateAtIndex, createUnfinishedGuess } from '@/utils';

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
  //todo: this should probably go somewhere else... maybe address it when adding animations
  const evaluateGuessIfValid = (word: string) => {
    if (word.length === wordLength) {
      //todo: test if word is in wordList
      // if not, show error
      // if yes, evaluateGuess
      evaluateGuess(word);
    } else {
      //todo: play animation
      console.log(
        `${word} is not ${wordLength} letters long (it is ${currentGuessWord.length})`,
      );
    }
  };

  const parseKey = (e: KeyboardEvent) => {
    const { key } = e;
    const aplhaOnly = /^[a-z]$/;

    if (key === 'Enter') {
      evaluateGuessIfValid(currentGuessWord);
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
        className="mb-3"
      />
      <div className="flex flex-1 items-end justify-center">
        <Keyboard
          addLetter={addLetter}
          removeLetter={removeLetter}
          evaluateGuess={evaluateGuessIfValid}
          currentGuessWord={currentGuessWord}
          currentGuesses={currentGuesses}
        />
      </div>
    </div>
  );
};

export { BoardScreen };
