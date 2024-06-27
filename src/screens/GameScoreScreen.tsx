import { Button } from '@/components/ui';

type GameScoreScreenProps = {
  gotoNewGameScreen: () => void;
};
const GameScoreScreen = ({ gotoNewGameScreen }: GameScoreScreenProps) => {
  return (
    <div>
      <h1>Game Score!</h1>
      <Button onClick={gotoNewGameScreen}>New Game</Button>
    </div>
  );
};

export { GameScoreScreen };
