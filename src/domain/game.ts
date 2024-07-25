type Evaluation = 'correct' | 'present' | 'absent' | 'unevaluated';
interface LetterEvaluation {
  letter: string;
  evaluation: Evaluation;
}

class DefaultLetterEvaluation implements LetterEvaluation {
  letter = '';
  evaluation: Evaluation = 'unevaluated';
}

type Guess = LetterEvaluation[];

interface Round {
  word: string;
  score: number;
  guesses: Guess[];
}

interface GameSettings {
  rounds: number;
  wordLength: number;
  wordListId: string;
  guessesPerRound: number;
}

type GameScreen = 'newGame' | 'board' | 'roundScore' | 'gameScore';

interface GameState {
  gameSettings: GameSettings;
  gameScreen: GameScreen;
  words: string[];
  currentWord: string;
  history: Round[];
  currentGuesses: Guess[];
  currentGuessWord: string;
  currentGuessIndex: number;
  currentRoundIndex: number;
  roundScore: number;
  prevScore: number;
  score: number;
  isGameComplete: boolean;
}

const initialGameState: GameState = {
  gameSettings: {
    rounds: 0,
    wordLength: 0,
    wordListId: '',
    guessesPerRound: 0,
  },
  gameScreen: 'newGame',
  words: [],
  currentWord: '',
  history: [],
  currentGuesses: [],
  currentGuessWord: '',
  currentGuessIndex: 0,
  currentRoundIndex: 0,
  roundScore: 0,
  prevScore: 0,
  score: 0,
  isGameComplete: false,
};

const defaultGameSettings: GameSettings = {
  rounds: 3,
  wordLength: 5,
  wordListId: 'standard-5-letter-words',
  guessesPerRound: 6,
};

export {
  type LetterEvaluation,
  type Evaluation,
  DefaultLetterEvaluation,
  type Guess,
  type Round,
  type GameSettings,
  type GameState,
  type GameScreen,
  defaultGameSettings,
  initialGameState,
};
