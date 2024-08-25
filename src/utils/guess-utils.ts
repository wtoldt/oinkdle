import {
  DefaultLetterEvaluation,
  LetterEvaluation,
  type Evaluation,
  type Guess,
} from '@/domain';

/**
 * Turn a word into a Guess
 *
 * @param word the guess so far
 * @param wordLength the length of the word
 * @returns Guess with letters of the word (unevaluated) and DefaultLetterEvaluation for the rest
 */
const createUnfinishedGuess = (word: string, wordLength: number): Guess => {
  return new Array<LetterEvaluation>(wordLength)
    .fill(new DefaultLetterEvaluation())
    .map(({ letter, evaluation }, index) => ({
      letter: word[index] ?? letter,
      evaluation,
    }));
};

/**
 * Turn a word into a Guess with each letter evaluated the same
 *
 * @param word word to evaluate
 * @param evaluation evaluation to apply to each letter
 * @returns Guess with each letter evaluated
 */
const createEvaluatedGuess = (word: string, evaluation: Evaluation): Guess => {
  return word.split('').map((letter) => ({ letter, evaluation }));
};

/**
 * Creates an unevaluated guess of a given length.
 *
 * @param {number} length - The length of the guess.
 * @return {Guess} An array of DefaultLetterEvaluation objects filled to the given length.
 */
const createUnevaluatedGuess = (length: number): Guess => {
  return new Array<LetterEvaluation>(length).fill(
    new DefaultLetterEvaluation(),
  );
};

/**
 * Checks if a guess is complete by verifying that all letters have been evaluated.
 *
 * @param {Guess} guess - The guess to check.
 * @return {boolean} - True if all letters have been evaluated, false otherwise.
 */
const checkGuessComplete = (guess: Guess): boolean => {
  return guess.every(({ evaluation }) => evaluation !== 'unevaluated');
};

/**
 * Checks if any letter in the guess is not marked as 'correct'.
 *
 * @param {Guess} guess - The guess to check.
 * @return {boolean} Returns true if any letter in the guess is not marked as 'correct', otherwise false.
 */
const checkGuessWrong = (guess: Guess): boolean => {
  return guess.some(({ evaluation }) => evaluation !== 'correct');
};

/**
 * Checks if all letters in the guess are marked as 'correct'.
 *
 * @param {Guess} guess - The guess to check.
 * @returns {boolean} - True if all letters are marked as 'correct', false otherwise.
 */
const checkGuessCorrect = (guess: Guess): boolean => {
  return guess.every(({ evaluation }) => evaluation === 'correct');
};

export {
  createUnfinishedGuess,
  createEvaluatedGuess,
  createUnevaluatedGuess,
  checkGuessComplete,
  checkGuessWrong,
  checkGuessCorrect,
};
