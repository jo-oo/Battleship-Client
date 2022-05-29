/*
* Renders out and shows result screen when game is over
*/

//takes in resultData and handleSubmit from GameScreen
const GameOver = ( { result, submit} ) => {
	return ( 
        <>
            <section className='result-screen'>
                <div className='result-screen-wrapper'>
                    {
                        result.won && (
                            <>
                                <div>Congratulations, you won!</div>
                            </>
                        )
                    }
                    {
                        !result.won && (
                            <>
                                <div>You lost the game :&#40;</div>
                            </>
                        )
                    }
                    <button className="btn btn-primary" onClick={submit}>Play again</button>
                </div>
            </section>  
        </> 
	)
}

export default GameOver