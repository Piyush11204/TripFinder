import React from 'react';
import { Link } from 'react-router-dom';

import './PageNotFound.css' ;


const NotFoundPage = () => {
    return (
        <div className="not-found-container text-center bg-[#fff1e6]  min-h-screen p-[50px] ">
            {/* <img src={Lostimage} alt="404" className='img404' /> */}
            <h1 className="not-found-title  text-[156px] mt-[270px]">404</h1>
            <h2 className="not-found-subtitle  text-[44px] mx-0 my-2.5">Page Not Found</h2>
            <p className="not-found-text font-[bold] text-lg mx-0 my-5">Sorry, the page you are looking for does not exist.</p>
            <Link to="/" className="not-found-link bg-[#333] text-white text-lg px-5 py-2.5 rounded-[70px]">
                Go back to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
