//takes loading and Spinner into component (from LandingScreen page)
const LoadingSpinner = ( { loading, Spinner } ) => {
	return ( 
        <>
            <div className="d-flex justify-content-between align-items-center mt-4">
                
				{loading &&
                    (
                        <div className="mt-4">
				            <Spinner animation="border" role="status" variant="dark"></Spinner>
                        </div>
                    )
                }
            </div>
        </> 
	)
}

export default LoadingSpinner

