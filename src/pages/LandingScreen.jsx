// Import hooks from react
import { useRef, useEffect, useState, useCallback } from 'react'
import GameScreen from '../pages/GameScreen';
import Spinner from 'react-bootstrap/Spinner'
import LoadingSpinner from '../components/LoadingSpinner';
import StartScreen from '../components/LandingScreen/StartScreen';
import GameOver from '../components/LandingScreen/GameOver';

const Landing = ({ socket }) => {

  // State for if user is waiting for opponent
  const [isLoading, setIsLoading] = useState(false)
  // State for if a game has started
  const [isGameLive, setIsGameLive] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  // State for name entered in form
  const [nameInput, setNameInput] = useState()
  const searchInputRef = useRef()
  const [opponentName, setOpponentName] = useState()
  const [shouldStart, setShouldStart] = useState(false)
  const [resultData, setResultData] = useState()

  // Stuff to happen when game starts
  const handleGameStart = useCallback( (players, startingPlayer) => {
    
    // Find name of opponent
    setOpponentName( players.find( (player) => {
      return player !== nameInput
    } ) )

    // Change state if this players name is the one to start game
    if (startingPlayer === nameInput) {
      setShouldStart(true)
    }

    setIsGameLive(true)
    setIsLoading(false)
    setIsGameOver(false)

  }, [nameInput] ) 

  // When form is submitted
  const handleSubmit = (e) => {
    e.preventDefault()
    // Set loading state to true
    setIsLoading(true)
    setIsGameOver(false)

    socket.emit('user:join-queue', nameInput, handleGameStart)
  }

  const handleGameOver = (results) => {
    //setIsGameLive(false)
    setIsGameOver(true)
    setResultData(results)
  }

  useEffect( () => {

    socket.on('game:start', handleGameStart)

  }, [socket, handleGameStart] )

  
  //here is what we output on our page
  return (
    <>
      {
        // Show start screen form when loading state is false
        !isLoading && !isGameLive && !isGameOver &&
        (
          <StartScreen
            handleSubmit = {handleSubmit}
            setNameInput = {setNameInput}
            searchInputRef = {searchInputRef}
         >
        </StartScreen>
        )
      }

      {
        // Show waiting screen when loading state is true. Shows component Loading Spinner inside waiting screen
        isLoading &&
        (
          <section className='waiting-screen mt-4"'>
            <p>Hello {nameInput}</p>
            <p>Waiting for opponent...</p>
            <LoadingSpinner
		          loading={isLoading}
              Spinner={Spinner}
            >
            </LoadingSpinner>
          </section>
        )
      }
      {
        // Show gamescreen when a game is live. GameScreen is the Page thar renders out everything related to when the game is on
        isGameLive && 
        (
          <GameScreen 
            opponent= {opponentName} 
            player={nameInput} 
            shouldStart={shouldStart} 
            socket={socket} 
            onGameOver={handleGameOver} />
        )
      }
      {
        // Show result screen when game is over. GameOver is a component handling only what happens when Game is over
        isGameOver &&
        (
          <GameOver
		        result = {resultData}
            submit = {handleSubmit}
            >
            </GameOver>
        )
      }
    </>
  )
}

export default Landing