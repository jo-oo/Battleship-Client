/*
* Checks if the clicked pixel is a hit or miss, and renders the pixel colours based on that
*/

//takes in pixelArray from GameScreen
const HitOrMiss = ( { pixelArray, arrayOfHits, arrayOfMissed, handleOppBoardClick } ) => {
	return ( 
        <>
            <div className='gameBoard'>
                {pixelArray.map((pixel) => {
                //render out the array containing hit coords for player (not opponent)
                for (let i = 0; i < arrayOfHits.length; i++) {
                    if (arrayOfHits[i] === pixel.number) {
                    return <div className='pixelHit'>{pixel.number}</div>;
                    }
                }

                //render out the array containing missed coords for player (not opponent)
                for (let i = 0; i < arrayOfMissed.length; i++) {
                    if (arrayOfMissed[i] === pixel.number) {
                    return <div className='pixelMiss'>{pixel.number}</div>;
                    }
                }
                //if it's not hit or miss render just a normal clickable pixel
                return (
                    //when clicking on this pixel handleOppBoardClick is running
                    <div className='pixel' onClick={() => handleOppBoardClick(pixel.number)}>
                    {pixel.number}
                    </div>
                );
                })}
            </div>
        </> 
	)
}

export default HitOrMiss