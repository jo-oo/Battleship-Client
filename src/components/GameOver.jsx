/*
 * Game Over Message
 */

//takes in pixelArray from GameScreen
const GameOver = ({ gameOver, gameOverOpp }) => {
  return (
    <>
      <div id="gameOver">{gameOver && <h3>Game Over, you lost!!</h3>}</div>
      <div id="gameOver">
        {gameOverOpp && <h3>IT'S GAME OVER, you won!!!</h3>}
      </div>
    </>
  );
};

export default GameOver;
