import React from 'react';
import './SearchResult.css'; 
import { Link } from 'react-router-dom';

const SearchResult = ({ searchResults }) => {
    return (
        <div className="search-results-dropdown">
            {searchResults.length > 0 ? (
                <div className="search-results">
                    {searchResults.map((result, index) => (
                        <div key={index} className="search-result-item">
                            <img src={`http://localhost:8080/${result.image}`} alt={result.name} className="result-image" />
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
            ) :
             (
                <div className="no-results">
                    {/* <h1>No locations found.</h1> */}
                </div>
            )
            }
        </div>
    );
};

export default SearchResult;
