/*
 * Renders out Waiting Screen
 */

import LoadingSpinner from '../LoadingSpinner';

//takes name, loading and Spinner as props from LandingScreen
const WaitingScreen = ({ name, loading, Spinner }) => {
  return (
    <>
      <div className='waiting-screen'>
        <section className='waiting-screen-message mt-4"'>
          <div className='vibrate-1'>
            <h5>Hi there {name} ! </h5>
          </div>
          <div className='vibrate-1'>
            <h1>Battleship starts soon</h1>
          </div>
          <div className='vibrate-1'>
            <h5>Waiting for opponent...</h5>
          </div>
          <LoadingSpinner loading={loading} Spinner={Spinner}>
            {' '}
          </LoadingSpinner>{' '}
          {/* detta skickas med till komponenten Loading Spinner*/}
        </section>
      </div>
    </>
  );
};

export default WaitingScreen;
