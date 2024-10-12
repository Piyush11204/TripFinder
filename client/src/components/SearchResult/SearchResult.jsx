import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Star, ChevronRight } from 'lucide-react';

const SearchResult = ({ searchResults }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (searchResults.length > 0) {
            setVisible(true);
        } else {
            setVisible(false); // Hide results when there are no search results
        }
    }, [searchResults]);

    const handleHideResults = () => {
        setVisible(false);
    };

    return (
        visible && (
            <div className="absolute top-16 right-30 w-full max-w-md z-50 p-4 bg-gray-900 bg-opacity-95 rounded-lg shadow-2xl backdrop-blur-sm">
                {searchResults.length > 0 && ( // Only render this part if there are search results
                    <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-white">Search Results</h2>
                            <button
                                className="p-2 text-gray-300 hover:text-white transition-colors duration-300"
                                onClick={handleHideResults}
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                            {searchResults.slice(0, 5).map((result, index) => (
                                <div key={index} className="mb-4 bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 group">
                                    <div className="relative">
                                        <img
                                            src={result.image}
                                            alt={result.name}
                                            className="w-full h-36 object-cover transition-transform duration-300 group-hover:scale-105" // Reduced height
                                        />
                                        <div className="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 rounded-full text-sm font-semibold flex items-center">
                                            <Star size={14} className="mr-1" />
                                            {result.rating}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-white mb-2">{result.name}</h3>
                                        <Link 
                                            to={`/location/${result._id}`} 
                                            state={{ location: result }} 
                                            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors duration-300"
                                        >
                                            View Location
                                            <ChevronRight size={16} className="ml-1" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        )
    );
};

export default SearchResult;
