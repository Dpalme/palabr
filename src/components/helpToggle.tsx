import { useState } from 'react';
import { WordDictionary } from './wordDictionary';

export const HelpToggle = (props: { letters: ILetters }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-4 right-4 flex flex-col gap-2">
      <div
        className="cursor-pointer text-xs underline"
        onClick={() => setOpen(!open)}
      >
        {open ? 'X' : 'Help'}
      </div>
      {open && <WordDictionary letters={props.letters} />}
    </div>
  );
};
