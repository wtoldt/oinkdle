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
 * Turn a word into a Guess with each letter evaluated
 * @param word word to evaluate
 * @param evaluation evaluation to apply to each letter
 * @returns Guess with each letter evaluated
 */
const evaluatedGuess = (word: string, evaluation: Evaluation): Guess => {
  return word.split('').map((letter) => ({ letter, evaluation }));
};

/**
 * Turn a word into a correct guess
 * @param word the correct word
 * @returns Guess with letters of the word evaluated as correct
 */
const correctGuess = (word: string): Guess => {
  return evaluatedGuess(word, 'correct');
};

export { unfinishedGuess, correctGuess, evaluatedGuess };
