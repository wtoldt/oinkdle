import { Button, Divider, Row, Board } from '@/components';
import { DefaultLetterEvaluation, Guess } from '@/domain';
import { Trophy, HeartCrack, Target } from 'lucide-react';
import { evaluatedGuess, cn, isGuessComplete, isGuessWrong } from '@/utils';
import { cva } from 'class-variance-authority';

type WordScoreScreenProps = {
  gotoBoardScreen: () => void;
  gotoGameScoreScreen: () => void;
};
const WordScoreScreen = ({
  gotoBoardScreen,
  gotoGameScoreScreen,
}: WordScoreScreenProps) => {
  //game settings
  const wordLength = 5;
  const guessCount = 6;
  const successfulGuesses: Guess[] = new Array(guessCount).fill(
    new Array(wordLength).fill(new DefaultLetterEvaluation()),
  );

  //fake state
  const wordScore = 4;
  const prevTotalPoints = 12;
  const newTotalPoints = 16;
  const word = 'route';

  //pretend user has guessed wrong twice, then got it right
  successfulGuesses[0] = [
    { letter: 'r', evaluation: 'correct' },
    { letter: 'o', evaluation: 'correct' },
    { letter: 'm', evaluation: 'absent' },
    { letter: 'a', evaluation: 'absent' },
    { letter: 'n', evaluation: 'absent' },
  ];
  successfulGuesses[1] = [
    { letter: 'r', evaluation: 'correct' },
    { letter: 'o', evaluation: 'correct' },
    { letter: 'o', evaluation: 'present' },
    { letter: 't', evaluation: 'correct' },
    { letter: 's', evaluation: 'absent' },
  ];
  successfulGuesses[2] = [
    { letter: 'r', evaluation: 'correct' },
    { letter: 'o', evaluation: 'correct' },
    { letter: 'u', evaluation: 'correct' },
    { letter: 't', evaluation: 'correct' },
    { letter: 'e', evaluation: 'correct' },
  ];

  const failedGuesses: Guess[] = [
    [
      { letter: 'b', evaluation: 'absent' },
      { letter: 'i', evaluation: 'absent' },
      { letter: 'l', evaluation: 'absent' },
      { letter: 'l', evaluation: 'absent' },
      { letter: 'y', evaluation: 'absent' },
    ],
    [
      { letter: 'a', evaluation: 'absent' },
      { letter: 'g', evaluation: 'absent' },
      { letter: 'a', evaluation: 'absent' },
      { letter: 'i', evaluation: 'absent' },
      { letter: 'n', evaluation: 'absent' },
    ],
    [
      { letter: 'c', evaluation: 'absent' },
      { letter: 'h', evaluation: 'absent' },
      { letter: 'i', evaluation: 'absent' },
      { letter: 'n', evaluation: 'absent' },
      { letter: 'a', evaluation: 'absent' },
    ],
    [
      { letter: 'h', evaluation: 'absent' },
      { letter: 'a', evaluation: 'absent' },
      { letter: 'p', evaluation: 'absent' },
      { letter: 'p', evaluation: 'absent' },
      { letter: 'y', evaluation: 'absent' },
    ],
    [
      { letter: 'l', evaluation: 'absent' },
      { letter: 'y', evaluation: 'absent' },
      { letter: 'i', evaluation: 'absent' },
      { letter: 'n', evaluation: 'absent' },
      { letter: 'g', evaluation: 'absent' },
    ],
    [
      { letter: 'r', evaluation: 'correct' },
      { letter: 'o', evaluation: 'correct' },
      { letter: 'o', evaluation: 'present' },
      { letter: 't', evaluation: 'correct' },
      { letter: 's', evaluation: 'absent' },
    ],
  ];

  const guesses = successfulGuesses;

  const iconVariants = cva('mr-3 h-8 w-8 sm:mr-5 sm:h-12 sm:w-12', {
    variants: {
      correct: {
        yes: 'stroke-yellow-600',
        no: 'stroke-red-700',
      },
    },
  });
  return (
    <div className="container">
      <div className="my-12 flex items-center justify-center sm:my-20">
        {wordScore > 0 ? (
          <Trophy className={cn(iconVariants({ correct: 'yes' }))} />
        ) : (
          <HeartCrack className={cn(iconVariants({ correct: 'no' }))} />
        )}
        {wordScore > 0 ? (
          <h1>{wordScore} Points!</h1>
        ) : (
          <h1>No Points&hellip;</h1>
        )}
      </div>
      <div className="flex justify-center">
        <Row
          guess={evaluatedGuess(
            word,
            wordScore > 0 ? 'correct' : 'unevaluated',
          )}
        />
      </div>
      <Divider thickness="thick" />
      <div
        className="flex flex-col items-center justify-center gap-x-3 text-sm sm:flex-row
          sm:text-base"
      >
        <Board
          guesses={guesses}
          size={'small'}
          className="mb-2 flex-none rounded-md bg-secondary p-2 sm:mb-0 sm:p-3"
        />
        <div className="flex flex-col items-center justify-center">
          <dl>
            <dt>6 Possible Points</dt>
            {guesses
              .filter(isGuessComplete)
              .filter(isGuessWrong)
              .map((guess, index) => (
                <dd key={index}>-1 Wrong Guess</dd>
              ))}
            <dd>
              <Divider className="my-0 w-full" width="full" thickness="thin" />
            </dd>
            <dd className="text-center">Total {wordScore}</dd>
          </dl>
          <h5 className="pt-3 text-center">
            {wordScore > 0 ? (
              <>You Earned {wordScore} Points!</>
            ) : (
              <>You Earned No Points&hellip;</>
            )}
          </h5>
          <Divider className="w-full" width="full" />
          {wordScore > 0 && (
            <dl>
              <dt>{prevTotalPoints} (Previous Score)</dt>
              <dt>+ {wordScore} Points</dt>
              <dd>
                <Divider
                  className="my-0 w-full"
                  width="full"
                  thickness="thin"
                />
              </dd>
              <dd className="text-center">Total {newTotalPoints}</dd>
            </dl>
          )}
          <div className="flex flex-col items-center justify-center pt-3">
            <h3>{wordScore > 0 ? 'New Score:' : 'Score Unchaged'}</h3>
            <div className="flex flex-row items-center justify-center">
              <Target />
              <h3>
                {newTotalPoints} Points{wordScore > 0 ? '!' : ''}
              </h3>
            </div>
          </div>
        </div>
      </div>
      <Button onClick={gotoBoardScreen}>Back</Button>
      <Button onClick={gotoGameScoreScreen}>Game Score</Button>
    </div>
  );
};

export { WordScoreScreen };
