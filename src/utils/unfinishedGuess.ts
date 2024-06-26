import { DefaultLetterEvaluation, Guess } from '@/domain';

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

export { unfinishedGuess };
