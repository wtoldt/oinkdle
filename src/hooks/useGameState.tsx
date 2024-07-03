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
  scoreRound,
} from '@/utils';

type Reducer = (gameState: GameState) => GameState;
type ReducerFactory = (input?: any) => Reducer;

const newGame: ReducerFactory = (gameSettings: GameSettings) => {
  return (gameState: GameState): GameState => {
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
    const {
      gameSettings,
      gameScreen,
      words,
      currentWord,
      history,
      currentGuesses,
      currentGuessIndex,
      currentRoundIndex,
      roundScore,
      prevScore,
      score,
      isGameComplete,
    } = gameState;
    const { guessesPerRound, rounds } = gameSettings;

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

    //#########################################################
    //   Stuff we do if the guess is correct or round is over
    //#########################################################
    //if round is over, update lots of state
    const isRoundOver =
      isGuessCorrect || newCurrentGuessIndex >= guessesPerRound;
    let newGameScreen = gameScreen;
    let newHistory = history;
    let newCurrentRoundIndex = currentRoundIndex;
    let newCurrentWord = currentWord;
    let newRoundScore = roundScore;
    let newPrevScore = prevScore;
    let newScore = score;
    let newIsGameComplete = isGameComplete;

    if (isRoundOver) {
      //go to roundScore screen to see round score breakdown
      newGameScreen = 'roundScore';
      //see scoreRound function for scoring rules
      newRoundScore = scoreRound({
        guessesAllowed: guessesPerRound,
        guessesMade: newCurrentGuessIndex,
        isLastGuessCorrect: isGuessCorrect,
      });
      //create a Round out of the Guesses and score, push it to history
      newHistory = [
        ...history,
        {
          word: currentWord,
          score: newRoundScore,
          guesses: newGuesses,
        },
      ];
      //increase currentRoundIndex and reset currentGuessIndex
      newCurrentRoundIndex = currentRoundIndex + 1;
      newCurrentGuessIndex = 0;
      newCurrentWord = words[newCurrentRoundIndex];
      //reset guesses by filling with unevaluated guesses
      newGuesses = new Array(gameSettings.guessesPerRound).fill(
        createUnevaluatedGuess(gameSettings.wordLength),
      );
      //update game scores
      newPrevScore = score;
      newScore = score + newRoundScore;

      //update isGameComplete (newCurrentRoundIndex is zero based, so when it reaches gameSettings.rounds, it's game over)
      newIsGameComplete = newCurrentRoundIndex >= rounds;
    }

    //return state
    return {
      gameSettings,
      gameScreen: newGameScreen,
      words,
      currentWord: newCurrentWord,
      history: newHistory,
      currentGuesses: newGuesses,
      currentGuessWord: newCurrentGuessWord,
      currentGuessIndex: newCurrentGuessIndex,
      currentRoundIndex: newCurrentRoundIndex,
      roundScore: newRoundScore,
      prevScore: newPrevScore,
      score: newScore,
      isGameComplete: newIsGameComplete,
    };
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
