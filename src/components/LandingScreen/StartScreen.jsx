/*
 * Renders out Start Screen
 */

//takes in setNameInput from GameScreen
const StartScreen = ({ handleSubmit, setNameInput, searchInputRef }) => {
    return (
      <>
        <div xs={1} md={3} l={8} className='start-screen g-4' >
          <section  id='input-field'>
              <h1>Battleship </h1>
                <form className='form' onSubmit={handleSubmit}>
                  <input type="text" id="username" className="form-control form-control-lg" onChange={e => setNameInput(e.target.value)} ref={searchInputRef} placeholder="Your name" required autoFocus />
                  <br />
                  <button type="submit" className="btn btn-primary">Enter queue</button>
                </form>
          </section>
        </div>
      </>
    );
  };
  
  export default StartScreen;