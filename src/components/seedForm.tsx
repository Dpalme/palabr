import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export function SeedForm() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({ defaultValues: { seed: '' } });

  return (
    <form
      onSubmit={handleSubmit((values) => {
        navigate('/' + values.seed);
      })}
      className="flex flex-col mt-4 gap-4"
    >
      <label htmlFor="seed">Seed</label>
      <input
        type="text"
        id="seed"
        {...register('seed')}
        className="rounded-md text-dark-400 p-2 text-center"
      />
      <input
        type="submit"
        value="Load Seed"
        className="text-dark-400 bg-emerald-600
        text-light-200 rounded-full mx-auto px-6 py-2"
      />
    </form>
  );
}

export default SeedForm;
