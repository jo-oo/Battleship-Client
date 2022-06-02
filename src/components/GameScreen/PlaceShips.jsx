/*
 * Renders the place your ships board
 */

//takes in etc from GameScreen
const PlaceShips = ({ nrOfShipsLeftToPlace, setSelectedShip, selectedShip, ships, currentDirection, updateCurrentDirection, fillShipCoord, setPixelArray, createPixelArray }) => {
    return (
      <>
         {nrOfShipsLeftToPlace !== 0 && (
            <div className='placement-container'>
              <h3>Place your ships</h3>
              <div className='btn-ship-selection'>
                <button
                  className={selectedShip.id === 0 ? 'btn btn-info active x2' : 'btn btn-info x2'}
                  onClick={() => {
                    setSelectedShip(ships[0]);
                  }}
                  disabled={ships[0].isPlaced}
                >
                  2x ship
                </button>
                <button
                  className={selectedShip.id === 1 ? 'btn btn-info active x2' : 'btn btn-info x2'}
                  onClick={() => {
                    setSelectedShip(ships[1]);
                  }}
                  disabled={ships[1].isPlaced}
                >
                  2x ship
                </button>
                <button
                  className={selectedShip.id === 2 ? 'btn btn-info active x3' : 'btn btn-info x3'}
                  onClick={() => {
                    setSelectedShip(ships[2]);
                  }}
                  disabled={ships[2].isPlaced}
                >
                  3x ship
                </button>
                <button
                  className={selectedShip.id === 3 ? 'btn btn-info active x4' : 'btn btn-info x4'}
                  onClick={() => {
                    setSelectedShip(ships[3]);
                  }}
                  disabled={ships[3].isPlaced}
                >
                  4x ship
                </button>
              </div>
              <div className='btn-direction-selection'>
                <button
                  className='btn btn-info'
                  onClick={() => {
                    updateCurrentDirection();
                  }}
                >
                  Change direction <img src={`arrow${currentDirection}.png`} alt='arrow showing ship direction' />
                </button>
                <button
                className='btn btn-info btn-randomise'
                onClick={() => {
                  fillShipCoord();
                  setPixelArray(createPixelArray());
                }}
                >
                Randomise positions
                </button>
               </div>
            </div>
          )}
      </>
    );
  };
  
  export default PlaceShips;
  