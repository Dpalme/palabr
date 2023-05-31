import { getAvailableWords } from '@/utils/getAvailableWords';
import { useEffect, useState } from 'react';

export const useAvailableWords = (letters: ILetters) => {
  const [loading, setLoading] = useState(false);
  const [words, setWords] = useState<string[] | undefined>(undefined);
  useEffect(() => {
    setLoading(true);
    getAvailableWords(letters).then((words) => {
      setLoading(false);
      setWords(words);
    });
  }, [letters]);
  return { loading, words };
};
