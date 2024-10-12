import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Function to handle login
    const handleLogin = () => {
        if (email === 'admin' && password === 'admin') {
            setError('');
            navigate('/Dashboard'); // Redirect to the home page on successful login
        } else {
            setError('Invalid username or password. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-purple-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">Admin Login</h2>
                <div className="space-y-4">
                    {/* Email Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-purple-500"
                            placeholder="Enter your username"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-purple-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Action Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={handleLogin}
                            className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition duration-300"
                        >
                            Login
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Admin;
