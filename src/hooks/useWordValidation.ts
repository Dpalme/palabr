export const validateGuess = (guessedWord: string, correctWord: string) => {
  if (!guessedWord || !correctWord) return [];
  guessedWord = guessedWord.toLowerCase();
  correctWord = correctWord.toLowerCase();
  const fullyMatched = guessedWord
    .split('')
    .map((char: string, pos: number) => {
      if (char == correctWord[pos]) {
        correctWord = [
          correctWord.slice(0, pos),
          ' ',
          correctWord.slice(pos + 1),
        ].join('');
        return '🟩';
      }
      return char;
    });
  const response = fullyMatched.map((char: string) => {
    if (char == '🟩') return '🟩';
    const indexOfLetter = correctWord.indexOf(char);
    if (indexOfLetter != -1) {
      correctWord = [
        correctWord.slice(0, indexOfLetter),
        ' ',
        correctWord.slice(indexOfLetter + 1),
      ].join('');
      return '🟨';
    }
    return '⬛️';
  });
  return response;
};
