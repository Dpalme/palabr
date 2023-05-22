function shareGame(shareString: string) {
  if (navigator && !!navigator.share) {
    navigator
      .share({
        text: shareString,
      })
      .then(() => {
        console.log('Thanks for sharing!');
      })
      .catch((err) => {
        alert(`No lo pude compartir porque ${err.message}`);
      });
  } else if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(shareString);
  } else {
    var copyText: HTMLTextAreaElement = document.getElementById(
      'resultText'
    ) as HTMLTextAreaElement;
    if (!copyText) return;
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand('copy');
  }
}

function getScore(game: string) {
  const correct = game.match(/🟩/g) || [];
  const wrongSpot = game.match(/🟨/g) || [];
  const wrong = game.match(/⬛️/g) || [];

  return (
    ((correct.length * 4 + wrongSpot.length * 2 - wrong.length) /
      ((game.length - 5) / 5)) >>
    0
  );
}

export const VictoryScreen = (props: { results: string[][] }) => {
  const game = props.results.map((round) => round.join('')).join('\n');
  const today = new Date().toISOString().slice(0, 10);
  const shareString = `palabr ${today} ${
    props.results.length
  }/6\n\npuntos: ${getScore(game)}\n\n${game}`;
  return (
    <div className="fixed z-10 top-0 left-0 w-full h-full bg-dark-300 bg-opacity-50">
      <div className="bottom-0 w-full absolute p-4 bg-dark-300 h-[30vh]">
        <h2 className="text-3xl">{today}</h2>
        <div className="flex w-full flex-row gap-4 mb-4">
          <p className="text-2xl">Puntuación {getScore(game)}</p>
        </div>
        {!navigator.clipboard.writeText && (
          <textarea defaultValue={shareString} id="resultText" />
        )}
        <div
          className="bg-green-500 rounded-md cursor-pointer font-800 text-xl py-4"
          onClick={() => shareGame(shareString)}
        >
          Compartir
        </div>
      </div>
    </div>
  );
};
