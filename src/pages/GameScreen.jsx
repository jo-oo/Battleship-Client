import React, { useEffect, useState } from 'react'
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
    coords: [],
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

  ships.forEach( (ship) => {
    // Randomize ship starting position
    ship.startPos = getRandomNumber(1, 11) * getRandomNumber(1, 11)

    // Loop through index values from start position of ship up until it's length, and push values to it's coords array
    for (let i = ship.startPos; i < ship.startPos + ship.length; i++) {
      ship.coords.push(i)
    }
  } )
  
}

fillShipCoord()

const GameScreen = ({opponent, player, shouldStart, socket}) => {

  // State for player to know if it is their turn
  const [isYourTurn, setIsYourTurn] = useState(shouldStart)

  // Function that handles when opponent has clicked a sqaure
  const handleOppClick = (index) => {
    console.log('Your opponent clicked on square', index)
    setIsYourTurn( true )
  }

  // Function that handles when player clicks opponent board
  const handleOppBoardClick = (index) => {
    if (isYourTurn) {
      socket.emit('game:click', index)
      setIsYourTurn( false )
    }
  }

  

  let shipOne = getRandomNumber(1, 11) * getRandomNumber(1, 11)
  let shipTwo = getRandomNumber(1, 11) * getRandomNumber(1, 11)
  let shipThree = getRandomNumber(1, 11) * getRandomNumber(1, 11)
  let shipFour = getRandomNumber(1, 11) * getRandomNumber(1, 11)

  const pixelArray = Array.from(Array(101).keys())
  delete pixelArray[0];

  useEffect( () => {

    socket.on('game:click', handleOppClick)

  }, [socket] )

  useEffect( () => {

    // Console log info about each ship to make sure it's correct
    ships.forEach( (ship) => {
      console.log('ship of length', ship.length, 'has coords', ship.coords)
    } )

  }, [] )

  return (

    <Container>
      <div> {shipOne}, {shipTwo}, {shipThree}, {shipFour}</div>
      <Row>
        <Col>
          <div className="gameBoard">
            {pixelArray.map((pixel, i) => {
              return shipOne === i || shipTwo === i || shipThree === i || shipFour === i ?
                <div className="pixelOne">{i}</div>
                :
                <div className="pixel"> {i}</div>
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