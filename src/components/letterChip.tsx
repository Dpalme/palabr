import { motion as m } from 'framer-motion';

export const LetterChip = (props: {
  status?: string;
  letter: string;
  classList?: string;
  delay?: number;
}) => {
  return (
    <m.div
      initial={{ y: '-2rem' }}
      animate={{ y: 0 }}
      className={[
        'w-14 justify-center align-center flex h-14 outline text-white',
        'outline-white dark:(text-black outline-black)',
        props.status == '🟩'
          ? 'bg-green-400 outline-green-400'
          : props.status == '🟨'
          ? 'bg-yellow-400 outline-yellow-400'
          : props.status == '⬛️'
          ? 'bg-dark-600 outline-dark-600'
          : props.status == '-' && 'bg-transparent',
        !props.status && 'bg-dark-900',
        props.classList,
      ].join(' ')}
    >
      <p className="text-4xl font-800 uppercase leading-normal inline">
        {props.letter || ' '}
      </p>
    </m.div>
  );
};
