import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'




const GameScreen = ( {opponent, player }) => {

  //Function for random number
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  ;


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
            <h3> Player 2: {opponent}</h3>
            <h3> Player 1: {player}</h3>
          </div>
        </Col>

      </Row>
    </Container >

  )
}

export default GameScreen