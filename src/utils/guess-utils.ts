import { DefaultLetterEvaluation, Guess, Evaluation } from '@/domain';

/**
 * Turn a word into a Guess
 * @param word the guess so far
 * @param wordLength the length of the word
 * @returns Guess with letters of the word (unevaluated) and DefaultLetterEvaluation for the rest
 */
const unfinishedGuess = (word: string, wordLength: number): Guess => {
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
const evaluatedGuess = (word: string, evaluation: Evaluation): Guess => {
  return word.split('').map((letter) => ({ letter, evaluation }));
};

const isGuessComplete = (guess: Guess): boolean => {
  return guess.every(({ evaluation }) => evaluation !== 'unevaluated');
};

const isGuessWrong = (guess: Guess): boolean => {
  return guess.some(({ evaluation }) => evaluation !== 'correct');
};

export { unfinishedGuess, evaluatedGuess, isGuessComplete, isGuessWrong };
