import { Logo } from '@/components';
import { Button } from '@/components';

type NewGameScreenProps = {
  gotoBoardScreen: () => void;
};

const NewGameScreen = ({ gotoBoardScreen }: NewGameScreenProps) => {
  return (
    <div className="container mx-auto flex flex-col justify-center px-4">
      <Logo />
      <h2 className="text-center">A word guessing game for pigs</h2>
      <div className="mt-20 flex justify-center">
        <Button size="lg" onClick={gotoBoardScreen}>
          Play
        </Button>
      </div>
    </div>
  );
};

export { NewGameScreen };
