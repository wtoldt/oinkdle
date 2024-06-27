import * as React from 'react';
import {
  NewGameScreen,
  BoardScreen,
  WordScoreScreen,
  GameScoreScreen,
} from '@/screens';

type GameScreen = 'newGame' | 'board' | 'wordScore' | 'gameScore';

function App() {
  const [screen, setScreen] = React.useState<GameScreen>('newGame');
  const gotoNewGameScreen = () => setScreen('newGame');
  const gotoBoardScreen = () => setScreen('board');
  const gotoWordScoreScreen = () => setScreen('wordScore');
  const gotoGameScoreScreen = () => setScreen('gameScore');

  if (screen === 'newGame') {
    return <NewGameScreen gotoBoardScreen={gotoBoardScreen} />;
  } else if (screen === 'board') {
    return <BoardScreen gotoWordScoreScreen={gotoWordScoreScreen} />;
  } else if (screen === 'wordScore') {
    return (
      <WordScoreScreen
        gotoBoardScreen={gotoBoardScreen}
        gotoGameScoreScreen={gotoGameScoreScreen}
      />
    );
  } else if (screen === 'gameScore') {
    return <GameScoreScreen gotoNewGameScreen={gotoNewGameScreen} />;
  }
}

export default App;
