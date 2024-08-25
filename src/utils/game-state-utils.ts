import { type Evaluation, type LetterEvaluation } from '@/domain';

/**
 * Returns a new array with the value at the specified index replaced with the given value.
 *
 * @param {Array<T>} array - The input array.
 * @param {number} index - The index of the element to be replaced.
 * @param {T} value - The new value to be placed at the specified index.
 * @return {Array<T>} A new array with the value at the specified index replaced.
 */
const copyAndUpdateAtIndex = <T>(
  array: T[],
  index: number,
  value: T,
): T[] => {
  return [...array.slice(0, index), value, ...array.slice(index + 1)];
};

/**
 * Evaluates a letter based on its position in a given word and returns its evaluation.
 *
 * @param {string} letter - The letter to evaluate.
 * @param {number} index - The index of the letter in the word.
 * @param {string} word - The word to evaluate the letter against.
 * @return {LetterEvaluation} An object containing the letter and its evaluation.
 */
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

export { copyAndUpdateAtIndex, evaluateLetter };
