/*
 * Renders out Waiting Screen
 */

//takes no props at the moment
const WaitingScreen = () => {
    return (
      <>
        <div className='waiting-screen' >
        <section className='waiting-screen-message mt-4"'>
            <h1>Hi there!</h1>
            <h1>Battleship starts soon</h1>
            <h2>Waiting for opponent...</h2>
            
        </section>
        </div>
      </>
    );
  };
  
  export default WaitingScreen;