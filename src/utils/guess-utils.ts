import {
  DefaultLetterEvaluation,
  type Guess,
  type Evaluation,
  type LetterEvaluation,
} from '@/domain';

/**
 * Turn a word into a Guess
 * @param word the guess so far
 * @param wordLength the length of the word
 * @returns Guess with letters of the word (unevaluated) and DefaultLetterEvaluation for the rest
 */
const createUnfinishedGuess = (word: string, wordLength: number): Guess => {
  return new Array(wordLength)
    .fill(new DefaultLetterEvaluation())
    .map(({ letter, evaluation }, index) => ({
      letter: word[index] || letter,
      evaluation,
    }));
};

/**
 * Turn a word into a Guess with each letter evaluated the same
 * @param word word to evaluate
 * @param evaluation evaluation to apply to each letter
 * @returns Guess with each letter evaluated
 */
const createEvaluatedGuess = (word: string, evaluation: Evaluation): Guess => {
  return word.split('').map((letter) => ({ letter, evaluation }));
};

const createUnevaluatedGuess = (length: number): Guess => {
  return new Array(length).fill(new DefaultLetterEvaluation());
};

const checkGuessComplete = (guess: Guess): boolean => {
  return guess.every(({ evaluation }) => evaluation !== 'unevaluated');
};

const checkGuessWrong = (guess: Guess): boolean => {
  return guess.some(({ evaluation }) => evaluation !== 'correct');
};

const checkGuessCorrect = (guess: Guess): boolean => {
  return guess.every(({ evaluation }) => evaluation === 'correct');
};

const evaluateLetter = (
  letter: string,
  index: number,
  word: string,
): LetterEvaluation => {
  let evaluation: Evaluation = 'absent';
  if (word[index] === letter) {
    evaluation = 'correct';
  } else if (word.includes(letter)) {
    evaluation = 'present';
  }
  return { letter, evaluation };
};

export {
  createUnfinishedGuess,
  createEvaluatedGuess,
  createUnevaluatedGuess,
  checkGuessComplete,
  checkGuessWrong,
  checkGuessCorrect,
  evaluateLetter,
};
