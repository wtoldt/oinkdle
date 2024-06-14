import oinkleLogo from '@/assets/oinkdle-logo.svg';
import { BreakPointIdentifier } from '@/components/layout/BreakPointIdentifier';
import { Button } from '@/components/ui/';

function App() {
  return (
    <div
      className="border-pig-purple-800 container mx-auto flex flex-col justify-center border-4
        px-4"
    >
      <img src={oinkleLogo} alt="Oinkdle logo" />
      <h2 className="text-pig-pink text-center">
        A word guessing game for pigs
      </h2>
      <div className="flex justify-center">
        <button
          className="ring-offset-background focus-visible:ring-ring border-pig-purple-800
            bg-pig-purple-300 hover:bg-pig-purple-400 m-4 rounded-2xl border px-4 py-2
            transition-all focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-offset-2"
        >
          Play
        </button>
        <Button>Button</Button>
      </div>
      <BreakPointIdentifier />
    </div>
  );
}

export default App;
