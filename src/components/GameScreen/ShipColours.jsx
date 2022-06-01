/*
 * Checks if the clicked pixel is a hit or miss, and renders the pixel colours based on that
 */

//takes in pixelArray from GameScreen
const ShipColours = ({ pixelArray, player }) => {
  return (
    <>
      <div className='gameBoard-wrapper'>
        <h2>{player}s board</h2>
        <div className='gameBoard'>
          {pixelArray.map((pixel, index) => {
            //if pixel not include miss, hit or ship render pixel as a plain pixel (pink)
            if (!pixel.miss && !pixel.hit && !pixel.hasShip) {
              return (
                <div className='pixel' key={index}>
                  {pixel.number}
                </div>
              );
            }
            //if pixel has ship and no hit, render pixel as red
            if (pixel.hasShip && !pixel.hit) {
              return (
                <div className='pixelShip' key={index}>
                  {pixel.number}
                </div>
              );
            }
            //if pixel has ship and hit, render pixel as green
            if (pixel.hasShip && pixel.hit) {
              return (
                <div className='pixelHit' key={index}>
                  {pixel.number}
                </div>
              );
            }
            //if pixel is a miss, render pixel yellow
            return (
              <div className='pixelMiss' key={index}>
                {pixel.number}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ShipColours;
