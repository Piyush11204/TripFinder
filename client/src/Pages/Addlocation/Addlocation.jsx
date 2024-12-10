import React, { useState } from 'react';
import { MapPin, Image, Star, Send } from 'lucide-react';
import axios from 'axios';

const AddLocation = () => {
    const [formData, setFormData] = useState({
        name: '',
        locationType: '',
        station: '',
        image: null,
        description: '',
        additionalDetails: '',
        rating: 0,
    });
    const [previewImage, setPreviewImage] = useState(null);

    const stations = [
        'Churchgate', 'Mumbai CST', 'Dadar', 'Lokmanya Tilak', 'Andheri', 'Borivali', 
        'Kalyan', 'Thane', 'Mumbai LTT', 'Mumbai Dadar', 'Mumbai Bandra', 'Mumbai Kurla', 
        'Mumbai Vile Parle', 'Boisar', 'Palghar', 'Kelve Road', 'Virar', 'Vasai Road','Dahanu'
    ];

    const locationTypes = ['Park', 'Beach', 'Forest', 'Temple', 'Mountain', 'Historical Landmark', 'Water Park', 'Fort'];

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRating = (rating) => {
        setFormData({ ...formData, rating });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });

        try {
            const response = await axios.post('https://tripfinder.onrender.com/api/addlocation', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Location added successfully:', response.data);
            alert("Location added successfully");
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto mt-12 bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-indigo-600 py-6 px-8">
                    <h1 className="text-3xl font-bold text-white">Add New Location</h1>
                    <p className="mt-2 text-indigo-200">Share a beautiful place with the community</p>
                </div>
                <form onSubmit={handleSubmit} className="py-8 px-8 space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Location Name</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MapPin className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="block w-full pl-10 sm:text-sm h-12 border-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Enter location name"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Location Type</label>
                            <select
                                name="locationType"
                                value={formData.locationType}
                                onChange={handleChange}
                                className="mt-1 block w-full h-12  pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                required
                            >
                                <option value="" disabled>Choose Location Type</option>
                                {locationTypes.map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nearby Station</label>
                        <select
                            name="station"
                            value={formData.station}
                            onChange={handleChange}
                            className="mt-1 block h-12 border-1 w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            required
                        >
                            <option value="" disabled>Select Station</option>
                            {stations.map((station, index) => (
                                <option key={index} value={station}>{station}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <Image className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" required />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                        {previewImage && (
                            <div className="mt-4">
                                <img src={previewImage} alt="Preview" className="max-h-64 rounded-lg mx-auto" />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="mt-1 block w-full border-2  sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Describe the location..."
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Your Review</label>
                        <input
                            type="text"
                            name="additionalDetails"
                            value={formData.additionalDetails}
                            onChange={handleChange}
                            className="mt-1 block w-full h-12 border-2 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Share your experience..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                        <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`h-8 w-8 cursor-pointer ${formData.rating >= star ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                    onClick={() => handleRating(star)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <Send className="h-5 w-5 mr-2" />
                            Submit Location
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddLocation;