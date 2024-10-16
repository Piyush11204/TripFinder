import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import logoDevtalk from "../../img/Titlelogo2.png";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10">
            {/* CTA Section */}
            <div className="border-b border-gray-700 pb-8 mb-8">
                <div className="flex justify-between max-w-7xl mx-auto">
                    <div className="flex items-center">
                        <div className="ml-4">
                            <h4 className="text-xl">Find us here</h4>
                            <span className="text-gray-400 text-sm">Vidyavardhini's College Of Engineering & Technology, Vasai Road</span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="ml-4">
                            <h4 className="text-xl">Call us</h4>
                            <span className="text-gray-400 text-sm">9876543210</span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="ml-4">
                            <h4 className="text-xl">Mail us</h4>
                            <span className="text-gray-400 text-sm">mail@info.com</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Content */}
            <div className="max-w-7xl mx-auto flex justify-between flex-wrap px-3">
                <div className="mb-8">
                    <div className="flex items-center justify-between md:justify-start">
                        <Link to="/Home" className="ml-2 flex mx-auto md:ml-4">
                        <img className="w-16 h-16 md:w-20 md:h-20 md:mb-4" src={logoDevtalk} alt="Logo" />
                            <h1 className="text-3xl mt-5 md:text-5xl font-ethnocentric text-white drop-shadow-lg">
                                Trip<span className="vana">Finder</span>
                            </h1>
                        </Link>
                    </div>
                    <p className="text-lg font-semibold mt-4">
                        Welcome to TripFinder! Let us guide you to your dream getaway.
                    </p>
                    <div className="mt-6">
                        <span className="block text-xl font-bold mb-2">Follow us</span>
                        <div className="flex space-x-3">
                            <a href="https://www.facebook.com" className="bg-blue-600 border-2 w-10 h-10 p-1.5 rounded-full" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faFacebook} className="h-6 " />
                            </a>
                            <a href="https://www.instagram.com" className="bg-pink-500 border-2 w-10 h-10 p-1.5 rounded-full" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagram} className="h-6 " />
                            </a>
                            <a href="https://www.github.com" className="bg-gray-800 border-2 h-10 w-10 p-1.5 rounded-full" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faGithub} className="h-6 " />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Useful Links */}
                <div className="mb-8">
                    <h3 className="text-xl mb-4">Useful Links</h3>
                    <ul className="space-y-2">
                        <li><Link to="/" className="text-gray-400 hover:text-purple-500">Home</Link></li>
                        <li><Link to="/contact" className="text-gray-400 hover:text-purple-500">Contact</Link></li>
                        <li><Link to="/aboutus" className="text-gray-400 hover:text-purple-500">About us</Link></li>
                        <li><Link to="/team" className="text-gray-400 hover:text-purple-500">Expert Team</Link></li>
                        <li><Link to="/contactus" className="text-gray-400 hover:text-purple-500">Contact us</Link></li>
                        <li><Link to="/log" className="text-gray-400 hover:text-purple-500">Latest News</Link></li>
                    </ul>
                </div>

                {/* Subscribe Section */}
                <div className="mb-8">
                    <h3 className="text-xl font-ethnocentric text-purple-500 drop-shadow-lg">Subscribe</h3>
                    <p className="mt-4">Don’t miss to subscribe to our new feeds, kindly fill the form below.</p>
                    <div className="mt-6">
                        <form className="flex space-x-3">
                            <input
                                type="text"
                                placeholder="Email Address"
                                className="w-full p-2 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none"
                            />
                            <button
                                type="button"
                                className="bg-purple-400 text-black font-semibold px-5 py-2 rounded-full shadow-md hover:bg-yellow-400"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="bg-gray-800 text-center py-4 mt-8">
                <p className="text-gray-400">
                    © 2024 TripFinder, Inc. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
