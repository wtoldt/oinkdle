import * as React from 'react';
import { Board } from '@/components/game/Board';
import { Divider } from '@/components/layout/Divider';
import { Button } from '@/components/ui/Button';
import { MedalIcon } from '@/components/ui/MedalIcon';
import {
  defaultGameSettings,
  type GameSettings,
  type Round,
} from '@/domain/game';

type GameScoreScreenProps = {
  newGame: (gameSettings: GameSettings) => void;
  score: number;
  history: Round[];
  gameSettings: GameSettings;
};
const GameScoreScreen = ({
  newGame,
  score,
  history,
  gameSettings,
}: GameScoreScreenProps) => {
  //set up autofocus delay for button
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      buttonRef.current?.focus();
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  //displaying the game score logic
  return (
    <div className="container">
      <div className="mt-8 flex flex-col items-center justify-center sm:mt-20">
        <h1>Game Complete!</h1>
        <h2 className="mb-5">Final Score:</h2>
        <div className="flex items-center justify-center">
          <MedalIcon className="mr-2 h-8 w-8 sm:h-12 sm:w-12" />
          <h2>{score} Points!</h2>
        </div>
      </div>
      <Divider thickness="thick" />
      <div
        className="mx-auto flex w-full flex-col items-center justify-center gap-y-1 sm:w-3/5
          sm:gap-y-3"
      >
        {history.map((round, index) => (
          <div className="flex w-full items-center justify-around" key={index}>
            <Board
              guesses={round.guesses}
              guessesPerRound={gameSettings.guessesPerRound}
              wordLength={gameSettings.wordLength}
              size="tiny"
              className="flex-none rounded bg-secondary p-1"
            />
            <div className="w-20 flex-none font-bold sm:text-xl">
              {round.word}
            </div>
            <div className="w-20 flex-none font-bold sm:text-xl">
              {round.score} Point{round.score === 1 ? '' : 's'}
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-5 flex justify-center">
        <Button
          className="w-full sm:w-min"
          ref={buttonRef}
          onClick={() => newGame(defaultGameSettings)}
        >
          New Game
        </Button>
      </div>
    </div>
  );
};

GameScoreScreen.displayName = 'GameScoreScreen';
export { GameScoreScreen };
