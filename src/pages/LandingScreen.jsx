// Import hooks from react
import { useRef, useState } from 'react'
import GameScreen from '../pages/GameScreen';

const Landing = () => {

  // State for if user is waiting for opponent
  const [isLoading, setIsLoading] = useState(false)
  // State for name entered in form
  const [nameInput, setNameInput] = useState()
  const searchInputRef = useRef()

  // When form is submitted
  const handleSubmit = (e) => {
    e.preventDefault()
    // Set loading state to true
    setIsLoading(true)
  }

  return (
    <>
      {
        // Show start screen form when loading state is false
        !isLoading &&
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
          <section className='waiting-screen'>
            <p>Hello {nameInput}</p>
            <p>Waiting for opponent...</p>

            <GameScreen />


          </section>
        )
      }

    </>
  )
}

export default Landing