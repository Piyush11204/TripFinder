import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="font-[ethnocentric] text-center bg-[#fff1e6] min-h-screen p-5 flex flex-col items-center justify-center">
            <h1 className="font-[ethnocentric] text-[72px] sm:text-[156px] mt-10 sm:mt-0">404</h1>
            <h2 className="text-[24px] sm:text-[44px] my-2.5">Page Not Found</h2>
            <p className="font-mono text-base sm:text-lg my-5 text-center">
                Sorry, the page you are looking for does not exist.
            </p>
            <Link
                to="/"
                className="bg-[#333] text-white text-base sm:text-lg px-4 sm:px-5 py-2 sm:py-2.5 rounded-full"
            >
                Go back to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
