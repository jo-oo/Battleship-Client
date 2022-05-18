//takes loading and Spinner into component
const LoadingSpinner = ( { loading, Spinner } ) => {
	return ( 
        <>
            <div className="d-flex justify-content-between align-items-center mt-4">
                
                {/* loading spinner */}
				{loading &&
                    (
                        <div className="mt-4">
				            <Spinner animation="border" role="status" variant="light"></Spinner>
                        </div>
                    )
                }
            </div>
        </> 
	)
}

export default LoadingSpinner

