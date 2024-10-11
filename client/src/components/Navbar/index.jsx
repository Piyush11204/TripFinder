import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { LogIn, Menu, X, Search, Heart } from "lucide-react";
import SearchResult from "../SearchResult/SearchResult";
import "./Navbar.css";
import logo from '../../img/Titlelogo2.png';

const Navbar = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

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
            console.log("Please enter a search term.");
            setSearchResults([]);
        }
    };

    const fetchSearchResults = async (query) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/search?query=${encodeURIComponent(query)}`
            );
            setSearchResults(response.data);
        } catch (error) {
            console.error("Error fetching search results:", error);
            setSearchResults([]);
        }
    };

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/users/me", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setCurrentUser(response.data);
            } catch (error) {
                console.error("Error fetching current user:", error);
                setCurrentUser(null);
            }
        };

        if (localStorage.getItem("token")) {
            fetchCurrentUser();
        } else {
            setCurrentUser(null);
        }
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prevState) => !prevState);
    };

    return (
        <div className="shadow-xl fixed top-0 w-full z-20 bg-gray-900">
            <nav className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
                <div className="flex items-center">
                    <img
                        className="w-10 h-10 rounded-lg shadow-lg"
                        src={logo}
                        alt="Logo"
                        style={{ filter: "0px 4px 10px rgba(255, 255, 255, 0.5)" }}
                    />

                    <Link to="/Home">
                        <h1 className="text-white font-[ethnocentric] text-xl sm:text-2xl font-bold ml-2 sm:ml-4">
                            Trip<span className="vana font-[ethnocentric]">vana</span>
                        </h1>
                    </Link>
                </div>

                <div className="hidden md:flex items-center gap-6 text-white font-semibold">
                    <Link to="/Hotels" className="hover:text-purple-300 font-bold">Hotels</Link>
                    <Link to="/addLocation" className="hover:text-purple-300 font-bold">Add Location</Link>
                    <Link to="/aboutus" className="hover:text-purple-300 font-bold">About Us</Link>
                    <Link to="/contact" className="hover:text-purple-300 font-bold">Contact</Link>
                    <Link to="/Blog" className="hover:text-purple-300 font-bold">Blogs</Link>
                </div>

                <div className="flex items-center">
                    <div className="relative hidden md:block">
                        <input
                            type="search"
                            placeholder="Adventure Awaits – Find It Here"
                            value={searchTerm}
                            onChange={handleInputChange}
                            className="py-1  border-b-2 border-gray-500 focus:border-purple-400 outline-none bg-transparent text-white placeholder-gray-400 w-48 lg:w-72"
                        />
                        <button
                            className="ml-2 px-3 py-1 text-sm text-white  border-2 border-purple-500 rounded-full hover:bg-purple-500 hover:text-gray-900 transition-all"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>
                    <SearchResult searchResults={searchResults} />
                </div>

                {currentUser ? (
                    <div className="hidden md:flex items-center gap-4">
                        <Link to="/wishlist">
                            < Heart className="text-white" />
                        </Link>
                        <div className="relative cursor-pointer" onClick={toggleDropdown}>
                            <div className="flex items-center space-x-2">
                                {currentUser.profileImage ? (
                                    <img
                                        src={currentUser.profileImage}
                                        alt="Profile"
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                                        {currentUser.firstName[0]}
                                    </div>
                                )}
                                <div className="flex flex-col">
                                    <h3 className="text-white text-sm font-medium">{currentUser.firstName} {currentUser.lastName}</h3>
                                    <span className="text-gray-300 text-xs">{currentUser.email}</span>
                                </div>
                            </div>
                        </div>
                        {isDropdownOpen && (
                            <div className="absolute right-2 top-16 bg-white text-black shadow-lg rounded-lg p-4 w-64 transition-transform transform scale-95 origin-top-right">
                                <div className="font-semibold text-gray-800">
                                    {currentUser.firstName} {currentUser.lastName}
                                </div>
                                <p className="text-gray-600 text-sm">{currentUser.email}</p>
                                <Link to="/editProfile" className="block text-purple-500 mt-2 hover:underline">Edit Profile</Link>
                                <button
                                    className="w-full mt-2 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-200"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/signup" className="hidden md:block">
                        <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-full shadow-md hover:bg-purple-700 transition duration-200">
                            <LogIn className="w-5 h-5 mr-2" /> Login
                        </button>
                    </Link>
                )}

                {/* Mobile menu button */}
                <button
                    onClick={toggleMobileMenu}
                    className="md:hidden text-white focus:outline-none"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-gray-800 text-white p-4">
                    <div className="flex flex-col space-y-4">
                        <Link to="/Hotels" className="hover:text-purple-300 font-bold">Hotels</Link>
                        <Link to="/aboutus" className="hover:text-purple-300">About Us</Link>
                        <Link to="/addLocation" className="hover:text-purple-300">Add Location</Link>
                        <Link to="/contact" className="hover:text-purple-300">Contact</Link>
                        <Link to="/Blog" className="hover:text-purple-300 font-bold">Blogs</Link>
                        <div className="relative">
                            <input
                                type="search"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={handleInputChange}
                                className="w-full py-2 px-4 bg-gray-700 rounded-full text-white placeholder-gray-400"
                            />
                            <button
                                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                onClick={handleSearch}
                            >
                                <Search size={20} />
                            </button>
                        </div>
                        {currentUser ? (
                            <>
                                <Link to="/wishlist" className="flex items-center">
                                    <Heart className="text-white" />
                                    <span className="ml-2">Wishlist</span>
                                </Link>
                                <Link to="/editProfile" className="text-purple-300">Edit Profile</Link>
                                <button
                                    className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/signup" className="w-full">
                                <button className="w-full flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-full shadow-md hover:bg-purple-700 transition duration-200">
                                    <LogIn className="w-5 h-5 mr-2" /> Login
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
