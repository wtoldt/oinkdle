import { Button, Divider, Board } from '@/components';
import { Medal } from 'lucide-react';
import { Round, Guess } from '@/domain';

type GameScoreScreenProps = {
  gotoNewGameScreen: () => void;
};
const GameScoreScreen = ({ gotoNewGameScreen }: GameScoreScreenProps) => {
  //fake state
  const totalScore = 21;
  const guesses: Guess[] = [
    [
      { letter: 'r', evaluation: 'correct' },
      { letter: 'o', evaluation: 'correct' },
      { letter: 'm', evaluation: 'absent' },
      { letter: 'a', evaluation: 'absent' },
      { letter: 'n', evaluation: 'absent' },
    ],
    [
      { letter: 'r', evaluation: 'correct' },
      { letter: 'o', evaluation: 'correct' },
      { letter: 'o', evaluation: 'present' },
      { letter: 't', evaluation: 'correct' },
      { letter: 's', evaluation: 'absent' },
    ],
    [
      { letter: 'r', evaluation: 'correct' },
      { letter: 'o', evaluation: 'correct' },
      { letter: 'u', evaluation: 'correct' },
      { letter: 't', evaluation: 'correct' },
      { letter: 'e', evaluation: 'correct' },
    ],
    [
      { letter: '', evaluation: 'unevaluated' },
      { letter: '', evaluation: 'unevaluated' },
      { letter: '', evaluation: 'unevaluated' },
      { letter: '', evaluation: 'unevaluated' },
      { letter: '', evaluation: 'unevaluated' },
    ],
    [
      { letter: '', evaluation: 'unevaluated' },
      { letter: '', evaluation: 'unevaluated' },
      { letter: '', evaluation: 'unevaluated' },
      { letter: '', evaluation: 'unevaluated' },
      { letter: '', evaluation: 'unevaluated' },
    ],
    [
      { letter: '', evaluation: 'unevaluated' },
      { letter: '', evaluation: 'unevaluated' },
      { letter: '', evaluation: 'unevaluated' },
      { letter: '', evaluation: 'unevaluated' },
      { letter: '', evaluation: 'unevaluated' },
    ],
  ];
  const rounds: Round[] = [
    {
      word: 'baker',
      score: 2,
      guesses,
    },
    {
      word: 'chair',
      score: 6,
      guesses,
    },
    {
      word: 'apple',
      score: 4,
      guesses,
    },
    {
      word: 'drive',
      score: 3,
      guesses,
    },
    {
      word: 'trend',
      score: 1,
      guesses,
    },
    {
      word: 'china',
      score: 5,
      guesses,
    },
  ];

  return (
    <div className="container">
      <div className="mt-12 flex flex-col items-center justify-center sm:mt-20">
        <h1>Game Complete!</h1>
        <h2 className="mb-5">Final Score:</h2>
        <div className="flex items-center justify-center">
          <Medal
            className="mr-2 h-8 w-8 stroke-blue-900 sm:h-12 sm:w-12
              [&>*:nth-child(n+5)]:stroke-yellow-600"
          />
          <h2>{totalScore} Points!</h2>
        </div>
      </div>
      <Divider thickness="thick" />
      <div
        className="mx-auto flex w-full flex-col items-center justify-center gap-y-1 sm:w-3/5
          sm:gap-y-3"
      >
        {rounds.map((round, index) => (
          <div className="flex w-full items-center justify-around" key={index}>
            <Board
              guesses={round.guesses}
              size="tiny"
              className="flex-none rounded bg-secondary p-1"
            />
            <div className="w-20 flex-none font-bold sm:text-xl">
              {round.word}
            </div>
            <div className="w-20 flex-none font-bold sm:text-xl">
              {round.score} Point{round.score > 1 ? 's' : ''}
            </div>
          </div>
        ))}
      </div>
      <Button onClick={gotoNewGameScreen}>New Game</Button>
    </div>
  );
};

export { GameScoreScreen };
