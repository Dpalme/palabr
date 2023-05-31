import { Navbar } from './components/navbar';
import { GameManager } from './components/gameManager';
import SeedForm from './components/seedForm';

function App(props: { gameType: string }) {
  return (
    <>
      <Navbar />
      <h1 className="font-title uppercase text-2xl mt-2">Palabr</h1>
      {props.gameType == 'seedForm' ? (
        <SeedForm />
      ) : (
        <GameManager gameType={props.gameType} />
      )}
    </>
  );
}

export default App;
