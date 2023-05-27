import wordList from '../assets/filtered_05.json';
import md5 from 'md5';

export function useWordFromSeed(seed: string) {
  var hashStr = md5(seed),
    hash = parseInt(hashStr, 16);
  return wordList[hash % wordList.length];
}

export default useWordFromSeed;
