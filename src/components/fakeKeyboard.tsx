import { MouseEventHandler } from 'react';

const Key = (props: {
  letter: string;
  className?: string;
  onClick?: MouseEventHandler;
  status?: string;
}) => {
  return (
    <div
      className={[
        'w-auto h-12 bg-dark-50 text-white rounded-md cursor-pointer',
        'text-center uppercase font-800 text-xl leading-relaxed',
        'flex content-center items-center justify-center col-span-2',
        props.status == '🟩'
          ? 'bg-green-400 outline-green-400'
          : props.status == '🟨'
          ? 'bg-yellow-400 outline-yellow-400'
          : props.status == '⬛️' && 'bg-dark-500 outline-dark-500',
        !props.status && 'bg-dark-50 outline-dark-50',
        props.className,
      ].join(' ')}
      onClick={props.onClick}
    >
      <p>{props.letter}</p>
    </div>
  );
};

export const Keyboard = (props: {
  submitWord: Function;
  addLetter: Function;
  removeLetter: Function;
  letters: ILetters;
}) => {
  return (
    <div
      className="fixed bottom-0 mb-10 flex flex-col gap-2 p-2 bg-dark-200
    w-full left-0 col-span-full isolate content-center items-center"
    >
      <div className="w-full grid grid-cols-20 gap-1">
        {'QWERTYUIOP'.split('').map((letter) => (
          <Key
            key={letter}
            letter={letter}
            onClick={() => props.addLetter(letter)}
            status={props.letters[letter].status}
          />
        ))}
      </div>
      <div className="w-full grid grid-cols-20 gap-1">
        {'ASDFGHJKLÑ'.split('').map((letter) => (
          <Key
            key={letter}
            letter={letter}
            onClick={() => props.addLetter(letter)}
            status={props.letters[letter].status}
          />
        ))}
      </div>
      <div className="w-full grid grid-cols-20 gap-1">
        <Key
          letter="Enter"
          className="col-span-3 !text-xs"
          onClick={() => props.submitWord()}
        />
        {'ZXCVBNM'.split('').map((letter) => (
          <Key
            key={letter}
            letter={letter}
            onClick={() => props.addLetter(letter)}
            status={props.letters[letter].status}
          />
        ))}
        <Key
          letter="␡"
          className="col-span-3"
          onClick={() => props.removeLetter()}
        />
      </div>
    </div>
  );
};
