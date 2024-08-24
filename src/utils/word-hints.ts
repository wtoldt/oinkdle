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
