const wordListFilter = (
  excludedLetters: string,
  letterPositions: [{ letter: string; position: number }],
  includedLetters: [{ letter: string; notPositions: [number] }],
  word: string,
): boolean => {
  const letters = word.split('');
  const excludedLettersArr = excludedLetters.split('');
  return (
    excludedLettersArr.every(
      (excludedLetter) => !letters.includes(excludedLetter),
    ) &&
    letterPositions.every(
      ({ letter, position }) => letters[position] === letter,
    ) &&
    includedLetters.every(
      ({ letter, notPositions }) =>
        letters.includes(letter) &&
        !notPositions.includes(letters.indexOf(letter)),
    )
  );
};

export const wordListFilterCurry = (
  excludedLetters: string,
  letterPositions: [{ letter: string; position: number }],
  includedLetters: [{ letter: string; notPositions: [number] }],
): ((word: string) => boolean) => {
  return (word: string): boolean =>
    wordListFilter(excludedLetters, letterPositions, includedLetters, word);
};

export const wordListPositionLetterFrequency = (
  wordList: string[],
): Map<string, number>[] => {
  /**
   * Map to help keep track of letter frequencies
   */
  const createEmptyLetterFrequencyMap: () => Map<string, number> = () =>
    'abcdefghijklmnopqrstuvwxyz'.split('').reduce((acum, cur) => {
      acum.set(cur, 0);
      return acum;
    }, new Map<string, number>());

  /**
   * Datastructure to keep track of letter frequencies for each position in a 5 letter word
   */
  const letterPositionFrequency = new Array(5)
    .fill(null)
    .map(() => createEmptyLetterFrequencyMap());

  /**
   * Update letter position frequency for each word
   */
  wordList.forEach((word) => {
    word
      .split('')
      .forEach((letter, index) =>
        letterPositionFrequency[index].set(
          letter,
          (letterPositionFrequency[index].get(letter) ?? 0) + 1,
        ),
      );
  });

  return letterPositionFrequency;
};

/**
 * Sorts letter position frequency in descending order
 * @returns Array of positions (5 for 5 letter words) where each position is an array of [letter, frequency] tuples
 */
export const sortLetterPositionFrequency = (
  letterPositionFrequency: Map<string, number>[],
): [string, number][][] =>
  letterPositionFrequency.map((freqMap) =>
    [...freqMap.entries()].sort(([, a], [, b]) => b - a),
  );

/**
 * Pivots a sorted letter position frequency datastructure
 * @returns Array of top letter frequency for each position.
 * Ex: [
 *  ['s,73', 'o,74', 'a,76', 'e,71', 'e,111'],
 *  ['t,43', 'r,74', 'i,66', 'n,48', 't,73']
 * ]
 */
export const tabularSortedLetterPositionFrequency = (
  sortedLetterPositionFrequency: [string, number][][],
) => {
  return new Array(26)
    .fill(null)
    .map((_, letterIndex) =>
      new Array(5)
        .fill(null)
        .map((__, positionIndex) =>
          sortedLetterPositionFrequency[positionIndex][letterIndex].join(','),
        ),
    );
};

export const rankWordByLetterFrequency = (
  word: string,
  letterPositionFrequency: Map<string, number>[],
) =>
  word
    .split('')
    .map((letter, index) => letterPositionFrequency[index].get(letter) ?? 0)
    .reduce((sum, cur) => sum + cur, 0);

export const filterWordlistByLetterFrequency = (
  [f0, f1, f2, f3, f4]: [number, number, number, number, number],
  wordList: string[],
  letterPositionFrequency: Map<string, number>[],
) =>
  wordList.filter(
    (word) =>
      (letterPositionFrequency[0].get(word[0]) ?? 0) >= f0 &&
      (letterPositionFrequency[1].get(word[1]) ?? 0) >= f1 &&
      (letterPositionFrequency[2].get(word[2]) ?? 0) >= f2 &&
      (letterPositionFrequency[3].get(word[3]) ?? 0) >= f3 &&
      (letterPositionFrequency[4].get(word[4]) ?? 0) >= f4,
  );
