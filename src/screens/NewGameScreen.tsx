import { Button, Logo } from '@/components';
import { defaultGameSettings, type GameSettings } from '@/domain';

type NewGameScreenProps = {
  newGame: (gameSettings: GameSettings) => void;
};

const NewGameScreen = ({ newGame }: NewGameScreenProps) => {
  return (
    <div className="container mx-auto flex flex-col justify-center px-4">
      <Logo />
      <h2 className="text-center">A word guessing game for pigs</h2>
      <div className="mt-20 flex justify-center">
        <Button size="lg" onClick={() => newGame(defaultGameSettings)}>
          Play
        </Button>
      </div>
    </div>
  );
};

NewGameScreen.displayName = 'NewGameScreen';
export { NewGameScreen };
