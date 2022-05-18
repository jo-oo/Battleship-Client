import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'



const GameScreen = () => {

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
      direction: [1, 2, 3, 4]
    },
    {
      length: 2,
      startPos: null,
      coords: [],
      direction: [1, 2, 3, 4]
    },
    {
      length: 3,
      startPos: null,
      coords: [],
      direction: [1, 2, 3, 4]
    },
    {
      length: 4,
      startPos: null,
      coords: [],
      direction: [1, 2, 3, 4]
    }
  ]







  // Function to set coordinates for all ships
  const fillShipCoord = () => {



    ships.forEach((ship) => {
      const randomDirection = Math.floor(Math.random() * 3);
      // Randomize ship starting position
      ship.startPos = getRandomNumber(1, 11) * getRandomNumber(1, 11)

      if (randomDirection === 0) {
        console.log("This is random direction 0")
        // Loop through index values from start position of ship up until it's length, and push values to it's coords array
        for (let i = ship.startPos; i < ship.startPos + ship.length; i++) {
          ship.coords.push(i)
        }

      }
      if (randomDirection === 1) {
        console.log("This is random direction 1")
        for (let i = ship.startPos; ship.coords.length < ship.length; i -= 1) {
          ship.coords.push(i)
        }
      }
      if (randomDirection === 2) {
        console.log("This is random direction 2")
        for (let i = ship.startPos; ship.coords.length < ship.length; i -= 10) {
          ship.coords.push(i)
        }
      }
      if (randomDirection === 3) {
        console.log("This is random direction 3")
        for (let i = ship.startPos; ship.coords.length < ship.length; i += 10) {
          ship.coords.push(i)
        }
      }


    })

  }

  fillShipCoord()
  // Console log info about each ship to make sure it's correct
  ships.forEach((ship) => {
    console.log('ship of length', ship.length, 'has coords', ship.coords)
  })

  let shipOne = getRandomNumber(1, 11) * getRandomNumber(1, 11)
  let shipTwo = getRandomNumber(1, 11) * getRandomNumber(1, 11)
  let shipThree = getRandomNumber(1, 11) * getRandomNumber(1, 11)
  let shipFour = getRandomNumber(1, 11) * getRandomNumber(1, 11)

  const pixelArray = Array.from(Array(101).keys())
  delete pixelArray[0];

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
            {pixelArray.map(pixel =>
              <div className="pixel"></div>
            )}
          </div>
        </Col>

        <Col>
          <div id="scoreBoard">
            <h3> Player 2:</h3>
            <h3> Player 1: </h3>
          </div>
        </Col>

      </Row>
    </Container >

  )
}

export default GameScreen