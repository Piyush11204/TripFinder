import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="font-[ethnocentric] text-center bg-[#fff1e6]  min-h-screen p-[50px] ">
            <h1 className="font-[ethnocentric] text-[156px] mt-[270px]">404</h1>
            <h2 className="not-found-subtitle  text-[44px] mx-0 my-2.5">Page Not Found</h2>
            <p className="not-found-text font-[bold] text-lg mx-0 my-5">Sorry, the page you are looking for does not exist.</p>
            <Link to="/" className="bg-[#333] text-white text-lg px-5 py-2.5 rounded-[70px]">
                Go back to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
