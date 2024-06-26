import * as React from 'react';
import { GameStatusToolbar, Row } from '@/pages';
import { wordList } from '@/data';
import shuffle from 'lodash.shuffle';
import { DefaultLetterEvaluation, Guess } from '@/domain';
import { unfinishedGuess } from '@/utils';
import { BreakPointIdentifier } from '@/components/layout';

const wordListShuffled = shuffle(wordList);

const GamePage: React.FC<React.ComponentPropsWithoutRef<'div'>> = () => {
  //game settings
  const totalWords = 6;
  const wordLength = 5;
  const gameWords = wordListShuffled.slice(0, 6);
  console.log('words', gameWords);

  //game instance properties
  const score = 12;
  const currentWordIndex = 0;
  const guesses: Guess[] = new Array(totalWords).fill(
    new Array(wordLength).fill(new DefaultLetterEvaluation()),
  );

  //game round properties
  const currentGuessWord = 'roo';
  const currentGuessIndex = 2;
  const currentGuess = unfinishedGuess(currentGuessWord, wordLength);
  //pretend user has guessed twice
  guesses[0] = [
    { letter: 'r', evaluation: 'correct' },
    { letter: 'o', evaluation: 'correct' },
    { letter: 'm', evaluation: 'absent' },
    { letter: 'a', evaluation: 'absent' },
    { letter: 'n', evaluation: 'absent' },
  ];
  guesses[1] = [
    { letter: 'r', evaluation: 'correct' },
    { letter: 'o', evaluation: 'correct' },
    { letter: 'o', evaluation: 'present' },
    { letter: 't', evaluation: 'correct' },
    { letter: 's', evaluation: 'absent' },
  ];

  return (
    <div className="board-element container flex flex-col justify-center px-4">
      <GameStatusToolbar
        score={score}
        currentWordIndex={currentWordIndex}
        totalWords={totalWords}
      />
      {guesses.map((guess, index) => (
        <Row
          key={index}
          guess={index === currentGuessIndex ? currentGuess : guess}
        />
      ))}
      <BreakPointIdentifier />
    </div>
  );
};

export { GamePage };
