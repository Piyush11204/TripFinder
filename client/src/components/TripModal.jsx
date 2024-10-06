import React from 'react';
import { X, MapPin, Clock, Plane, Car, Camera, Wind, Mountain, Utensils } from 'lucide-react';

const IconMap = {
  Plane, Car, Camera, Wind, Mountain, Utensils
};

const TripModal = ({ isOpen, onClose, trip }) => {
  if (!isOpen || !trip) return null;

  const totalExpenses = Object.values(trip.expenses).reduce((a, b) => a + b, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl w-11/12 max-w-6xl p-6 max-h-[85vh] mt-20 overflow-y-auto">
        {/* Use purple-500 for the background and white text */}
        <div className="bg-purple-500 text-white p-6 rounded-t-2xl -m-6 mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-4xl font-bold">{trip.title}</h2>
            <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
              <X className="w-8 h-8" />
            </button>
          </div>
          <div className="flex items-center mt-4 space-x-4">
            <p className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              {trip.date}
            </p>
            <p className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              {trip.duration}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <p className="text-gray-700 mb-6">{trip.description}</p>

            <h3 className="text-2xl font-semibold mb-4 text-purple-600">Itinerary Highlights</h3>
            <div className="space-y-4">
              {trip.itinerary.map((day, index) => {
                const Icon = IconMap[day.icon] || Plane;
                return (
                  <div key={index} className="flex items-start bg-purple-50 p-4 rounded-lg">
                    <div className="bg-purple-200 rounded-full p-2 mr-4">
                      <Icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <strong className="text-purple-700">Day {day.day}:</strong>
                      <ul className="list-disc list-inside ml-2 text-gray-700">
                        {day.activities.map((activity, idx) => (
                          <li key={idx}>{activity}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4 text-purple-600">Best Spots to Visit</h3>
            <ul className="list-disc list-inside mb-6 text-gray-700">
              {trip.bestSpots.map((spot, index) => (
                <li key={index}>{spot}</li>
              ))}
            </ul>

            <h3 className="text-2xl font-semibold mb-4 text-purple-600">Approximate Expenses</h3>
            <div className="bg-purple-50 rounded-lg p-4 mb-6">
              <ul className="space-y-2">
                {Object.entries(trip.expenses).map(([category, amount], index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span className="capitalize text-gray-700">{category}</span>
                    <span className="font-semibold text-purple-700">${amount}</span>
                  </li>
                ))}
                <li className="flex justify-between items-center pt-2 border-t border-purple-200">
                  <span className="font-semibold text-gray-700">Total</span>
                  <span className="font-bold text-purple-700">${totalExpenses}</span>
                </li>
              </ul>
            </div>

            <h3 className="text-2xl font-semibold mb-4 text-purple-600">Additional Information</h3>
            <ul className="list-disc list-inside text-gray-700">
              {trip.additionalInfo.map((info, index) => (
                <li key={index}>{info}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button onClick={onClose} className="px-6 py-3 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition duration-300">
            Close
          </button>
          <button className="px-6 py-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition duration-300">
            Book This Trip
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripModal;
