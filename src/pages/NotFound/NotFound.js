import {Link} from "react-router-dom";
import "./NotFound.css"
import React from 'react'
const NotFound = () =>{
    return (
    <>


        <h3 className="not-found">
            Oops... This Page Doesn't exist
        </h3>
        <p className="not-found">
            Take me back to the <Link to="/">   home page.</Link>
        </p>

    </>
    )
}

export default NotFound;