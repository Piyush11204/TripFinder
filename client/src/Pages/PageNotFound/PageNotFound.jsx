import React from 'react';
import { Link } from 'react-router-dom';
// import Lostimage from "../../img/Lostimage.png"
import './PageNotFound.css' ;


const NotFoundPage = () => {
    return (
        <div className="not-found-container">
            {/* <img src={Lostimage} alt="404" className='img404' /> */}
            <h1 className="not-found-title">404</h1>
            <h2 className="not-found-subtitle">Page Not Found</h2>
            <p className="not-found-text">Sorry, the page you are looking for does not exist.</p>
            <Link to="/" className="not-found-link">
                Go back to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
