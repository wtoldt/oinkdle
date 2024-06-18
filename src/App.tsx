import oinkleLogo from '@/assets/oinkdle-logo.svg';
import { BreakPointIdentifier } from '@/components/layout/BreakPointIdentifier';
import { Button, PigButton } from '@/components/ui/';

function App() {
  return (
    <div className="container mx-auto flex flex-col justify-center px-4">
      <img src={oinkleLogo} alt="Oinkdle logo" />
      <h2 className="text-center">A word guessing game for pigs</h2>
      <div className="flex justify-center">
        <Button>Play</Button>
      </div>
      <BreakPointIdentifier />
    </div>
  );
}

export default App;
