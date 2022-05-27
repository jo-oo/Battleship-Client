/*
* Renders out and shows result screen when game is over
*/

//takes in resultData and handleSubmit from GameScreen
const GameOver = ( { resultData, handleSubmit} ) => {
	return ( 
        <>
            <section className='result-screen'>
                <div className='result-screen-wrapper'>
                    {
                        resultData.won && (
                            <>
                                <div>Congratulations, you won!</div>
                            </>
                        )
                    }
                    {
                        !resultData.won && (
                            <>
                                <div>You lost the game :&#40;</div>
                            </>
                        )
                    }
                    <button className="btn btn-primary" onClick={handleSubmit}>Play again</button>
                </div>
            </section>  
        </> 
	)
}

export default GameOver