import React, { useState } from 'react';
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
        data.append('name', formData.name);
        data.append('locationType', formData.locationType);
        data.append('station', formData.station);
        data.append('image', formData.image);
        data.append('description', formData.description);
        data.append('additionalDetails', formData.additionalDetails);
        data.append('rating', formData.rating);

        try {
            const response = await axios.post('http://localhost:8080/api/addlocation', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Location added successfully:', response.data);
            alert("Location added successfully");
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#e9d7b5]">
            <div className="bg-white shadow-lg rounded-lg mt-28 mb-14 w-full max-w-4xl p-8">
                <h1 className="text-3xl font-bold text-center font-[ethnocentric]  text-gray-800 mb-6">Add Location</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-semibold">Location Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full mt-2 px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring focus:border-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold">Location Type</label>
                        <select
                            name="locationType"
                            value={formData.locationType}
                            onChange={handleChange}
                            className="w-full mt-2 px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring focus:border-indigo-500"
                            required
                        >
                            <option value="" disabled>Choose Location Type</option>
                            {locationTypes.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold">Nearby Station</label>
                        <select
                            name="station"
                            value={formData.station}
                            onChange={handleChange}
                            className="w-full mt-2 px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring focus:border-indigo-500"
                            required
                        >
                            <option value="" disabled>Select Station</option>
                            {stations.map((station, index) => (
                                <option key={index} value={station}>{station}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold">Image</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full mt-2 px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring focus:border-indigo-500"
                            required
                        />
                        {previewImage && (
                            <div className="mt-4">
                                <img src={previewImage} alt="Preview" className="max-h-64 rounded-lg" />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full mt-2 px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring focus:border-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold">Your Review</label>
                        <input
                            type="text"
                            name="additionalDetails"
                            value={formData.additionalDetails}
                            onChange={handleChange}
                            className="w-full mt-2 px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring focus:border-indigo-500"
                        />
                    </div>

                    <div className="flex justify-center items-center space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`text-3xl cursor-pointer ${formData.rating >= star ? 'text-yellow-400' : 'text-gray-400'}`}
                                onClick={() => handleRating(star)}
                            >
                                ★
                            </span>
                        ))}
                    </div>

                    <div className="flex justify-center">
                        <button type="submit" className="px-6 py-3 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-700 transition-all duration-300">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddLocation;
