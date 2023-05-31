import { Form, useLocation, useSubmit } from 'react-router-dom';
import { LetterChip } from './letterChip';
import { VALID_INPUT } from '../validInput';
import { useForm } from 'react-hook-form';
import { Keyboard } from './fakeKeyboard';

export const WordInput = (props: { letters: ILetters }) => {
  const location = useLocation();
  const { register, watch, setValue, getValues } = useForm({
    defaultValues: { guess: '' },
  });

  const submit = useSubmit();

  const guess = watch('guess');

  const guessLetters = guess
    .padEnd(5, ' ')
    .split('')
    .map((letter, i) => (
      <LetterChip key={i} letter={letter} classList="currentGuess" />
    ));

  return (
    <>
      <div className="relative w-full col-span-full">
        <div
          className="grid gap-2 w-full justify-center
          grid-cols-[repeat(5,3.5rem)]"
        >
          {guessLetters}
        </div>
        <Form
          replace
          method="post"
          action={location.pathname}
          id="word-form"
          onSubmit={() => {
            requestAnimationFrame(() => setValue('guess', ''));
          }}
        >
          <input
            type="text"
            className="opacity-0 w-full h-full absolute
          top-0 left-0"
            {...register('guess', { required: true })}
            maxLength={5}
            pattern={VALID_INPUT}
            onInvalid={(ev) => {
              document
                .querySelectorAll('.currentGuess')
                .forEach((el) =>
                  el.classList.add('!animate-shake-x', '!animate-duration-700')
                );

              ev.preventDefault();

              setTimeout(
                () =>
                  document
                    .querySelectorAll('.currentGuess')
                    .forEach((el) =>
                      el.classList.remove(
                        '!animate-shake-x',
                        '!animate-duration-700'
                      )
                    ),
                700
              );
            }}
            autoComplete="off"
          />
        </Form>
      </div>
      <Keyboard
        addLetter={(letter: string) => {
          guess.length < 5 && setValue('guess', guess + letter);
        }}
        removeLetter={() =>
          guess.length > 0 &&
          setValue('guess', guess.slice(0, guess.length - 1))
        }
        submitWord={() => {
          if (guess.length != 5) return;
          submit(getValues(), { action: location.pathname, method: 'POST' });
          requestAnimationFrame(() => setValue('guess', ''));
        }}
        letters={props.letters}
      />
    </>
  );
};
