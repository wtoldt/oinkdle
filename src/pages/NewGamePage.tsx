import { Logo } from '@/components/layout';
import { Button } from '@/components/ui';

function NewGamePage({
  setGameInProgress,
}: {
  setGameInProgress: (value: boolean) => void;
}) {
  return (
    <div className="container mx-auto flex flex-col justify-center px-4">
      <Logo />
      <h2 className="text-center">A word guessing game for pigs</h2>
      <div className="mt-20 flex justify-center">
        <Button size="lg" onClick={() => setGameInProgress(true)}>
          Play
        </Button>
      </div>
    </div>
  );
}

export { NewGamePage };
