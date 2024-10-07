import React, { useState, useEffect } from 'react';
import './SearchResult.css'; // Optional if you still need to keep specific styles
import { Link } from 'react-router-dom';

const SearchResult = ({ searchResults }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (searchResults.length > 0) {
            setVisible(true); 
        }
    }, [searchResults]);

    const handleHideResults = () => {
        setVisible(false); 
    };

    return (
        visible && (
            <div className="absolute top-full left-0 w-full max-w-lg z-50 p-2  rounded-lg ">
                {searchResults.length > 0 ? (
                    <div className="flex flex-col">
                        <button 
                            className="px-4 py-2 mb-2 text-white bg-gray-800 rounded hover:bg-gray-700"
                            onClick={handleHideResults}
                        >
                            Hide Results
                        </button>
                        <div className="max-h-80 overflow-y-auto">
                            {searchResults.slice(0, 5).map((result, index) => (
                                <div key={index} className="flex items-center p-2 mb-2 bg-white border border-gray-300 rounded-lg shadow hover:shadow-lg transition-transform transform hover:scale-105">
                                    <img 
                                        src={result.image} 
                                        alt={result.name} 
                                        className="w-20 h-20 object-cover rounded-lg mr-3" 
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-gray-800 font-semibold">{result.name}</h3>
                                        <div className="text-gray-600">Rating: {result.rating} ⭐</div>
                                        <Link to={`/location/${result._id}`} state={{ location: result }} className='block mt-2'>
                                            <button className="px-3 py-1 text-white bg-gray-800 rounded hover:bg-gray-700">
                                                View Location
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-gray-600 hidden text-center">
                        <p>No results found.</p>
                    </div>
                )}
            </div>
        )
    );
};

export default SearchResult;
