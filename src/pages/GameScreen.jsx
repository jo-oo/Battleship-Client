import React, { useEffect, useState, useCallback } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

//Function for random number
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Array of ships to place
const ships = [
  {
    length: 2,
    startPos: null,
    coords: [],
  },
  {
    length: 2,
    startPos: null,
    coords: []
  },
  {
    length: 3,
    startPos: null,
    coords: [],
  },
  {
    length: 4,
    startPos: null,
    coords: [],
  }
]

// Function to set coordinates for all ships
const fillShipCoord = () => {



  ships.forEach((ship) => {



    //Get random direction
    const randomDirection = Math.floor(Math.random() * 3);

    //random direction to the right
    if (randomDirection === 0) {

      console.log("This is random direction 0")

      //arrays of shipcoordinates that can not be startPos for this direction
      const arrayNotIncludeTwoPixels = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
      const arrayNotIncludeThreePixels = [9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 70, 79, 80, 89, 90, 99, 100]
      const arrayNotIncludeFourPixels = [8, 9, 10, 18, 19, 20, 28, 29, 30, 38, 39, 40, 48, 49, 50, 58, 59, 60, 68, 69, 70, 78, 79, 80, 88, 89, 90, 98, 99, 100]


      if (ship.length === 2) {
        do {
          ship.startPos = getRandomNumber(1, 11) * getRandomNumber(1, 11)
        } while (arrayNotIncludeTwoPixels.includes(ship.startPos))
      }

      if (ship.length === 3) {
        do {
          ship.startPos = getRandomNumber(1, 11) * getRandomNumber(1, 11)
        } while (arrayNotIncludeThreePixels.includes(ship.startPos))
      }

      if (ship.length === 4) {
        do {
          ship.startPos = getRandomNumber(1, 11) * getRandomNumber(1, 11)
        } while (arrayNotIncludeFourPixels.includes(ship.startPos))
      }

      for (let i = ship.startPos; ship.coords.length < ship.length; i++) {
        ship.coords.push(i)
      }

    }


    //this is random position left
    if (randomDirection === 1) {
      console.log("This is random direction 1")

      //arrays of shipcoordinates that can not be startPos for this direction
      const arrayNotIncludeTwoPixels = [1, 11, 21, 31, 41, 51, 61, 71, 81, 91]
      const arrayNotIncludeThreePixels = [1, 2, 11, 12, 21, 22, 31, 32, 41, 42, 51, 52, 61, 62, 71, 72, 81, 82, 91, 92]
      const arrayNotIncludeFourPixels = [1, 2, 3, 11, 12, 13, 21, 22, 23, 31, 32, 33, 41, 42, 43, 51, 52, 53, 61, 62, 63, 71, 72, 72, 81, 82, 83, 91, 92, 93]


      if (ship.length === 2) {
        do {
          // Randomize ship starting position
          ship.startPos = getRandomNumber(1, 11) * getRandomNumber(1, 11)
        } while (arrayNotIncludeTwoPixels.includes(ship.startPos))
      }

      if (ship.length === 3) {
        do {
          // Randomize ship starting position
          ship.startPos = getRandomNumber(1, 11) * getRandomNumber(1, 11)
        } while (arrayNotIncludeThreePixels.includes(ship.startPos))
      }

      if (ship.length === 4) {
        do {
          // Randomize ship starting position
          ship.startPos = getRandomNumber(1, 11) * getRandomNumber(1, 11)
        } while (arrayNotIncludeFourPixels.includes(ship.startPos))
      }

      for (let i = ship.startPos; ship.coords.length < ship.length; i -= 1) {
        ship.coords.push(i)
      }
    }

    //this is random position up
    if (randomDirection === 2) {
      console.log("This is random direction 2")

      const arrayNotIncludeTwoPixels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      const arrayNotIncludeThreePixels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      const arrayNotIncludeFourPixels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]


      if (ship.length === 2) {
        do {
          // Randomize ship starting position
          ship.startPos = getRandomNumber(1, 11) * getRandomNumber(1, 11)
        } while (arrayNotIncludeTwoPixels.includes(ship.startPos))
      }

      if (ship.length === 3) {
        do {
          // Randomize ship starting position
          ship.startPos = getRandomNumber(1, 11) * getRandomNumber(1, 11)
        } while (arrayNotIncludeThreePixels.includes(ship.startPos))
      }

      if (ship.length === 4) {
        do {
          // Randomize ship starting position
          ship.startPos = getRandomNumber(1, 11) * getRandomNumber(1, 11)
        } while (arrayNotIncludeFourPixels.includes(ship.startPos))
      }

      for (let i = ship.startPos; ship.coords.length < ship.length; i -= 10) {
        ship.coords.push(i)

      }

    }



    //this is random position down 
    if (randomDirection === 3) {
      console.log("This is random direction 3")


      const arrayNotIncludeTwoPixels = [91, 92, 93, 94, 95, 96, 97, 98, 99, 100]
      const arrayNotIncludeThreePixels = [81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]
      const arrayNotIncludeFourPixels = [71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]


      if (ship.length === 2) {
        do {
          // Randomize ship starting position
          ship.startPos = getRandomNumber(1, 11) * getRandomNumber(1, 11)
        } while (arrayNotIncludeTwoPixels.includes(ship.startPos))
      }

      if (ship.length === 3) {
        do {
          // Randomize ship starting position
          ship.startPos = getRandomNumber(1, 11) * getRandomNumber(1, 11)
        } while (arrayNotIncludeThreePixels.includes(ship.startPos))
      }

      if (ship.length === 4) {
        do {
          // Randomize ship starting position
          ship.startPos = getRandomNumber(1, 11) * getRandomNumber(1, 11)
        } while (arrayNotIncludeFourPixels.includes(ship.startPos))
      }

      for (let i = ship.startPos; ship.coords.length < ship.length; i += 10) {
        ship.coords.push(i)

      }




    }

  })

}

fillShipCoord()

const GameScreen = ({opponent, player, shouldStart, socket}) => {

  // State for player to know if it is their turn
  const [isYourTurn, setIsYourTurn] = useState(shouldStart)

  // Function that handles when opponent has clicked a sqaure
  const handleOppClick = useCallback( (index) => {

    // Variable for if click was a hit
    let hasHit = false
    console.log('Your opponent clicked on square', index)
    // Loop through coords of all ships
    ships.forEach( (ship) => {

      ship.coords.forEach( (coord) => {

        // If coord is same as the square the opponent clicked on, set hasHit to true
        if (coord === index) {
          hasHit = true
        }

      } )

    } )
    
    // Inform server if click was a hit
    socket.emit('game:click-result', hasHit)
    setIsYourTurn( true )

  }, [socket])

  // Function that handles when player clicks opponent board
  const handleOppBoardClick = (index) => {

    if (isYourTurn) {
      socket.emit('game:click', index)
      setIsYourTurn( false )
    }

  }

  // Function that handles what happens when a click made by player was a hit
  const handleClickResult = (result) => {

    if (result) {
      console.log('You hit')
    } else {
      console.log('You missed')
    }

  }

  const pixelArray = Array.from(Array(101).keys())
  delete pixelArray[0];

  useEffect( () => {

    socket.on('game:click', handleOppClick)
    socket.on('game:click-result', handleClickResult)

  }, [socket, handleOppClick] )

  useEffect( () => {

    // Console log info about each ship to make sure it's correct
    ships.forEach( (ship) => {
      console.log('ship of length', ship.length, 'has coords', ship.coords)
    } )

  }, [] )

  return (

    <Container>
      <Row>
        <Col>
          <div className="gameBoard">
            {pixelArray.map((pixel, i) => {
              return ships[0].coords[0] === i || ships[0].coords[1] === i || ships[1].coords[0] === i || ships[1].coords[1] === i || ships[2].coords[0] === i || ships[2].coords[1] === i || ships[2].coords[2] === i || ships[3].coords[0] === i || ships[3].coords[1] === i || ships[3].coords[2] === i || ships[3].coords[3] === i ?
                <div className="pixelOne">{i}</div>
                :
                <div className="pixel">{i}</div>
            })}

          </div>

          <div className="gameBoard">
            {pixelArray.map((pixel, i) =>
              <div key={i} className="pixel" onClick={() =>{handleOppBoardClick(i)}}></div>
            )}
          </div>
        </Col>

        <Col>
          <div id="scoreBoard">
            <h3> Player 2: {opponent}</h3>
            <h3> Player 1: {player}</h3>
            {
              isYourTurn && (<h3> It's your turn </h3>)
            }
            {
              !isYourTurn && (<h3> Opponents turn </h3>)
            }
          </div>
        </Col>

      </Row>
    </Container >

  )
}

export default GameScreen