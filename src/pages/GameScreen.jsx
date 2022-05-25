import React, { useEffect, useState, useCallback } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import Container from 'react-bootstrap/Container';
import ShipColours from '../components/ShipColours'
/* const arrayOfHits = [];
const arrayOfMissed = []; */
const arrayOppHits = [];

// Array of four ships to place
const ships = [
  {
    length: 2,
    partsLeft: 2,
    startPos: null,
    coords: [],
  },
  {
    length: 2,
    partsLeft: 2,
    startPos: null,
    coords: [],
  },
  {
    length: 3,
    partsLeft: 3,
    startPos: null,
    coords: [],
  },
  {
    length: 4,
    partsLeft: 4,
    startPos: null,
    coords: [],
  },
];


//Function for random number
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

//Function for random position x and a y position from 1 to 10
function getRandomPosition() {
  return getRandomNumber(1, 11) * getRandomNumber(1, 11); 
}

//Function to check that coordinate does not already exist. takes the empty "UsedCoordinates"-array and checks the cordinate in it
//If coordinate exists then true
const checkCoordinates = (UsedCoordinates, coordinates) => {

  let isTaken = false
  console.log('TEST USED CORD IS' + UsedCoordinates, coordinates);

  coordinates.forEach( (coordinate ) => {
    if (UsedCoordinates.includes(coordinate)){
    isTaken = true
    }
  })
  return isTaken;
};

// Function to set coordinates for all ships
const fillShipCoord = () => {

  //empty arrays to be filled with coordinates as they are created
  const UsedCoordinates = [];
  let takenCoordinates = []
  
  ships.forEach((ship) => {
    //Get random direction
    const randomDirection = Math.floor(Math.random() * 3);

    //random direction to the right
    if (randomDirection === 0) {
      console.log('This is random direction 0');

      //arrays of shipcoordinates that can not be startPos for this direction
      const arrayNotIncludeTwoPixels = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
      const arrayNotIncludeThreePixels = [9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 70, 79, 80, 89, 90, 99, 100,];
      const arrayNotIncludeFourPixels = [8, 9, 10, 18, 19, 20, 28, 29, 30, 38, 39, 40, 48, 49, 50, 58, 59, 60, 68, 69, 70, 78, 79, 80, 88, 89, 90, 98, 99, 100];

      //Randomize ships starting position
      if (ship.length === 2) {
        do {
          takenCoordinates = []
          ship.startPos = getRandomPosition();
          takenCoordinates = [ship.startPos, ship.startPos + 1] //fills array with index for start position + start position + antal pixlar (längd)
        } while (checkCoordinates(UsedCoordinates, takenCoordinates) || arrayNotIncludeTwoPixels.includes(ship.startPos));
      } //uses function "checkCoordinates" to see if there is any coordinates in the array "Usedcoordinates" on the start position OR if the ship with 2 pixels does not start at the set coordinates of that array

      if (ship.length === 3) {
        do {
          takenCoordinates = []
          ship.startPos = getRandomPosition();
          takenCoordinates = [ship.startPos, ship.startPos + 2] //start position + sytart positioon + antal
        } while (
          checkCoordinates(UsedCoordinates, takenCoordinates) || arrayNotIncludeThreePixels.includes(ship.startPos)
        );
      }

      if (ship.length === 4) {
        do {
          takenCoordinates = []
          ship.startPos = getRandomPosition();
          takenCoordinates = [ship.startPos, ship.startPos + 3] //start position + sytart positioon + antal
        } while (checkCoordinates(UsedCoordinates, takenCoordinates) || arrayNotIncludeFourPixels.includes(ship.startPos));
      }

      for (let i = ship.startPos; ship.coords.length < ship.length; i++) {
        ship.coords.push(i);
        UsedCoordinates.push(i);
      }
    }

    console.log('Used coordinates is now' + UsedCoordinates);

    //this is random position left
    if (randomDirection === 1) {
      console.log('This is random direction 1');

      //arrays of shipcoordinates that can not be startPos for this direction
      const arrayNotIncludeTwoPixels = [1, 11, 21, 31, 41, 51, 61, 71, 81, 91];
      const arrayNotIncludeThreePixels = [1, 2, 11, 12, 21, 22, 31, 32, 41, 42, 51, 52, 61, 62, 71, 72, 81, 82, 91, 92];
      const arrayNotIncludeFourPixels = [1, 2, 3, 11, 12, 13, 21, 22, 23, 31, 32, 33, 41, 42, 43, 51, 52, 53, 61, 62, 63, 71, 72, 72, 81, 82, 83, 91, 92, 93,];

      if (ship.length === 2) {
        do {
          takenCoordinates = []
          // Randomize ship starting position
          ship.startPos = getRandomPosition();
          takenCoordinates = [ship.startPos, ship.startPos - 1] //start position + sytart positioon + antal
        } while (checkCoordinates(UsedCoordinates, takenCoordinates) || UsedCoordinates.includes(ship.coords) ||arrayNotIncludeTwoPixels.includes(ship.startPos));
      }
      console.log('Used coordinates is now' + UsedCoordinates);

      if (ship.length === 3) {
        do {
          takenCoordinates=[]
          // Randomize ship starting position
          ship.startPos = getRandomPosition();
          takenCoordinates = [ship.startPos, ship.startPos - 2] //start position + sytart positioon + antal
        } while (
          checkCoordinates(UsedCoordinates, takenCoordinates)  ||arrayNotIncludeThreePixels.includes(ship.startPos)
        );
      }

      if (ship.length === 4) {
        do {
          takenCoordinates = []
          // Randomize ship starting position
          ship.startPos = getRandomPosition();
          takenCoordinates = [ship.startPos, ship.startPos - 3] //start position + sytart positioon + antal
        } while (checkCoordinates(UsedCoordinates, takenCoordinates) ||  arrayNotIncludeFourPixels.includes(ship.startPos));
      }

      for (let i = ship.startPos; ship.coords.length < ship.length; i -= 1) {
        ship.coords.push(i);
        UsedCoordinates.push(i);
      }
    }
    console.log('Used coordinates is now' + UsedCoordinates);

    //this is random position up
    if (randomDirection === 2) {
      console.log('This is random direction 2');

      const arrayNotIncludeTwoPixels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const arrayNotIncludeThreePixels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      const arrayNotIncludeFourPixels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]

      if (ship.length === 2) {
        do {
          takenCoordinates= []
          // Randomize ship starting position
          ship.startPos = getRandomPosition();
          takenCoordinates = [ship.startPos, ship.startPos - 10] //start position + sytart positioon + antal
        } while (checkCoordinates(UsedCoordinates, takenCoordinates)  ||arrayNotIncludeTwoPixels.includes(ship.startPos));
      }

      if (ship.length === 3) {
        do {
          takenCoordinates=[]
          // Randomize ship starting position
          ship.startPos = getRandomPosition();
          takenCoordinates = [ship.startPos, ship.startPos - 20] //start position + sytart positioon + antal
        } while (
          checkCoordinates(UsedCoordinates, takenCoordinates)  ||arrayNotIncludeThreePixels.includes(ship.startPos)
        );
      }

      if (ship.length === 4) {
        do {
          takenCoordinates=[]
          // Randomize ship starting position
          ship.startPos = getRandomPosition();
          takenCoordinates = [ship.startPos, ship.startPos - 30] //start position + sytart positioon + antal
        } while (checkCoordinates(UsedCoordinates, takenCoordinates)  ||arrayNotIncludeFourPixels.includes(ship.startPos));
      }

      for (let i = ship.startPos; ship.coords.length < ship.length; i -= 10) {
        ship.coords.push(i);
        UsedCoordinates.push(i);
      }
    }

    console.log('Used coordinates is now' + UsedCoordinates);

    //this is random position down
    if (randomDirection === 3) {
      console.log('This is random direction 3');

      const arrayNotIncludeTwoPixels = [91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
      const arrayNotIncludeThreePixels = [81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100,];
      const arrayNotIncludeFourPixels = [71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]
 
      if (ship.length === 2) {
        do {
          takenCoordinates=[]
          // Randomize ship starting position
          ship.startPos = getRandomPosition();
          takenCoordinates = [ship.startPos, ship.startPos + 10] //start position + sytart positioon + antal
        } while (checkCoordinates(UsedCoordinates, takenCoordinates)   ||arrayNotIncludeTwoPixels.includes(ship.startPos));
      }

      if (ship.length === 3) {
        do {
          takenCoordinates=[]
          // Randomize ship starting position
          ship.startPos = getRandomPosition();
          takenCoordinates = [ship.startPos, ship.startPos + 20] //start position + sytart positioon + antal
        } while (
          checkCoordinates(UsedCoordinates, takenCoordinates)  ||arrayNotIncludeThreePixels.includes(ship.startPos)
        );
      }

      if (ship.length === 4) {
        do {
          takenCoordinates= []
          // Randomize ship starting position
          ship.startPos = getRandomPosition();
          takenCoordinates = [ship.startPos, ship.startPos + 30] //start position + sytart positioon + antal
        } while (checkCoordinates(UsedCoordinates, takenCoordinates)   ||arrayNotIncludeFourPixels.includes(ship.startPos));
      }

      for (let i = ship.startPos; ship.coords.length < ship.length; i += 10) {
        ship.coords.push(i);
        if (ship.coords.includes(i)) {
          UsedCoordinates.push(i);
        }
      }
      console.log('Used coordinates is now ' + UsedCoordinates);
    }
  });
};

fillShipCoord();


// Console log info about each ship to make sure it's correct
ships.forEach((ship) => {
  console.log('ship of length', ship.length, 'has coords', ship.coords);
});

//create an object for pixel containing index/number hit, miss and if the pixel has ships
const createPixelArray = () => {
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
    });
  }
  return result;
};



const GameScreen = ({ opponent, player, shouldStart, socket }) => {
  // State for player to know if it is their turn
  const [isYourTurn, setIsYourTurn] = useState(shouldStart);

  //state so the pixelArray is updated
  const [pixelArray, setPixelArray] =  useState(createPixelArray());

  const [arrayOfMissed, setArrayOfMissed] = useState([]);
  const [arrayOfHits, setArrayOfHits] = useState([]);

  // States for how many ships the player/opponent still have
  const [playerShipsLeft, setPlayerShipsLeft] = useState(ships.length)
  const [oppShipsLeft, setOppShipsLeft] = useState(ships.length)

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

      console.log('Your opponent clicked on square', index);
      let hasHit = false;
      let shipSunk = false
      // Loop through coords of all ships
      ships.forEach((ship) => {
        ship.coords.forEach((coord) => {
          // console.log('IS IT HIT??', coord, index);

          // If coord is same as the square the opponent clicked on, set hasHit to true
          if (coord === index) {
            hasHit = true;
            console.log('its a hit');

            // Decrease parts left for the ship
            ship.partsLeft--
            console.log("PARTS LEFT::", ship.partsLeft)

            // If all parts of ship is gone, update number of ships player still has
            if (ship.partsLeft === 0) {
              console.log('OUR SHIP SUNK!!!')
              shipSunk = true
              setPlayerShipsLeft( (prevState) => prevState - 1 )
            } 

            //add the index to an array

            arrayOppHits.push(index);

            console.log('this is the array of opp hits', arrayOppHits, 'and length', arrayOppHits.length);
          }
        });
      });

      // Inform server if click was a hit
      socket.emit('game:click-result', hasHit, index, shipSunk);
      setIsYourTurn(true);
    },
    [socket]
  );

  // Function that handles when player clicks opponent board
  const handleOppBoardClick = (index) => {
    if (isYourTurn) {
      socket.emit('game:click', index);
      setIsYourTurn(false);
    }
  };

  useEffect(() => {
    // Function that handles what happens when a click made by player was a hit (not opponent)
    const handleClickResult = (result, index, shipSunk) => {

      if (result) {
        console.log('You hit on this square', index);
        setArrayOfHits((arrayOfHits) => {
          return [index, ...arrayOfHits];
        });

        // If a whole ship was sunk, decrease number of ships for opponent
        if (shipSunk) {
          console.log("You sunk their ship!!!")
          setOppShipsLeft( (prevState) => prevState - 1 )
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

    return () => {
      //needed to remove the socket otherwise it was running four times
      socket.removeListener('game:click');
      socket.removeListener('game:click-result');
      handleClickResult();
    };
  }, [socket, handleOppClick]);

  useEffect(() => {
    // Console log info about each ship to make sure it's correct
    ships.forEach((ship) => {
      console.log('ship of length', ship.length, 'has coords', ship.coords);
    });
  }, []);

  return (
    <> 
      <Row>
        <Col>

          <ShipColours
            pixelArray={pixelArray}
          >
          </ShipColours>
 
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
        </Col>

        <Col>
          <div id='scoreBoard'>
            <div id='opponent-board'>
              <h3>Player 2: {opponent}</h3>
              <h4>Ships remaning: {oppShipsLeft}</h4>
            </div>

            <div id='currentPlayer-board'>
              <h3>Player 1: {player}</h3>
              <h4>Ships remaining: {playerShipsLeft}</h4>
            </div>

            <div id='turnToggle'>
              {isYourTurn && <h3> It's your turn </h3>}
              {!isYourTurn && <h3> Opponents turn </h3>}
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default GameScreen;
