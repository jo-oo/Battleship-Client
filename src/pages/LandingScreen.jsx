import React from 'react'

const landing = () => {
  return (
    <section className='start-screen'>
        <h1>Battleship</h1>
        <form>
          <input type="text" id="username" className="form-control form-control-lg" placeholder="Your name" required autoFocus />
          <button type="submit" className="btn btn-primary">Enter queue</button>
        </form>
    </section>
  )
}

export default landing