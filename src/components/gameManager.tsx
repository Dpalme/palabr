import { useEffect, useRef, useState } from 'react';
import { Params, useActionData, useParams } from 'react-router-dom';
import { range } from '../utils/range';
import { useToday } from '../hooks/useToday';
import useDailyWord from '../hooks/useDailyWord';
import useWordFromSeed from '../hooks/useWordFromSeed';
import { validateGuess } from '../hooks/useWordValidation';
import { LetterChip } from './letterChip';
import { WordInput } from './wordInput';
import { VictoryScreen } from './victoryScreen';

function getWord(gameType: string, params: Params) {
  switch (gameType) {
    case 'seeded':
      if (!params.seed) return { title: 'error', word: 'error' };
      return { title: params.seed, word: useWordFromSeed(params.seed) };
    default:
      return { title: useToday(), word: useDailyWord() };
  }
}
export function GameManager(props: { gameType: string }) {
  const params = useParams();
  const { title, word } = getWord(props.gameType, params);
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
      <p className="mb-2">{title}</p>
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
        {(results.current[results.current.length - 1]?.join('') ==
          '🟩🟩🟩🟩🟩' ||
          numAttempts == 6) && (
          <VictoryScreen
            results={results.current}
            gameType={props.gameType}
            title={title}
          />
        )}
      </div>
    </>
  );
}
