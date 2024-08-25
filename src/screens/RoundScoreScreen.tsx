import * as React from 'react';
import {
  Board,
  Button,
  Divider,
  HeartCrackIcon,
  Row,
  TargetIcon,
  TrophyIcon,
} from '@/components';
import { type Round } from '@/domain';
import {
  checkGuessComplete,
  checkGuessWrong,
  cn,
  createEvaluatedGuess,
} from '@/utils';

type RoundScoreScreenProps = {
  nextRound: () => void;
  isGameComplete: boolean;
  prevScore: number;
  newScore: number;
  round: Round;
};
const RoundScoreScreen = ({
  nextRound,
  isGameComplete,
  prevScore,
  newScore,
  round,
}: RoundScoreScreenProps) => {
  //set up autofocus delay for button
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      buttonRef.current?.focus();
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  //displaying the round score logic
  const { word, score: roundScore, guesses } = round;
  const wasGuessCorrect = roundScore > 0;
  const iconClasses = cn('mr-3 h-8 w-8 sm:mr-5 sm:h-12 sm:w-12');

  return (
    <div className="container">
      <div className="my-8 flex items-center justify-center sm:my-20">
        {wasGuessCorrect ? (
          <TrophyIcon className={iconClasses} />
        ) : (
          <HeartCrackIcon className={iconClasses} />
        )}
        {wasGuessCorrect ? (
          <h1>{roundScore} Points!</h1>
        ) : (
          <h1>No Points&hellip;</h1>
        )}
      </div>
      <div className="flex justify-center">
        <Row
          guess={createEvaluatedGuess(
            word,
            wasGuessCorrect ? 'correct' : 'unevaluated',
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
              .filter(checkGuessComplete)
              .filter(checkGuessWrong)
              .map((_, index) => (
                <dd key={index}>-1 Wrong Guess</dd>
              ))}
            <dd>
              <Divider className="my-0 w-full" width="full" thickness="thin" />
            </dd>
            <dd className="text-center">Total {roundScore}</dd>
          </dl>
          <h5 className="pt-3 text-center">
            {wasGuessCorrect ? (
              <>You Earned {roundScore} Points!</>
            ) : (
              <>You Earned No Points&hellip;</>
            )}
          </h5>
          <Divider className="w-full" width="full" />
          {wasGuessCorrect && (
            <dl>
              <dt>{prevScore} (Previous Score)</dt>
              <dt>+ {roundScore} Points</dt>
              <dd>
                <Divider
                  className="my-0 w-full"
                  width="full"
                  thickness="thin"
                />
              </dd>
              <dd className="text-center">Total {newScore}</dd>
            </dl>
          )}
          <div className="flex flex-col items-center justify-center pt-3">
            <h3>{wasGuessCorrect ? 'New Score:' : 'Score Unchaged'}</h3>
            <div className="flex flex-row items-center justify-center gap-x-2">
              <TargetIcon />
              <h3>
                {newScore} Points{wasGuessCorrect ? '!' : ''}
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-5 flex justify-center">
        <Button className="w-full sm:w-min" onClick={nextRound} ref={buttonRef}>
          {isGameComplete ? 'See Final Score' : 'Next Round'}
        </Button>
      </div>
    </div>
  );
};

RoundScoreScreen.displayName = 'RoundScoreScreen';
export { RoundScoreScreen };
