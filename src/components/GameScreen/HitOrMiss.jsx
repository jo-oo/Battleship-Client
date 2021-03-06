/*
 * Renders out different colours on pixels for each player.
 */

//takes in pixelArray, arrayOfHits et.c. from GameScreen
const HitOrMiss = ({ pixelArray, arrayOfHits, arrayOfMissed, handleOppBoardClick, opponent }) => {
  return (
    <>
      <div className='d-flex flex-column'>
        {pixelArray !== null && (
          <div className='gameBoard'>
            {pixelArray.map((pixel, index) => {
              //render out the array containing hit coords for player (not opponent)
              for (let i = 0; i < arrayOfHits.length; i++) {
                if (arrayOfHits[i] === pixel.number) {
                  return (
                    <div className='pixelHit' key={index}>
                      {pixel.number}
                    </div>
                  );
                }
              }

              //render out the array containing missed coords for player (not opponent)
              for (let i = 0; i < arrayOfMissed.length; i++) {
                if (arrayOfMissed[i] === pixel.number) {
                  return (
                    <div className='pixelMiss' key={index}>
                      {pixel.number}
                    </div>
                  );
                }
              }
              //if it's not hit or miss render just a normal clickable pixel
              return (
                //when clicking on this pixel handleOppBoardClick is running
                <div className='pixel' onClick={() => handleOppBoardClick(pixel.number)} key={index}>
                  {pixel.number}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default HitOrMiss;
