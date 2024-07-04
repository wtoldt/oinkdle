import { type Guess, type Evaluation } from '@/domain';
import { CornerDownLeft, Delete } from 'lucide-react';
import { Key } from '@/components';

const topRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
const middleRow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
const bottomRow = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

type KeyboardProps = {
  addLetter: (letter: string) => void;
  removeLetter: () => void;
  evaluateGuess: (word: string) => void;
  currentGuessWord: string;
  currentGuesses: Guess[];
};

const Keyboard = ({
  addLetter,
  removeLetter,
  evaluateGuess,
  currentGuessWord,
  currentGuesses,
}: KeyboardProps) => {
  const evaluationRanking = ['unevaluated', 'absent', 'present', 'correct'];
  const letterEvaluationLookup = 'abcdefghijklmnopqrstuvwxyz'
    .split('')
    .reduce((map, letter) => {
      map.set(letter, 'unevaluated');
      return map;
    }, new Map<string, Evaluation>());
  currentGuesses.flat().forEach(({ letter, evaluation }) => {
    const currentEvaluationRanking = evaluationRanking.indexOf(
      letterEvaluationLookup.get(letter)!,
    );
    const newEvaluationRanking = evaluationRanking.indexOf(evaluation);
    if (newEvaluationRanking > currentEvaluationRanking) {
      letterEvaluationLookup.set(letter, evaluation);
    }
  });

  const getEvaluation = (letter: string): Evaluation => {
    return letterEvaluationLookup.get(letter) ?? 'unevaluated';
  };

  const rowStyle = 'flex w-full items-center justify-center gap-x-1 ';
  return (
    <div
      className="flex w-full touch-none flex-col items-center justify-center gap-y-3 pb-3
        sm:gap-y-1"
    >
      <div className={rowStyle}>
        {topRow.map((letter) => (
          <Key
            key={letter}
            evaluation={getEvaluation(letter)}
            onClick={() => addLetter(letter)}
          >
            {letter}
          </Key>
        ))}
      </div>
      <div className={rowStyle}>
        <div style={{ flex: '.5' }}>{/*spacer*/}</div>
        {middleRow.map((letter) => (
          <Key
            key={letter}
            evaluation={getEvaluation(letter)}
            onClick={() => addLetter(letter)}
          >
            {letter}
          </Key>
        ))}
        <div style={{ flex: '.5' }}>{/*spacer*/}</div>
      </div>
      <div className={rowStyle}>
        <Key
          className="w-14 sm:w-20"
          onClick={() => evaluateGuess(currentGuessWord)}
        >
          <CornerDownLeft /> {/*Enter*/}
        </Key>
        {bottomRow.map((letter) => (
          <Key
            key={letter}
            evaluation={getEvaluation(letter)}
            onClick={() => addLetter(letter)}
          >
            {letter}
          </Key>
        ))}
        <Key className="w-14 sm:w-20" onClick={removeLetter}>
          <Delete />
        </Key>
      </div>
    </div>
  );
};

export { Keyboard };
