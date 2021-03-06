// Import hooks from react
import { useRef, useEffect, useState, useCallback } from 'react';
import GameScreen from '../pages/GameScreen';
import Spinner from 'react-bootstrap/Spinner';
import StartScreen from '../components/LandingScreen/StartScreen';
import GameOver from '../components/LandingScreen/GameOver';
import WaitingScreen from '../components/LandingScreen/WaitingScreen';

const Landing = ({ socket }) => {
  // State for if user is waiting for opponent
  const [isLoading, setIsLoading] = useState(false);
  // State for if a game has started
  const [isGameLive, setIsGameLive] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  // State for name entered in form
  const [nameInput, setNameInput] = useState();
  const searchInputRef = useRef();
  const [opponentName, setOpponentName] = useState();
  const [shouldStart, setShouldStart] = useState(false);
  const [resultData, setResultData] = useState();
  const [room_id, setRoom_id] = useState()
  // State for if username is already used by another player in the same room
  const [isNameTaken, setIsNameTaken] = useState(false)

  // Stuff to happen when game starts
  const handleGameStart = useCallback(
    (roomId, players, startingPlayer) => {

      // Get room id from server and asign it to state
      setRoom_id(roomId)

      // Find name of opponent
      setOpponentName(
        players.find((player) => {
          return player !== nameInput;
        })
      );

      // Change state if this players name is the one to start game
      if (startingPlayer === nameInput) {
        setShouldStart(true);
      } else {
        setShouldStart(false)
      }

      setIsGameLive(true);
      setIsLoading(false);
      setIsGameOver(false);
    },
    [nameInput]
  );

  // When a username is already taken
  const handleTakenUsername = () => {
    console.log('this username is taken already, try another one')
    setIsLoading(false)
    setIsNameTaken(true)
  }

  // When form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();
    // Set loading state to true
    setIsLoading(true);
    setIsGameOver(false);
    setIsNameTaken(false)

    socket.emit('user:join-queue', nameInput, handleTakenUsername);
  };

  const handleExit = (e) => {
    e.preventDefault();
    setIsGameOver(false);
    setIsGameLive(false);
  };

  const handleGameOver = (results) => {
    //setIsGameLive(false)
    setIsGameOver(true);
    setResultData(results);
    //handleGameStart();
  };

  const handlePlayAgain = (e) => {
    e.preventDefault();
    // Set loading state to true
    setIsLoading(true);
    setIsGameOver(false);
    setIsGameLive(false)

    socket.emit('user:join-queue', nameInput, handleTakenUsername);
  };

  useEffect(() => {
    socket.on('game:start', handleGameStart);
  }, [socket, handleGameStart]);

  //here is what we output on our page
  return (
    <>
      {
        // Show start screen form when loading state is false
        !isLoading && !isGameLive && !isGameOver && (
          <StartScreen
            handleSubmit={handleSubmit}
            setNameInput={setNameInput}
            searchInputRef={searchInputRef}
            isNameOccupied={isNameTaken}
          ></StartScreen>
        )
      }

      {
        // Show waiting screen when loading state is true. Shows component Loading Spinner inside waiting screen
        isLoading && (
          <>
            <WaitingScreen
            name = {nameInput}
            loading= {isLoading}
            Spinner = {Spinner}
            />
          </>
        )
      }
      {
        // Show gamescreen when a game is live. GameScreen is the Page thar renders out everything related to when the game is on
        isGameLive && 
        (
          <GameScreen 
            room_id= {room_id}
            opponent= {opponentName} 
            player={nameInput} 
            shouldStart={shouldStart} 
            socket={socket} 
            onGameOver={handleGameOver} />
        )
      }
      {
        // Show result screen when game is over. GameOver is a component handling only what happens when Game is over
        isGameOver && <GameOver result={resultData} submit={handlePlayAgain} exit={handleExit}></GameOver>
      }
    </>
  );
};

export default Landing;
