import * as React from 'react';
import {
  type GameState,
  type GameSettings,
  type Guess,
  initialGameState,
} from '@/domain';
import {
  getWords,
  createUnevaluatedGuess,
  evaluateLetter,
  copyAndUpdateAtIndex,
  checkGuessCorrect,
} from '@/utils';

type Reducer = (gameState: GameState) => GameState;
type ReducerFactory = (input?: any) => Reducer;

const goToRoundScoreScreen: Reducer = (gameState: GameState) => {
  return {
    ...gameState,
    gameScreen: 'roundScore',
  };
};

const scoreRound: Reducer = (gameState: GameState) => {
  const {
    gameSettings,
    currentGuesses,
    currentGuessIndex: guessesMade,
  } = gameState;
  const { guessesPerRound: guessesAllowed } = gameSettings;
  const isLastGuessCorrect = checkGuessCorrect(
    currentGuesses[currentGuesses.length - 1],
  );
  //roundScore is total guesses per round - incorrect guesses
  //assume every guess made so far is wrong
  //but the latest guess, the one making us score this round, may be correct
  //in which case we add 1
  const newRoundScore =
    guessesAllowed - guessesMade + (isLastGuessCorrect ? 1 : 0);

  return {
    ...gameState,
    roundScore: newRoundScore,
  };
};

const updateHistory: Reducer = (gameState: GameState) => {
  const { history, currentWord, roundScore, currentGuesses } = gameState;
  //create a Round out of the Guesses and score, push it to history
  return {
    ...gameState,
    history: [
      ...history,
      {
        word: currentWord,
        score: roundScore,
        guesses: currentGuesses,
      },
    ],
  };
};

const incrementCurrentRoundIndex: Reducer = (gameState: GameState) => {
  return {
    ...gameState,
    currentRoundIndex: gameState.currentRoundIndex + 1,
  };
};

const resetCurrentGuessIndex: Reducer = (gameState: GameState) => {
  return {
    ...gameState,
    currentGuessIndex: 0,
  };
};

const setCurrentWordToNextWord: Reducer = (gameState: GameState) => {
  const { words, currentWord } = gameState;
  const currentWordIndex = words.indexOf(currentWord);
  if (currentWordIndex + 1 > words.length) {
    throw new RangeError(
      'Trying to set next word but the current word is the last word',
    );
  }
  return {
    ...gameState,
    currentWord: words[currentWordIndex + 1],
  };
};

const resetCurrentGuesses: Reducer = (gameState: GameState) => {
  //reset guesses by filling with unevaluated guesses
  return {
    ...gameState,
    currentGuesses: new Array(gameState.gameSettings.guessesPerRound).fill(
      createUnevaluatedGuess(gameState.gameSettings.wordLength),
    ),
  };
};

const updateGameScores: Reducer = (gameState: GameState) => {
  return {
    ...gameState,
    prevScore: gameState.score,
    score: gameState.score + gameState.roundScore,
  };
};

const evaluateIsGameComplete: Reducer = (gameState: GameState) => {
  //newCurrentRoundIndex is zero based, so when it reaches gameSettings.rounds, it's game over
  return {
    ...gameState,
    isGameComplete:
      gameState.currentRoundIndex >= gameState.gameSettings.rounds,
  };
};

const endRound: Reducer = (gameState: GameState) => {
  return [
    goToRoundScoreScreen,
    scoreRound,
    updateHistory,
    incrementCurrentRoundIndex,
    resetCurrentGuessIndex,
    setCurrentWordToNextWord,
    resetCurrentGuesses,
    updateGameScores,
    evaluateIsGameComplete,
  ].reduce(
    (newGameState: GameState, reducer: Reducer) => reducer(newGameState),
    gameState,
  );
};

const newGame: ReducerFactory = (gameSettings: GameSettings) => {
  return (): GameState => {
    //shuffle wordlist and pick gameSettings.wordLength words
    const words = getWords(gameSettings.wordListId, gameSettings.rounds);

    //fill currentGuesses with unevaluated guesses
    const currentGuesses = new Array(gameSettings.guessesPerRound).fill(
      createUnevaluatedGuess(gameSettings.wordLength),
    );

    return {
      gameSettings,
      gameScreen: 'board',
      words,
      currentWord: words[0],
      history: [],
      currentGuesses,
      currentGuessWord: '',
      currentGuessIndex: 0,
      currentRoundIndex: 0,
      roundScore: 0,
      prevScore: 0,
      score: 0,
      isGameComplete: false,
    };
  };
};

const addLetter: ReducerFactory = (letter: string) => {
  return (gameState: GameState) => {
    const { gameSettings, currentGuessWord } = gameState;
    const { wordLength } = gameSettings;
    let newCurrentGuessWord = currentGuessWord;

    //add letter to currentGuessWord
    if (currentGuessWord.length < wordLength) {
      newCurrentGuessWord = currentGuessWord + letter;
    }
    return {
      ...gameState,
      currentGuessWord: newCurrentGuessWord,
    };
  };
};

const removeLetter: ReducerFactory = () => {
  return (gameState: GameState) => {
    const { currentGuessWord } = gameState;
    let newCurrentGuessWord = currentGuessWord;

    //remove letter from currentGuessWord
    if (currentGuessWord.length > 0) {
      newCurrentGuessWord = currentGuessWord.slice(0, -1);
    }
    return {
      ...gameState,
      currentGuessWord: newCurrentGuessWord,
    };
  };
};

const evaluateGuess: ReducerFactory = (word: string) => {
  return (gameState: GameState) => {
    const { gameSettings, currentWord, currentGuesses, currentGuessIndex } =
      gameState;
    const { guessesPerRound } = gameSettings;

    //#########################################################
    //   Stuff we for sure do every time we evaluate a guess
    //#########################################################
    //create a Guess from the word and evalute it
    const evaluatedGuess = word
      .split('')
      .map((letter, index) => evaluateLetter(letter, index, currentWord));
    const isGuessCorrect = checkGuessCorrect(evaluatedGuess);

    //update guesses
    let newGuesses = copyAndUpdateAtIndex(
      currentGuesses,
      currentGuessIndex,
      evaluatedGuess,
    ) as Guess[];
    const newCurrentGuessWord = '';
    let newCurrentGuessIndex = currentGuessIndex + 1;

    let newGameState: GameState = {
      ...gameState,
      currentGuesses: newGuesses,
      currentGuessWord: newCurrentGuessWord,
      currentGuessIndex: newCurrentGuessIndex,
    };

    //#########################################################
    //   Stuff we do if the guess is correct or round is over
    //#########################################################
    //if round is over, update lots of state
    const isRoundOver =
      isGuessCorrect || newCurrentGuessIndex >= guessesPerRound;
    if (isRoundOver) {
      newGameState = {
        ...newGameState,
        ...endRound(newGameState),
      };
    }

    //return state
    return newGameState;
  };
};

const nextRound: ReducerFactory = () => {
  return (gameState: GameState) => {
    // if game is complete, set gameScreen to gameScore
    // otherwise, set gameScreen to board
    return {
      ...gameState,
      gameScreen: gameState.isGameComplete ? 'gameScore' : 'board',
    };
  };
};

const gameStateReducer = (gameState: GameState, reducer: Reducer) => {
  return reducer(gameState);
};

const useGameState = () => {
  const [gameState, dispatch] = React.useReducer(
    gameStateReducer,
    initialGameState,
  );
  return {
    gameState,
    newGame: (gameSettings: GameSettings) => dispatch(newGame(gameSettings)),
    addLetter: (letter: string) => dispatch(addLetter(letter)),
    removeLetter: () => dispatch(removeLetter()),
    evaluateGuess: (word: string) => dispatch(evaluateGuess(word)),
    nextRound: () => dispatch(nextRound()),
  };
};

export { useGameState };
