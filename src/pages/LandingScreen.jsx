// Import hooks from react
import { useRef, useEffect, useState, useCallback } from 'react'
import GameScreen from '../pages/GameScreen';
import Spinner from 'react-bootstrap/Spinner'
import LoadingSpinner from '../components/LoadingSpinner';

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
  const [isWinner, setIsWinner] = useState()

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

  const handleGameOver = (winner = false) => {
    setIsGameLive(false)
    setIsGameOver(true)
    setIsWinner(winner)
  }

  useEffect( () => {

    socket.on('game:start', handleGameStart)

  }, [socket, handleGameStart] )

  return (
    <>
      {
        // Show start screen form when loading state is false
        !isLoading && !isGameLive && !isGameOver &&
        (
          <section className='start-screen'>
            <h1>Battleship</h1>
            <form className='form' onSubmit={handleSubmit}>
              <input type="text" id="username" className="form-control form-control-lg" onChange={e => setNameInput(e.target.value)} ref={searchInputRef} placeholder="Your name" required autoFocus />
              <br />
              <button type="submit" className="btn btn-primary">Enter queue</button>
            </form>
          </section>
        )
      }

      {
        // Show waiting screen when loading state is true
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
        // Show gamescreen when a game is live
        isGameLive && 
        (
          <GameScreen opponent= {opponentName} player={nameInput} shouldStart={shouldStart} socket={socket} onGameOver={handleGameOver} />
        )
      }

      {
        // Show result screen when game is over
        isGameOver &&
        (
          <section className='result-screen'>
            <div>Game is over</div>
            {isWinner && (<div>You won the game!</div>)}
            {!isWinner && (<div>You lost the game!</div>)}
            <button className="btn btn-primary" onClick={handleSubmit}>Play again</button>
          </section>  
        )
      }

    </>
  )
}

export default Landing