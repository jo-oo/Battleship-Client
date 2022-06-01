/*
 * Renders the scoreboard with different views for each player
 */

//takes in opponent, oppShiftLeft etc from GameScreen
const ScoreBoard = ({ opponent, oppShipsLeft, player, playerShipsLeft, isYourTurn }) => {
  return (
    <>
      <div id='scoreBoard'>
        <div id='opponent-board'>
          <h3>You: {player}</h3>
          <h4>Ships remaining: {playerShipsLeft}</h4>
        </div>

        <div id='currentPlayer-board'>
          <h3>Opponent: {opponent}</h3>
          <h4>Ships remaning: {oppShipsLeft}</h4>
        </div>

        <div id='turnToggle'>
          {isYourTurn && <h3> It's your turn </h3>}
          {!isYourTurn && <h3> Opponents turn </h3>}
        </div>
      </div>
    </>
  );
};

export default ScoreBoard;
