import wordList from '../assets/filtered_05.json';
import md5 from 'md5';
import { useToday } from './useToday';

function getWordForISODate(isoDate: string) {
  var hashStr = md5(isoDate),
    hash = parseInt(hashStr, 16);
  return wordList[hash % wordList.length];
}

export const useDailyWord = () => {
  const today = useToday();
  return getWordForISODate(today);
};

export default useDailyWord;
