import shuffle from 'lodash.shuffle';
import { wordLists } from '@/data/word-list';

const getWords = (wordListId: string, count: number): string[] => {
  const shuffledWords = shuffle(wordLists.get(wordListId)!.wordList);
  return shuffledWords.slice(0, count);
};

export { getWords };
