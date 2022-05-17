import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'



const GameScreen = () => {

  const pixelArray = Array.from(Array(100).keys())

  return (

    <Container>
      <Row>
        <Col>
          <div className="gameBoard">
            {pixelArray.map((pixel, i) =>
              <div key={i} className="pixel"> {i} </div>
            )}
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
    </Container>

  )
}

export default GameScreen