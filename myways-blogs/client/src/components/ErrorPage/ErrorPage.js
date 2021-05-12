import React from 'react'
import {Link} from "react-router-dom"

const ErrorPage = () => {
    return (
        <div className="container-fluid row bg-dark">
            <div className="col-8 offset-2 text-center">
                <h2 className="text-white"> Page Not Found !!!</h2>
                <img 
                className="img-fluid mt-3"
                style={{maxHeight:"50%"}}
                src="https://static.vecteezy.com/system/resources/previews/000/551/128/original/moon-smiling-cartoon-vector-illustration.jpg" alt="moon" />
                <br />
                <Link to="/">
                    <button className="mt-3 btn btn-warning"> Go back </button>
                </Link>
            </div>

            
            
        </div>
    )
}

export default ErrorPage
