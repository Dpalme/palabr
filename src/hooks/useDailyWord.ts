import { useToday } from './useToday';
import useWordFromSeed from './useWordFromSeed';

export const useDailyWord = () => {
  const today = useToday();
  return useWordFromSeed(today);
};

export default useDailyWord;
