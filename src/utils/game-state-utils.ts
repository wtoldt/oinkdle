const copyAndUpdateAtIndex = <T>(
  array: Array<T>,
  index: number,
  value: T,
): Array<T> => {
  return [...array.slice(0, index), value, ...array.slice(index + 1)];
};

const scoreRound = ({
  guessesAllowed,
  guessesMade,
  isLastGuessCorrect,
}: {
  guessesAllowed: number;
  guessesMade: number;
  isLastGuessCorrect: boolean;
}) => {
  //roundScore is total guesses per round - incorrect guesses
  //assume every guess made so far is wrong
  //but the latest guess, the one making us score this round, may be correct
  //in which case we add 1
  return guessesAllowed - guessesMade + (isLastGuessCorrect ? 1 : 0);
};

export { copyAndUpdateAtIndex, scoreRound };
