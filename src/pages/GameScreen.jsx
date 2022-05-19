import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'



const GameScreen = () => {

  //Function for random number
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  // Array of four ships to place
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


  //Function to check that coordinate does not already exist. takes the empty "UsedCoordinates"-array and checks the cordinate in it
  //If coordinate exists then true, else false
  const checkCoordinates = (UsedCoordinates, coordinate) => {
    console.log("TEST USED CORD IS" + UsedCoordinates, coordinate);
    if (UsedCoordinates.includes(coordinate)) {
        console.log("THIS IS");
      return true;
    }
    return false;
  }
  


  // Function to set coordinates for all ships
  const fillShipCoord = () => {

  //empty array to be filled with coordinates as they are created
  let UsedCoordinates = []
         

    ships.forEach((ship) => {
      const randomDirection = Math.floor(Math.random() * 3);

      if (randomDirection === 0) {
        console.log("This is random direction 0")

        // Randomize ship starting position
        do {
          ship.startPos = getRandomNumber(1, 11) * getRandomNumber(1, 11) //gets a x and a y position from 1 to 10
        } while (checkCoordinates(UsedCoordinates, ship.startPos) || ship.startPos === 10 || ship.startPos === 20 || ship.startPos === 30 || ship.startPos === 40 || ship.startPos === 50 || ship.startPos === 60 || ship.startPos === 70 || ship.startPos === 80 || ship.startPos === 90 || ship.startPos === 100)
        //uses function "checkCoordinates" to see if there is any coordinates in the array "Usedcoordinates" on the start position
       
        for (let i = ship.startPos; ship.coords.length < ship.length; i++) {
        ship.coords.push(i)
        UsedCoordinates.push(i)
         //calls funcktion "checkCoordinates" , with inpramaters usedCoordinates and index
         //checkCoordinates(UsedCoordinates, i)
         
        }
      }
      console.log("Used coordinates is now" + UsedCoordinates)

      if (randomDirection === 1) {
        console.log("This is random direction 1")
        // Randomize ship starting position
        do {
          ship.startPos = getRandomNumber(1, 11) * getRandomNumber(1, 11)
        } while (checkCoordinates(UsedCoordinates, ship.startPos) || ship.startPos === 1 || ship.startPos === 11 || ship.startPos === 21 || ship.startPos === 31 || ship.startPos === 41 || ship.startPos === 51 || ship.startPos === 61 || ship.startPos === 71 || ship.startPos === 81 || ship.startPos === 91)


        for (let i = ship.startPos; ship.coords.length < ship.length; i -= 1) {

          ship.coords.push(i)
          UsedCoordinates.push(i)
        }
      }
      console.log("Used coordinates is now second time" + UsedCoordinates)

      if (randomDirection === 2) {
        console.log("This is random direction 2")
        // Randomize ship starting position
        do {
          ship.startPos = getRandomNumber(1, 11) * getRandomNumber(1, 11)
        } while (checkCoordinates(UsedCoordinates, ship.startPos) || ship.startPos === 1 || ship.startPos === 2 || ship.startPos === 3 || ship.startPos === 4 || ship.startPos === 5 || ship.startPos === 6 || ship.startPos === 7 || ship.startPos === 8 || ship.startPos === 9 || ship.startPos === 10)


        for (let i = ship.startPos; ship.coords.length < ship.length; i -= 10) {

          ship.coords.push(i)
          UsedCoordinates.push(i)
        }
      }
      console.log("Used coordinates is now third time" + UsedCoordinates)

      if (randomDirection === 3) {
        console.log("This is random direction 3")
        // Randomize ship startin position
        do {
          ship.startPos = getRandomNumber(1, 11) * getRandomNumber(1, 11)
        } while (checkCoordinates(UsedCoordinates, ship.startPos) || ship.startPos === 91 || ship.startPos === 92 || ship.startPos === 93 || ship.startPos === 94 || ship.startPos === 95 || ship.startPos === 96 || ship.startPos === 97 || ship.startPos === 98 || ship.startPos === 99 || ship.startPos === 100)
        

        for (let i = ship.startPos; ship.coords.length < ship.length; i += 10) {
          ship.coords.push(i)
          UsedCoordinates.push(i)

        }
      }
      console.log("Used coordinates is now fourth time" + UsedCoordinates)

      let checkCordinatesResult1 = checkCoordinates([1,24,15], 15);
      let checkCordinatesResult2 = checkCoordinates([1,24], 15);
      let checkCordinatesResult3 = checkCoordinates([], 15);

      console.log("TEST ska vara true: ", checkCordinatesResult1);
      console.log("TEST ska vara false: ", checkCordinatesResult2);
      console.log("TEST: ", checkCordinatesResult3);
    })

  }

  fillShipCoord()
  // Console log info about each ship to make sure it's correct
  ships.forEach((ship) => {
    console.log('ship of length', ship.length, 'has coords', ship.coords)
  })


  const pixelArray = Array.from(Array(101).keys())
  delete pixelArray[0];

  return (

    <Container>
      <Row>
        <Col>
          <div className="gameBoard">
            {pixelArray.map((pixel, i) => {
              return ships[0].coords[0] === i || ships[0].coords[1] === i || ships[1].coords[0] === i || ships[1].coords[1] === i || ships[2].coords[0] === i || ships[2].coords[1] === i || ships[2].coords[2] === i || ships[3].coords[0] === i || ships[3].coords[1] === i || ships[3].coords[2] === i || ships[3].coords[3] === i ?
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