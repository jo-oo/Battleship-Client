/*
 * Game Over Message
 */

//takes in pixelArray from GameScreen
const GameOver = ({ gameOver, gameOverOpp }) => {
  return (
    <>
      <div id='gameOver'>{gameOver}</div>
      <div id='gameOver'>{gameOverOpp}</div>
    </>
  );
};

export default GameOver;
