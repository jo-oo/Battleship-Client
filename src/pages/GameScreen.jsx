import React, { useEffect, useState, useCallback } from 'react';
import AnimatedCursor from "react-animated-cursor"
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

const GameScreen = ({ opponent, player, shouldStart, socket, onGameOver }) => {
  // State for player to know if it is their turn
  const [isYourTurn, setIsYourTurn] = useState(shouldStart);

  //state so the pixelArray is updated
  const [pixelArray, setPixelArray] =  useState(null);

  const [arrayOfMissed, setArrayOfMissed] = useState([]);
  const [arrayOfHits, setArrayOfHits] = useState([]);

  // States for how many ships the player/opponent still have
  const [playerShipsLeft, setPlayerShipsLeft] = useState(ships.length);
  const [oppShipsLeft, setOppShipsLeft] = useState(ships.length);

  const [totShipsLeft, setTotShipsLeft] = useState(4);

  // States for which ship to place and in what direction 
  const [selectedShip, setSelectedShip] = useState(ships[0])
  const [currentDirection, setCurrentDirection] = useState(0)
  // State to know if both players have placed their ships
  const [isOpponentReady, setIsOpponentReady] = useState(false)

  // Function to set coordinates for all ships
  const fillShipCoord = () => {

    // Clean up info about each ship
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
      // Mark ship as placed
      ship.isPlaced = true
      
    });
    // Decrease variable for unplaced ships to zero
    nrOfShipsLeftToPlace = 0

    // Inform server that player is done placing their ships
    socket.emit('game:player-ready')
  };

  // Function to determine if ship can be placed on given start position
  const isShipStartPosValid = (startPosTest, direction, length) => {

    let isValid = true
    let testCoords = []

    // Switch case that sets isValid variable to false if ship would go to far on the edge of the board
    switch(direction) {
      // Case for direction right
      case 0:
        // If single digit in startPosTest is to big OR zero
        if (startPosTest%10 > (11 - length) || startPosTest%10 === 0) {
          isValid = false
        }
        break
      // Case for direction left
      case 1:
        // If single digit in startPosTest is to small AND not zero
        if (startPosTest%10 < (0 + length) && startPosTest%10 !== 0) {
          isValid = false
        }
        break
      // Case for direction down
      case 2:
        // If startPosTest is to large
        if (startPosTest > 110 - (length * 10)) {
          isValid = false
        }
        break
      // Case for direction up
      case 3:
        // If starPosTest is to small
        if (startPosTest < 1 + (length * 10 - 10)) {
          isValid = false
        }
        break
      default:
        // Default return value if no other case matches
        isValid = false
    }

    // Put coordinates to test in a temporary array
    for (let coordPos = 0; coordPos < length; coordPos++) {
      testCoords.push(startPosTest + (coordPos * getShipPosIncrement(direction)))
    }

    // Check if any of test coordinates is already taken by another ship
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
        // Check if a ship can start on this square, considering chosen direction and length of chosen ship
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

  // Function to place a single ship
  const placeShipCoords = (startPos) => {

    // Continue only if ship has not already been placed
    if (!selectedShip.isPlaced) {

      // Set coordinates for ship
      selectedShip.startPos = startPos
      for (let coordPos = 0; coordPos < selectedShip.length; coordPos++) {
        selectedShip.coords.push(startPos + (coordPos * getShipPosIncrement(currentDirection)))
      }

      selectedShip.isPlaced = true
      console.log(ships)
      // Update pixelarray
      setPixelArray(createPixelArray())

      // If all ships has been placed, inform server
      if(--nrOfShipsLeftToPlace === 0) {
        socket.emit('game:player-ready')
      }
    }
    
  }

  // Function to change selected direction
  const updateCurrentDirection = () => {
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
    socket.on('game:player-ready', () => { setIsOpponentReady(true) })

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

  return (
    <> 
      <Row>
        <Col>
          {nrOfShipsLeftToPlace !== 0 && (
            <div className='placement-container'>
              <h2>Place your ships</h2>
              <div className='btn-ship-selection'>
                <button 
                  className={selectedShip.id === 0 ? 'btn btn-info active' : 'btn btn-info'}
                  onClick={() => {setSelectedShip(ships[0])}}
                  disabled={ships[0].isPlaced}
                  >2x ship
                </button>
                <button 
                  className={selectedShip.id === 1 ? 'btn btn-info active' : 'btn btn-info'}
                  onClick={() => {setSelectedShip(ships[1])}}
                  disabled={ships[1].isPlaced}
                  >2x ship
                </button>
                <button 
                  className={selectedShip.id === 2 ? 'btn btn-info active' : 'btn btn-info'}
                  onClick={() => {setSelectedShip(ships[2])}}
                  disabled={ships[2].isPlaced}
                  >3x ship
                </button>
                <button 
                  className={selectedShip.id === 3 ? 'btn btn-info active' : 'btn btn-info'}
                  onClick={() => {setSelectedShip(ships[3])}}
                  disabled={ships[3].isPlaced}
                  >4x ship
                </button>
              </div>
              <div className='btn-direction-selection'>
                <button 
                  className='btn btn-info'
                  onClick={() => {updateCurrentDirection()}}
                  >Change direction
                </button>
                <img src={`arrow${currentDirection}.png`} alt='arrow showing ship direction'/>
              </div>
              
              <button 
                className='btn btn-info btn-randomise'
                onClick={
                  () => {
                    fillShipCoord()
                    setPixelArray(createPixelArray())
                  }}
                >Randomise positions
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

          <AnimatedCursor
          />
          
        </Col>
      </Row>
    </>
  );
};

export default GameScreen;