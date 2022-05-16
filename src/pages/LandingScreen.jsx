import { useEffect, useRef, useState } from 'react'

const Landing = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [nameInput, setNameInput] = useState()
  const searchInputRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    console.log('Your name is:', nameInput )
  }

  return (
    <>
    {
      !isLoading && 
      (<section className='start-screen'>
          <h1>Battleship</h1>
          <form className='form' onSubmit={handleSubmit}>
            <input type="text" id="username" className="form-control form-control-lg" onChange={e => setNameInput(e.target.value)} ref={searchInputRef} placeholder="Your name" required autoFocus />
            <br />
            <button type="submit" className="btn btn-primary">Enter queue</button>
          </form>
      </section>)
    }

    {
      isLoading && (
        <section className='waiting-screen'>
          <p>Hello {nameInput}</p>
          <p>Waiting for opponent...</p>
        </section>
      )
    }
    
    </>
  )
}

export default Landing