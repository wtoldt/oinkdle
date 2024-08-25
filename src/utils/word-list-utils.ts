import shuffle from 'lodash.shuffle';
import { wordLists } from '@/data/word-list';

const getWords = (wordListId: string, count: number): string[] => {
  const wordList = wordLists.get(wordListId);
  if (wordList) {
    const shuffledWords = shuffle(wordList.wordList);
    return shuffledWords.slice(0, count);
  } else {
    throw new Error(`Word list ${wordListId} not found`);
  }
};

export { getWords };
