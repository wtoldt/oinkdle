import * as React from 'react';
import { NewGameScreen, BoardScreen } from '@/screens';

type GameScreen = 'newGame' | 'board' | 'wordScore' | 'gameScore';

function App() {
  const [screen, setScreen] = React.useState<GameScreen>('newGame');

  const gotoBoardScreen = () => setScreen('board');
  const gotoWordScoreScreen = () => setScreen('wordScore');
  // const gotoGameScoreScreen = () => setScreen('gameScore');

  if (screen === 'newGame') {
    return <NewGameScreen gotoBoardScreen={gotoBoardScreen} />;
  } else if (screen === 'board') {
    return <BoardScreen gotoWordScoreScreen={gotoWordScoreScreen} />;
  } else if (screen === 'wordScore') {
    return <h1>Word Score!</h1>;
  } else if (screen === 'gameScore') {
    return <h1>Game Score!</h1>;
  }
}

export default App;
