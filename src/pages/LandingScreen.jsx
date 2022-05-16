import { useEffect, useRef, useState } from 'react'

const Landing = () => {

  const [nameInput, setNameInput] = useState()
  const searchInputRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log('Your name is:', nameInput )
  }

  return (
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

export default Landing