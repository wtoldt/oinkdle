import oinkleLogo from '@/assets/oinkdle-logo.svg';
import { BreakPointIdentifier } from '@/components/layout/BreakPointIdentifier';
import { Button } from '@/components/ui/';

function App() {
  return (
    <div className="container mx-auto flex flex-col justify-center px-4">
      <img src={oinkleLogo} alt="Oinkdle logo" />
      <h2 className="text-center">A word guessing game for pigs</h2>
      <div className="flex justify-center">
        <button
          className="focus:ring-pig-purple-300 border-pig-purple-800 bg-pig-purple-300
            hover:bg-pig-purple-400 rounded-2xl border px-4 py-2 transition-all
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          Play
        </button>
        <Button>Default (Primary)</Button>
        <Button variant="inversePrimary">Inverse Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="oink">Oink</Button>
      </div>
      <BreakPointIdentifier />
    </div>
  );
}

export default App;
