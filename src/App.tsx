import * as React from 'react';
import {
  NewGameScreen,
  BoardScreen,
  WordScoreScreen,
  GameScoreScreen,
} from '@/screens';
import { BreakPointIdentifier } from '@/components';

type GameScreen = 'newGame' | 'board' | 'wordScore' | 'gameScore';

function App() {
  const [screen, setScreen] = React.useState<GameScreen>('newGame');
  const gotoNewGameScreen = () => setScreen('newGame');
  const gotoBoardScreen = () => setScreen('board');
  const gotoWordScoreScreen = () => setScreen('wordScore');
  const gotoGameScoreScreen = () => setScreen('gameScore');

  return (
    <div>
      <BreakPointIdentifier />
      {screen === 'newGame' && (
        <NewGameScreen gotoBoardScreen={gotoBoardScreen} />
      )}
      {screen === 'board' && (
        <BoardScreen gotoWordScoreScreen={gotoWordScoreScreen} />
      )}
      {screen === 'wordScore' && (
        <WordScoreScreen
          gotoBoardScreen={gotoBoardScreen}
          gotoGameScoreScreen={gotoGameScoreScreen}
        />
      )}
      {screen === 'gameScore' && (
        <GameScoreScreen gotoNewGameScreen={gotoNewGameScreen} />
      )}
    </div>
  );
}

export default App;
