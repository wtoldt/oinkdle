import { Button } from '@/components/ui';
import { Divider } from '@/components/layout';
import { DefaultLetterEvaluation, Guess } from '@/domain';
import { Row } from '@/screens';
import { Trophy, HeartCrack } from 'lucide-react';
import { evaluatedGuess, cn } from '@/utils';
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
  const guesses: Guess[] = new Array(guessCount).fill(
    new Array(wordLength).fill(new DefaultLetterEvaluation()),
  );

  //fake state
  const wordScore = 4;
  const prevTotalPoints = 12;
  const newTotalPoints = 16;
  const word = 'route';

  //pretend user has guessed wrong twice, then got it right
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
  guesses[2] = [
    { letter: 'r', evaluation: 'correct' },
    { letter: 'o', evaluation: 'correct' },
    { letter: 'u', evaluation: 'correct' },
    { letter: 't', evaluation: 'correct' },
    { letter: 'e', evaluation: 'correct' },
  ];

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
      <div className="my-20 flex items-center justify-center">
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
          guess={evaluatedGuess(word, wordScore > 0 ? 'correct' : 'absent')}
        />
      </div>
      <Divider thickness={'chonk'} rounded="round" />
      <Button onClick={gotoBoardScreen}>Back</Button>
      <Button onClick={gotoGameScoreScreen}>Game Score</Button>
    </div>
  );
};

export { WordScoreScreen };
