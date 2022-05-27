/*
 * Renders out Start Screen
 */

//takes in setNameInput from GameScreen
const StartScreen = ({ handleSubmit, setNameInput, searchInputRef  }) => {
    return (
      <>
       <section className='start-screen'>
            <h1>Battleship</h1>
            <form className='form' onSubmit={handleSubmit}>
              <input type="text" id="username" className="form-control form-control-lg" onChange={e => setNameInput(e.target.value)} ref={searchInputRef} placeholder="Your name" required autoFocus />
              <br />
              <button type="submit" className="btn btn-primary">Enter queue</button>
            </form>
          </section>
      </>
    );
  };
  
  export default StartScreen;