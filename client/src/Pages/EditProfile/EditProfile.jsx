import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, User, Lock, Eye, EyeOff } from 'lucide-react'; // Importing icons

const EditProfile = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);  // Toggle for password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/users/me', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUser({ ...response.data, password: '', confirmPassword: '' });
        } catch (error) {
            console.error("Error fetching user data:", error);
            setError('Failed to fetch user data. Please try again.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (user.password !== user.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const userData = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        };

        if (user.password) {
            userData.password = user.password;
        }

        try {
            const response = await axios.put('http://localhost:8080/api/users/me', userData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Response:', response.data);
            alert('Profile updated successfully!');
            fetchUserData();
        } catch (error) {
            console.error("Error updating profile:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                setError(`Failed to update profile: ${error.response.data.message || JSON.stringify(error.response.data)}`);
            } else if (error.request) {
                setError('No response received from the server. Please try again.');
            } else {
                setError('An error occurred while updating the profile. Please try again.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-purple-200">
            <div className="bg-white mt-24  p-8 rounded-xl shadow-md w-full max-w-2xl">
                <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">Edit Profile</h1>
                {error && <div className="text-white bg-red-500 text-center py-2 rounded-lg mb-4">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 relative">
                        <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">First Name</label>
                        <User className="absolute  mt-3 left-3 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={user.firstName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 pl-10"
                            required
                            
                        />
                        
                    </div>
                    <div className="mb-4 relative">
                        <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">Last Name</label>
                        <User className="absolute mt-3 left-3 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={user.lastName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 pl-10"
                            required
                        />
                        
                    </div>
                    <div className="mb-4 relative">
                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                        <Mail className="absolute mt-3 left-3 text-gray-400 w-5 h-5" />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={user.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 pl-10"
                            required
                        />
                        
                    </div>

                    {/* Password Fields */}
                    <div className="mb-4 relative">
                        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">New Password</label>
                        <Lock className="absolute mt-3 left-3 text-gray-400 w-5 h-5" />
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={user.password}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 pl-10"
                        />
                        
                        <div className="absolute top-3 right-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff className="text-gray-400 mt-7" /> : <Eye className="text-gray-400 mt-7" />}
                        </div>
                    </div>
                    <div className="mb-4 relative">
                        <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">Confirm New Password</label> <Lock className="absolute mt-3 left-3 text-gray-400 w-5 h-5" />
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={user.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 pl-10"
                        />
                        
                        <div className="absolute top-3 right-3 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <EyeOff className="text-gray-400 mt-7" /> : <Eye className="text-gray-400 mt-7" />}
                        </div>
                    </div>

                    <button type="submit" className="w-full py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-600 transition-all">
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
