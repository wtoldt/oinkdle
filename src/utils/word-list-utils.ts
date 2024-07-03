import { wordLists } from '@/data/word-list';
import shuffle from 'lodash.shuffle';
const getWords = (wordListId: string, count: number): string[] => {
  const shuffledWords = shuffle(wordLists.get(wordListId)!.wordList);
  return shuffledWords.slice(0, count);
};

export { getWords };
