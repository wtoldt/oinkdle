import { BreakPointIdentifier } from '@/components';
import { useGameState } from '@/hooks';
import {
  BoardScreen,
  GameScoreScreen,
  NewGameScreen,
  RoundScoreScreen,
} from '@/screens';

function App() {
  const {
    gameState,
    newGame,
    addLetter,
    removeLetter,
    evaluateGuess,
    nextRound,
  } = useGameState();
  const {
    gameSettings,
    gameScreen,
    history,
    currentGuesses,
    currentGuessWord,
    currentGuessIndex,
    currentRoundIndex,
    prevScore,
    score,
    isGameComplete,
  } = gameState;
  return (
    <>
      <BreakPointIdentifier />
      {gameScreen === 'newGame' && <NewGameScreen newGame={newGame} />}
      {gameScreen === 'board' && (
        <BoardScreen
          evaluateGuess={evaluateGuess}
          addLetter={addLetter}
          removeLetter={removeLetter}
          gameSettings={gameSettings}
          score={score}
          currentRoundIndex={currentRoundIndex}
          currentGuessWord={currentGuessWord}
          currentGuesses={currentGuesses}
          currentGuessIndex={currentGuessIndex}
        />
      )}
      {gameScreen === 'roundScore' && (
        <RoundScoreScreen
          nextRound={nextRound}
          isGameComplete={isGameComplete}
          prevScore={prevScore}
          newScore={score}
          round={history[currentRoundIndex - 1]}
        />
      )}
      {gameScreen === 'gameScore' && (
        <GameScoreScreen newGame={newGame} score={score} history={history} />
      )}
    </>
  );
}

export default App;
