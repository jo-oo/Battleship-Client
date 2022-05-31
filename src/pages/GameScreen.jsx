import React, { useEffect, useState, useCallback } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import Container from 'react-bootstrap/Container';
import HitOrMiss from '../components/GameScreen/HitOrMiss'
import ShipColours from '../components/GameScreen/ShipColours'
import ScoreBoard from '../components/GameScreen/ScoreBoard'
import GameOver from '../components/GameScreen/GameOver'


const arrayOppHits = [];
let gameOver = false;
let gameOverOpp = false;
let nrOfShipsLeftToPlace = 4

// Array of four ships to place
const ships = [
  {
    id: 0,
    length: 2,
    partsLeft: 2,
    startPos: null,
    coords: [],
    isPlaced: false,
  },
  {
    id: 1,
    length: 2,
    partsLeft: 2,
    startPos: null,
    coords: [],
    isPlaced: false,
  },
  {
    id: 2,
    length: 3,
    partsLeft: 3,
    startPos: null,
    coords: [],
    isPlaced: false,
  },
  {
    id: 3,
    length: 4,
    partsLeft: 4,
    startPos: null,
    coords: [],
    isPlaced: false,
  },
];

//Function for random number
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * 
 * Function that returns a randomized start position that's within a valid range depending on the direction of the ship
 * 
 */
const getShipStartPos = (shipDirection, shipLength) => {
  // A switch case block that performs a different calculation depending on the case value
  switch(shipDirection) {
    case 0:
      // Calculate a valid start position for ships going right
      //     Random horizontal placemant         + Random vertical placement
      return getRandomNumber(1, 12 - shipLength) + getRandomNumber(0, 10) * 10
    case 1:
      // Calculate a valid start position for ships going left
      return getRandomNumber(0 + shipLength, 11) + (getRandomNumber(0, 10) * 10)
    case 2:
      // Calculate a valid start position for ships going down
      return getRandomNumber(1, 11) + getRandomNumber(0, 10 - shipLength + 1) * 10
    case 3:
      // Calculate a valid start position for ships going up
      return getRandomNumber(1, 11) + getRandomNumber(0 + shipLength - 1, 10) * 10
    default:
      // Default return value if no other case matches
      return false
  }
}

/**
 * 
 * Function that returns how much every coordinate in a ship should increase/decrease depending on the direction of the ship
 * 
 */
const getShipPosIncrement = (randomDirection) => {
  // A switch case block that calculates a different increment value depending on the case value
  switch(randomDirection) {
    case 0:
      // For ships going right, increment should be +1 for every new coord in the ship
      return 1
    case 1:
      // For ships going left, increment should be -1 for every new coord in the ship
      return -1
    case 2:
      // For ships going down, increment should be +10 for every new coord in the ship
      return 10
    case 3:
      // For ships going up, increment should be -10 for every new coord in the ship
      return -10
    default:
      // Default return value if no other case matches
      return false
  }
}

//Function to check that coordinate does not already exist. takes the empty "UsedCoordinates"-array and checks the cordinate in it
//If coordinate exists then true
const checkCoordinates = (UsedCoordinates, coordinates) => {
  let isTaken = false;
  //console.log('TEST USED CORD IS' + UsedCoordinates, coordinates);

  coordinates.forEach((coordinate) => {
    if (UsedCoordinates.includes(coordinate)) {
      isTaken = true;
    }
  });
  return isTaken;
};



const resetPixelArray = () => {

  const result = [];

  //creating pixels between 1-100
  for (let i = 1; i < 101; i++) {
    result.push({
      number: i,
      hit: false,
      miss: false,
      //checking if the pixels.number is equal to ship coordinates
      hasShip: false,
      isShipPlacable: true,
    });
  }
  return result;

}



const GameScreen = ({ opponent, player, shouldStart, socket, onGameOver }) => {
  // State for player to know if it is their turn
  const [isYourTurn, setIsYourTurn] = useState(shouldStart);

  //state so the pixelArray is updated
  const [pixelArray, setPixelArray] =  useState(resetPixelArray());

  const [arrayOfMissed, setArrayOfMissed] = useState([]);
  const [arrayOfHits, setArrayOfHits] = useState([]);

  // States for how many ships the player/opponent still have
  const [playerShipsLeft, setPlayerShipsLeft] = useState(ships.length);
  const [oppShipsLeft, setOppShipsLeft] = useState(ships.length);

  const [totShipsLeft, setTotShipsLeft] = useState(4);

  const [selectedShip, setSelectedShip] = useState(ships[0])
  const [currentDirection, setCurrentDirection] = useState(0)
  const [isOpponentReady, setIsOpponentReady] = useState(false)

  // Function to set coordinates for all ships
  const fillShipCoord = () => {

    ships.forEach( (ship) => {
      ship.startPos = null
      ship.coords = []
    } )

    // Array with coordinates for all ships whos coordinates has been decided
    const UsedCoordinates = [];
    // Array with test coordinates that will be compared with UsedCoordinates array
    let takenCoordinates = []

    ships.forEach((ship) => {

      //Get random number to represent direction of the ship
      const randomDirection = Math.floor(Math.random() * 4);
      console.log("YOU HAVE RANDOM DIRECTION: ", randomDirection)
      // Get increment value for each coord within a ship
      const increment = getShipPosIncrement(randomDirection)
      console.log("YOU HAVE INCREMENT: ", increment)
      
      // A do-while loop that calculates possible coordinates for the ship until all coordinates are valid
      do {
        // Empty test coordinates at the start of each loop iteration
        takenCoordinates = []
        // Give ship a random start position
        ship.startPos = getShipStartPos(randomDirection, ship.length)
        // For every position in ship, push in the coordinates thats gonna be checked if valid
        for (let coordPos = 0; coordPos < ship.length; coordPos++) {
          takenCoordinates.push(ship.startPos + (coordPos * increment))
        }
        // If any of the coordinates is already occupied, redo the loop
      } while (checkCoordinates(UsedCoordinates, takenCoordinates));

      // For each position in ship, push in the (now valid) coordinates from takenCoordinates
      for (let coordPos = 0; coordPos < ship.length; coordPos++) {
        // Push in to current ship coords
        ship.coords.push(takenCoordinates[coordPos]);
        // Push into array of all occupied values
        UsedCoordinates.push(takenCoordinates[coordPos]);
      }
      ship.isPlaced = true
      nrOfShipsLeftToPlace = 0
    });

    socket.emit('game:player-ready')
  };

  const isShipStartPosValid = (startPosTest, direction, length) => {
    let isValid = true
    let testCoords = []
    switch(direction) {
      case 0:
        if (startPosTest%10 > (11 - length) || startPosTest%10 === 0) {
          isValid = false
        }
        break
      case 1:
        if (startPosTest%10 < (0 + length) && startPosTest%10 !== 0) {
          isValid = false
        }
        break
      case 2:
        if (startPosTest > 110 - (length * 10)) {
          isValid = false
        }
        break
      case 3:
        if (startPosTest < 1 + (length * 10 - 10)) {
          isValid = false
        }
        break
      default:
        // Default return value if no other case matches
        isValid = false
    }
    testCoords = []
        for (let coordPos = 0; coordPos < length; coordPos++) {
          testCoords.push(startPosTest + (coordPos * getShipPosIncrement(direction)))
        }
        ships.forEach( (ship) => {
          if (checkCoordinates(testCoords, ship.coords)) {
            isValid = false
          }
        } )
    return isValid
  }

  //create an object for pixel containing index/number hit, miss and if the pixel has ships
  const createPixelArray = useCallback( () => {
    const result = [];

    const shipCoords = [];

    //Adding ships.coords to the array of shipCords
    ships.forEach((ship) => shipCoords.push.apply(shipCoords, ship.coords));

    //creating pixels between 1-100
    for (let i = 1; i < 101; i++) {
      result.push({
        number: i,
        hit: false,
        miss: false,
        //checking if the pixels.number is equal to ship coordinates
        hasShip: shipCoords.includes(i),
        isShipPlacable: isShipStartPosValid(i, currentDirection, selectedShip.length),
      });
    }
    return result;
  }, [currentDirection, selectedShip] )

  // Function that handles when opponent has clicked a sqaure
  const handleOppClick = useCallback(
    (index) => {
      setPixelArray((pixelArray) => {
        //find the clicked pixel in array of pixels
        const clickedPixel = pixelArray.find((pixel) => pixel.number === index);
        //check if clickedPixel has ships
        if (clickedPixel.hasShip) {
          clickedPixel.hit = true;
        } else {
          clickedPixel.miss = true;
        }
        return pixelArray;
      });
      // Variable for if click was a hit

      let hasHit = false;
      let shipSunk = false;

      // Loop through coords of all ships
      ships.forEach((ship) => {
        ship.coords.forEach((coord) => {
          // console.log('IS IT HIT??', coord, index);

          // If coord is same as the square the opponent clicked on, set hasHit to true
          if (coord === index) {
            hasHit = true;

            console.log('its a hit');

            // Decrease parts left for the ship
            ship.partsLeft--;
            console.log('PARTS LEFT::', ship.partsLeft);

            // If all parts of ship is gone, update number of ships player still has
            if (ship.partsLeft === 0) {
              console.log('OUR SHIP SUNK!!!');
              shipSunk = true;
              setPlayerShipsLeft((prevState) => prevState - 1);

              //decrease total ships
              setTotShipsLeft((prevState) => prevState - 1);
              //if all ships are hit, set gameOver = true
              if (totShipsLeft - 1 === 0) {
                gameOver = true;
                onGameOver({won: false})
              }
            }

            //add the index to an array
            arrayOppHits.push(index);
            console.log('this is the array of opp hits', arrayOppHits, 'and length', arrayOppHits.length);
          }
        });
      });

      // Inform server if click was a hit
      socket.emit('game:click-result', hasHit, index, shipSunk, gameOver);
      setIsYourTurn(true);
    },
    [socket, totShipsLeft, onGameOver]
  );

  // Function that handles when player clicks opponent board
  const handleOppBoardClick = (index) => {
    if (isYourTurn && isOpponentReady) {
      socket.emit('game:click', index);
      setIsYourTurn(false);
    }
  };

  const placeShipCoords = (startPos) => {

    if (!selectedShip.isPlaced) {
      selectedShip.startPos = startPos
      for (let coordPos = 0; coordPos < selectedShip.length; coordPos++) {
        selectedShip.coords.push(startPos + (coordPos * getShipPosIncrement(currentDirection)))
      }
      selectedShip.isPlaced = true
      console.log(ships)
      setPixelArray(createPixelArray())
      if(--nrOfShipsLeftToPlace === 0) {
        console.log('ALL SHIPS PLACED, game should start')
        socket.emit('game:player-ready')
      }
    }
    
  }

  const updateCurrentDirection = () => {
    console.log("in function")
    if (currentDirection === 3) {
      setCurrentDirection(0)
    } else {
      setCurrentDirection( prevState => prevState + 1 )
    }
  }

  useEffect(() => {
    // Function that handles what happens when a click made by player was a hit (not opponent)
    const handleClickResult = (result, index, shipSunk, gameOver) => {

      if (result) {
        console.log('You hit on this square', index);
        setArrayOfHits((arrayOfHits) => {
          return [index, ...arrayOfHits];
        });

        if (shipSunk) {
          console.log('You sunk their ship!!!');
          setOppShipsLeft((prevState) => prevState - 1);
          // If a whole ship was sunk, decrease number of ships for opponent
        }

        if (gameOver) {
          gameOverOpp = true;
          onGameOver({won: true})
        }
      } else {
        console.log('You missed this square', index);
        setArrayOfMissed((arrayOfMissed) => {
          return [index, ...arrayOfMissed];
        });
      }
    };

    socket.on('game:click', handleOppClick);
    socket.on('game:click-result', handleClickResult);
    socket.on('game:player-ready', ()=>{setIsOpponentReady(true)})

    return () => {
      //needed to remove the socket otherwise it was running four times
      socket.removeListener('game:click');
      socket.removeListener('game:click-result');
      handleClickResult();
    };
  }, [socket, handleOppClick, onGameOver]);

  useEffect( () => {
    setPixelArray(createPixelArray())
  }, [currentDirection, selectedShip, createPixelArray] )

  useEffect(() => {
    // Cal the function that decides the coordinates for all ships
    //fillShipCoord();
    // Console log info about each ship to make sure it's correct
    ships.forEach((ship) => {
      console.log('ship of length', ship.length, 'has coords', ship.coords);
    });
    setPixelArray(resetPixelArray())
  }, []);

  return (
    <> 
      <Row>
        <Col>
          {nrOfShipsLeftToPlace !== 0 && (
            <div>
              <h2>Place your ships</h2>
              <div className='btn-group'>
                <button 
                  className={selectedShip.id === 0 ? 'btn btn-info active' : 'btn btn-info'}
                  onClick={() => {setSelectedShip(ships[0])}}
                  disabled={ships[0].isPlaced}
                  >2 ship
                </button>
                <button 
                  className={selectedShip.id === 1 ? 'btn btn-info active' : 'btn btn-info'}
                  onClick={() => {setSelectedShip(ships[1])}}
                  disabled={ships[1].isPlaced}
                  >2 ship
                </button>
                <button 
                  className={selectedShip.id === 2 ? 'btn btn-info active' : 'btn btn-info'}
                  onClick={() => {setSelectedShip(ships[2])}}
                  disabled={ships[2].isPlaced}
                  >3 ship
                </button>
                <button 
                  className={selectedShip.id === 3 ? 'btn btn-info active' : 'btn btn-info'}
                  onClick={() => {setSelectedShip(ships[3])}}
                  disabled={ships[3].isPlaced}
                  >4 ship
                </button>
              </div>
              <br />
              <button onClick={() => {updateCurrentDirection()}}>Switch direction</button>
              <p>Current direction: <img src={`arrow${currentDirection}.png`} alt='arrow showing ship direction'/></p>
              <button onClick={
                  () => {
                    fillShipCoord()
                    setPixelArray(createPixelArray())
                  }}
                >Randomise
              </button>
          </div>
          )}
          
          <ShipColours
            pixelArray={pixelArray}
            placeCoords={placeShipCoords}
          >
          </ShipColours>

          <HitOrMiss
            pixelArray={pixelArray}
            arrayOfHits = {arrayOfHits}
            arrayOfMissed = {arrayOfMissed}
            handleOppBoardClick = {handleOppBoardClick}
          >
          </HitOrMiss>

        </Col>
        <Col>

          <GameOver
            gameOver = {gameOver}
            gameOverOpp = {gameOverOpp}
           >
          </GameOver>

          <ScoreBoard
            opponent = {opponent}
            oppShipsLeft = {oppShipsLeft}
            player = {player}
            playerShipsLeft = {playerShipsLeft}
            isYourTurn = {isYourTurn}
           >
          </ScoreBoard>

        </Col>
      </Row>
    </>
  );
};

export default GameScreen;

// Stuff to fix
// Clean up ship data
// Buttons to pick each ship - x
// Button to rotate direction - x
// Click on board to place ship coords and startpos - x
// Function to check if placement is valid - x
// Ready up when all ships placed - x