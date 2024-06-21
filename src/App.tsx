import * as React from 'react';
import { NewGamePage, GamePage } from '@/pages';

function App() {
  const [gameInProgress, setGameInProgress] = React.useState(false);

  if (gameInProgress) {
    return <GamePage />;
  } else {
    return <NewGamePage setGameInProgress={setGameInProgress} />;
  }
}

export default App;
