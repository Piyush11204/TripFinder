import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Function to request OTP
    const handleRequestOtp = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/admin/request-otp', { email });
            if (response.status === 200) {
                setOtpSent(true);
                setError('');
                setSuccess('OTP sent successfully. Please check your email.');
            }
        } catch (err) {
            console.error(err);
            setError('Error sending OTP. Please try again.');
            setSuccess('');
        }
    };

    // Function to verify OTP
    const handleVerifyOtp = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/admin/verify-otp', { email, otp });
            if (response.data.success) {
                setSuccess('OTP verified successfully! Redirecting to the home page...');
                setError('');
                // Redirect after a short delay
                setTimeout(() => navigate('/'), 2000);
            } else {
                setError('Invalid OTP. Please try again.');
                setSuccess('');
            }
        } catch (err) {
            console.error(err);
            setError('Error verifying OTP. Please try again.');
            setSuccess('');
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
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-purple-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* OTP Input */}
                    {otpSent && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="otp">
                                OTP:
                            </label>
                            <input
                                type="text"
                                id="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-purple-500"
                                placeholder="Enter OTP"
                            />
                        </div>
                    )}

                    {/* Action Button */}
                    <div className="flex justify-center">
                        {!otpSent ? (
                            <button
                                onClick={handleRequestOtp}
                                className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition duration-300"
                            >
                                Request OTP
                            </button>
                        ) : (
                            <button
                                onClick={handleVerifyOtp}
                                className="bg-green-500 text-white p-2 rounded w-full hover:bg-green-600 transition duration-300"
                            >
                                Verify OTP
                            </button>
                        )}
                    </div>

                    {/* Error and Success Messages */}
                    {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
                    {success && <p className="text-green-500 mt-2 text-center">{success}</p>}
                </div>
            </div>
        </div>
    );
};

export default Admin;
