import React, { useState, useEffect } from 'react';
import './SearchResult.css';
import { Link } from 'react-router-dom';

const SearchResult = ({ searchResults }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (searchResults.length > 0) {
            setVisible(true); // Show results when new search results come in
        }
    }, [searchResults]);

    const handleHideResults = () => {
        setVisible(false); // Hide the results
    };

    return (
        visible && (
            <div className="search-results-dropdown">
                {searchResults.length > 0 ? (
                    <div className="search-results">
                        <div className="scrollable-results">
                            {searchResults.slice(0, 5).map((result, index) => (
                                <div key={index} className="search-result-item">
                                    <img 
                                        src={result.image} 
                                        alt={result.name} 
                                        className="result-image" 
                                    />
                                    <div className="result-details">
                                        <h3>{result.name}</h3>
                                        <div className="result-rating">
                                            Rating: {result.rating} ⭐
                                        </div>
                                        <Link to={`/location/${result._id}`} state={{ location: result }} className='view-more-link'>
                                            <button className="view-location-btn">View Location</button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="search-button" onClick={handleHideResults}>
                            Hide Results
                        </button>
                    </div>
                ) : (
                    <div className="no-results">
                        {/* <h1>No locations found.</h1> */}
                    </div>
                )}
            </div>
        )
    );
};

export default SearchResult;
