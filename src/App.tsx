import { useEffect, useRef, useState } from 'react';
import useDailyWord from './hooks/useDailyWord';
import { WordInput } from './components/wordInput';
import { useActionData } from 'react-router-dom';
import { LetterChip } from './components/letterChip';
import { validateGuess } from './hooks/useWordValidation';
import { VictoryScreen } from './components/victoryScreen';

function range(n: number) {
  return [...Array(n).keys()];
}

function App() {
  const word = useDailyWord();
  const lastAttempt = useActionData() as string;
  const attempts = useRef<string[]>([]);
  const results = useRef<string[][]>([]);
  const [numAttempts, setNumAttempts] = useState(0);

  useEffect(() => {
    if (!lastAttempt) return;
    attempts.current.push(lastAttempt);
    results.current.push(validateGuess(lastAttempt, word));
    setNumAttempts(numAttempts + 1);
  }, [lastAttempt]);

  return (
    <>
      <h1 className="font-title uppercase text-4xl mb-4">Palabr</h1>
      <div className="grid grid-rows-6 grid-cols-[repeat(5,3.5rem)] gap-2 justify-center">
        {attempts.current.flatMap((word, i) =>
          word
            .split('')
            .map((letter, n) => (
              <LetterChip
                letter={letter}
                key={'attempt' + i + n}
                status={results.current[i][n]}
              />
            ))
        )}
        {numAttempts < 6 && (
          <>
            <WordInput />
            {range(5 - numAttempts).flatMap((i) =>
              range(5).map((n) => (
                <LetterChip
                  letter={' '}
                  key={'attempt' + (i + numAttempts) + n}
                  status="-"
                />
              ))
            )}
          </>
        )}
      </div>
      {(results.current[results.current.length - 1]?.join('') == '🟩🟩🟩🟩🟩' ||
        numAttempts == 6) && <VictoryScreen results={results.current} />}
    </>
  );
}

export default App;
