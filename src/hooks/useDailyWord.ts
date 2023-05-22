import wordList from '../assets/filtered_05.json';
import md5 from 'md5';

export const useDailyWord = () => {
  const today = new Date().toISOString().slice(0, 9);
  var hashStr = md5(today),
    hash = 0;
  for (var i = 0; i < md5.length; i++) {
    hash += hashStr.charCodeAt(i);
  }
  return wordList[hash];
};

export default useDailyWord;
