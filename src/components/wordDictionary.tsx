import { useAvailableWords } from '@/hooks/useAvailableWords';

export const WordDictionary = (props: { letters: ILetters }) => {
  const { words, loading } = useAvailableWords(props.letters);
  return loading ? (
    <p className="text-xs">...</p>
  ) : (
    <>
      {words?.slice(0, 4).map((word) => (
        <p className="text-xs" key={word}>
          {word}
        </p>
      ))}
    </>
  );
};
