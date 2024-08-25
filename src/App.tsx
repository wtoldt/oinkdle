import { BreakPointIdentifier } from '@/components/layout/BreakPointIdentifier';
import { useGameState } from '@/hooks/useGameState';
import { BoardScreen } from '@/screens/BoardScreen';
import { GameScoreScreen } from '@/screens/GameScoreScreen';
import { NewGameScreen } from '@/screens/NewGameScreen';
import { RoundScoreScreen } from '@/screens/RoundScoreScreen';

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
