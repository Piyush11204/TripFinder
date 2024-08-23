import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logoDevtalk from "../../img/Titlelogo2.png";
import WishListLogo from "../../img/WishListLogo.png";
import axios from 'axios';
import SearchResult from "../SearchResult/SearchResult";


const Navbar = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]); // Move searchResults state here

    const handleLogout = () => {
        localStorage.removeItem("token");
        setCurrentUser(null);
        window.location.reload();
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = async () => {
        if (searchTerm.trim()) {
            await fetchSearchResults(searchTerm.trim());
        } else {
            console.log('Please enter a search term.');
            setSearchResults([]); // Clear search results if no search term
        }
    };

    const fetchSearchResults = async (query) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/search?query=${encodeURIComponent(query)}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setSearchResults([]); 
        }
    };

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users/me', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setCurrentUser(response.data);
            } catch (error) {
                console.error("Error fetching current user:", error);
                setCurrentUser(null);
            }
        };

        if (localStorage.getItem('token')) {
            fetchCurrentUser();
        } else {
            setCurrentUser(null);
        }
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };

    return (
        <div className="main_container">
            <nav className="navbar">
                <div className="nav-left">
                    <img className="logo" src={logoDevtalk} alt="Logo" />
                    <a href="/Home">
                        <h1 className="LogoName">Trip<span className="Finder">finder</span></h1>
                    </a>
                </div>
                <div className="sub-topic">
                    <a className="link1" href="/addLocation">Add location</a>
                    <a className="link1" href="/contact">Contact</a>
                </div>
                <div className="search-container">
                    <input
                        className="Search"
                        type="search"
                        id="search-input"
                        placeholder="Adventure Awaits – Find It Here"
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                    <i className="search-icon fas fa-search"></i>
                    <button className="SearchBtn" onClick={handleSearch}>Search</button>
                    <SearchResult searchResults={searchResults} />
                </div>
                {currentUser ? (
                    <div className="user-info">
                        <div>
                            <img className="wishlist" src={WishListLogo} alt="Wishlist" />
                        </div>
                        <div className="user-details" onClick={toggleDropdown}>
                            {currentUser.profileImage ? (
                                <img src={currentUser.profileImage} alt="Profile" className="profile-image" />
                            ) : (
                                <div className="user-initial">{currentUser.firstName[0]}</div>
                            )}
                            <h3 className="userName">
                                {currentUser.firstName} {currentUser.lastName}
                            </h3>
                        </div>
                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <p>{currentUser.firstName} {currentUser.lastName}</p>
                                <p>{currentUser.email}</p>
                                <a href="/editProfile" className="edit-profile">Edit Profile</a>
                                <button className="btn-logout" onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <a href="/signup"><button className="btn-login">Login</button></a>
                )}
            </nav>
        </div>
    );
};

export default Navbar;
