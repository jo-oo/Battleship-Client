/*
* Checks if the clicked pixel is a hit or miss, and renders the pixel colours based on that
*/

//takes in pixelArray from GameScreen
const ShipColours = ( { pixelArray, placeCoords } ) => {
	return ( 
        <>
        {pixelArray !== null && (
          <div className='gameBoard'>
            {pixelArray.map((pixel, index) => {
              //if pixel has ship and no hit, render pixel as red
              if (pixel.hasShip && !pixel.hit) {
                return <div className='pixelShip' key={index}>{pixel.number}</div>;
              }
              if (!pixel.isShipPlacable && !pixel.hit && !pixel.miss) {
                return <div className='pixel cant-place-ship' key={index}>{pixel.number}</div>;
              }
              //if pixel not include miss, hit or ship render pixel as a plain pixel (pink)
              if (!pixel.miss && !pixel.hit && !pixel.hasShip) {
                return <div className='pixel' key={index} onClick={() => {placeCoords(pixel.number)}}>{pixel.number}</div>;
              }
              
              //if pixel has ship and hit, render pixel as green
              if (pixel.hasShip && pixel.hit) {
                return <div className='pixelHit' key={index}>{pixel.number}</div>;
              }
              //if pixel is a miss, render pixel yellow
              return <div className='pixelMiss' key={index}>{pixel.number}</div>;
            })}
          </div>
        )}
         
        </> 
	)
}

export default ShipColours