import wordList from '../assets/filtered_05.json';
import md5 from 'md5';

export const useDailyWord = () => {
  const today = useToday();
  return getWordForISODate(today);
};

export default useDailyWord;
