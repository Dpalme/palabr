import wordList from '@assets/filtered_05.json';
import { range } from './range';

export async function getAvailableWords(letters: ILetters) {
  let filteredWords = [...wordList];
  for (const [letter, { status, position }] of Object.entries(letters)) {
    switch (status) {
      case '':
        break;
      case '⬛️':
        const nexp = new RegExp(letter.toLowerCase());
        filteredWords = filteredWords.filter((word) => !nexp.test(word));
        break;
      case '🟩':
        const posexp = new RegExp(
          [
            ...range(position!).map(() => '.'),
            letter.toLowerCase(),
            ...range(4 - position!).map(() => '.'),
          ].join('')
        );
        filteredWords = filteredWords.filter((word) => posexp.test(word));
      case '🟨':
        const mayxp = new RegExp(letter.toLowerCase());
        filteredWords = filteredWords.filter((word) => mayxp.test(word));
      default:
        break;
    }
  }
  filteredWords.sort(() => Math.random() - 0.5);

  return filteredWords;
}
