/*
 * Renders out and shows result screen when game is over
 */

//takes in resultData and handleSubmit from GameScreen
const GameOver = ({ result, submit, exit }) => {
  return (
    <>
      <section className='result-screen'>
        <div className='result-screen-wrapper'>
          {result.won && (
            <>
              <div><h2>Congratulations, you won!</h2></div>
            </>
          )}
          {!result.won && (
            <>
              <div><h2>You lost the game :&#40;</h2></div>
            </>
          )}
          <button className='btn btn-primary' onClick={submit}>
            Play again
          </button>
          <button className='btn btn-primary' onClick={exit}>
            Exit
          </button>
        </div>
      </section>
    </>
  );
};

export default GameOver;
