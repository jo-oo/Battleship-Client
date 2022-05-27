/*
* Checks if the clicked pixel is a hit or miss, and renders the pixel colours based on that
*/

//takes in pixelArray from GameScreen
const ShipColours = ( { pixelArray } ) => {
	return ( 
        <>
         <div className='gameBoard'>
            {pixelArray.map((pixel) => {
              //if pixel not include miss, hit or ship render pixel as a plain pixel (pink)
              if (!pixel.miss && !pixel.hit && !pixel.hasShip) {
                return <div className='pixel'>{pixel.number}</div>;
              }
              //if pixel has ship and no hit, render pixel as red
              if (pixel.hasShip && !pixel.hit) {
                return <div className='pixelShip'>{pixel.number}</div>;
              }
              //if pixel has ship and hit, render pixel as green
              if (pixel.hasShip && pixel.hit) {
                return <div className='pixelHit'>{pixel.number}</div>;
              }
              //if pixel is a miss, render pixel yellow
              return <div className='pixelMiss'>{pixel.number}</div>;
            })}
          </div>
        </> 
	)
}

export default ShipColours