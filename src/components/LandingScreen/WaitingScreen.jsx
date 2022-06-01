/*
 * Renders out Waiting Screen
 */

import LoadingSpinner from "../LoadingSpinner";

//takes name, loading and Spinner as props from LandingScreen
const WaitingScreen = ({name, loading, Spinner }) => {
    return (
      <>
        <div className='waiting-screen' >
        <section className='waiting-screen-message mt-4"'>
            <h1>Hi there {name} ! </h1>
            <h1>Battleship starts soon</h1>
            <h2>Waiting for opponent...</h2>
            <LoadingSpinner loading={loading} Spinner={Spinner}> </LoadingSpinner> {/* detta skickas med till komponenten Loading Spinner*/}
        </section>
        </div>
      </>
    );
  };
  
  export default WaitingScreen;