import * as React from 'react';
import {
  initialGameState,
  type GameSettings,
  type GameState,
  type Guess,
} from '@/domain/game';
import { evaluateLetter } from '@/utils/game-state-utils';
import { checkGuessCorrect } from '@/utils/guess-utils';
import { getWords } from '@/utils/word-list-utils';

type Reducer = (gameState: GameState) => GameState;
type ReducerFactory = (input?: any) => Reducer; // eslint-disable-line @typescript-eslint/no-explicit-any

const goToRoundScoreScreen: Reducer = (gameState: GameState) => {
  return {
    ...gameState,
    gameScreen: 'roundScore',
  };
};

const scoreRound: Reducer = (gameState: GameState) => {
  const { gameSettings, currentGuesses } = gameState;
  const { guessesPerRound: guessesAllowed } = gameSettings;
  const isLastGuessCorrect = checkGuessCorrect(
    currentGuesses[currentGuesses.length - 1],
  );
  //roundScore is (total guesses per round - incorrect guesses)
  //assume every guess made so far is wrong
  //but the latest guess, the one making us score this round, may be correct
  //in which case we add 1
  const guessesMade = currentGuesses.length;
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
  //reset guesses by setting currentGuesses to an array with one guess which has no letters
  return {
    ...gameState,
    currentGuesses: [[] as Guess],
  };
};

const updateGameScores: Reducer = (gameState: GameState) => {
  return {
    ...gameState,
    prevScore: gameState.score,
    score: gameState.score + gameState.roundScore,
  };
};

const resetIsRoundComplete: Reducer = (gameState: GameState) => {
  return {
    ...gameState,
    isRoundComplete: false,
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

const newGame: ReducerFactory = (gameSettings: GameSettings) => {
  return (): GameState => {
    //shuffle wordlist and pick gameSettings.wordLength words
    const words = getWords(gameSettings.wordListId, gameSettings.rounds);

    return {
      gameSettings,
      gameScreen: 'board',
      words,
      currentWord: words[0],
      history: [],
      currentGuesses: [[] as Guess], //start with one guess, which has no letters
      currentRoundIndex: 0,
      roundScore: 0,
      prevScore: 0,
      score: 0,
      isRoundComplete: false,
      isGameComplete: false,
    };
  };
};

const addLetter: ReducerFactory = (letter: string) => {
  return (gameState: GameState) => {
    const { gameSettings, currentGuesses } = gameState;
    const { wordLength } = gameSettings;

    const newCurrentGuess = [...currentGuesses[currentGuesses.length - 1]];
    if (newCurrentGuess.length >= wordLength) {
      //we've reached the end of the current guess, do nothing
      return gameState;
    } else {
      //add letter to currentGuess
      newCurrentGuess.push({ letter, evaluation: 'unevaluated' });
      const newCurrentGuesses = [...currentGuesses];
      newCurrentGuesses[newCurrentGuesses.length - 1] = newCurrentGuess;
      return {
        ...gameState,
        currentGuesses: newCurrentGuesses,
      };
    }
  };
};

const removeLetter: ReducerFactory = () => {
  return (gameState: GameState) => {
    const { currentGuesses } = gameState;

    const newCurrentGuess = [...currentGuesses[currentGuesses.length - 1]];
    if (newCurrentGuess.length === 0) {
      //No letters to remove, do nothing
      return gameState;
    } else {
      //remove last letter from current guess
      newCurrentGuess.pop();
      const newCurrentGuesses = [...currentGuesses];
      newCurrentGuesses[newCurrentGuesses.length - 1] = newCurrentGuess;
      return {
        ...gameState,
        currentGuesses: newCurrentGuesses,
      };
    }
  };
};

const evaluateGuess: ReducerFactory = () => {
  return (gameState: GameState) => {
    const { gameSettings, currentWord, currentGuesses } = gameState;
    const { guessesPerRound } = gameSettings;

    //evaluate the current guess (last guess in the current guesses array)
    const currentGuess = [...currentGuesses[currentGuesses.length - 1]];
    const evaluatedCurrentGuess = currentGuess.map(({ letter }, index) =>
      evaluateLetter(letter, index, currentWord),
    );

    //replace current guesses with evaluated one
    const newCurrentGuesses = [...currentGuesses];
    newCurrentGuesses[newCurrentGuesses.length - 1] = evaluatedCurrentGuess;

    let newGameState: GameState = {
      ...gameState,
      currentGuesses: newCurrentGuesses,
    };

    //handle round over
    const isGuessCorrect = checkGuessCorrect(evaluatedCurrentGuess);
    const isRoundOver =
      isGuessCorrect || newCurrentGuesses.length >= guessesPerRound;
    if (isRoundOver) {
      newGameState = {
        ...newGameState,
        isRoundComplete: true,
      };
    } else {
      //if not over, add a new guess
      newGameState = {
        ...newGameState,
        currentGuesses: [...newCurrentGuesses, []],
      };
    }

    //return state
    return newGameState;
  };
};

const endRound: ReducerFactory = () => {
  return (gameState: GameState) => {
    return [
      goToRoundScoreScreen,
      scoreRound,
      updateHistory,
      incrementCurrentRoundIndex,
      setCurrentWordToNextWord,
      resetCurrentGuesses,
      updateGameScores,
      resetIsRoundComplete,
      evaluateIsGameComplete,
    ].reduce(
      (newGameState: GameState, reducer: Reducer) => reducer(newGameState),
      gameState,
    );
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
    evaluateGuess: () => dispatch(evaluateGuess()),
    endRound: () => dispatch(endRound()),
    nextRound: () => dispatch(nextRound()),
  };
};

export { useGameState };
