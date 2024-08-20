import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditProfile.css';

const EditProfile = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });
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
            setUser(response.data);
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
        
        try {
            const response = await axios.put('http://localhost:8080/api/users/me', user, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Response:', response.data);
            alert('Profile updated successfully!');
            fetchUserData(); // Refresh user data after update
        } catch (error) {
            console.error("Error updating profile:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
                setError(`Failed to update profile: ${error.response.data.message || JSON.stringify(error.response.data)}`);
            } else if (error.request) {
                console.error("Request:", error.request);
                setError('No response received from the server. Please try again.');
            } else {
                console.error("Error message:", error.message);
                setError('An error occurred while updating the profile. Please try again.');
            }
        }
    };

    return (
        <div className="edit-profile-container">
            <div className="edit-profile-form">
                <h1>Edit Profile</h1>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={user.firstName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={user.lastName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={user.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" className="update-btn">
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
