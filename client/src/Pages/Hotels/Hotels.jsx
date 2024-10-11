import React, { useEffect, useState } from 'react';
import { Star, MapPin, DollarSign, Bed, Search, X, Phone, Mail } from 'lucide-react';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHotel, setSelectedHotel] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch('/Hotels.json');
        const data = await response.json();
        console.log('Fetched Hotels Data:', data);
        setHotels(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const API = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  // Filter hotels by country and search term
  const filteredHotels = hotels.filter(hotel => {
    const countryMatch = !selectedCountry || hotel.city.toLowerCase() === selectedCountry.toLowerCase();
    const nameMatch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase());
    return countryMatch && nameMatch;
  });

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-5xl font-extrabold font-ethnocentric text-center m-12 text-violet-500 animate-fade-in-down">
        Discover Our Hotels
      </h1>

      <div className="mb-8 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
        >
          <option  value="India">India</option>
          <option value="">All Countries</option>
          <option value="United States">United States</option>
          <option value="Canada">Canada</option>
          <option value="France">France</option>
          <option value="Germany">Germany</option>
          <option value="Japan">Japan</option>
          <option value="Brazil">Brazil</option>
          <option value="Australia">Australia</option>
        </select>

        <div className="relative">
          <input
            type="text"
            placeholder="Search hotels..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredHotels.map((hotel) => (
          <div key={hotel.hotel_id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <div className="p-6 h-full flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-semibold mb-3 text-gray-800">{hotel.name}</h2>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{hotel.hotel_description}</p>
                <div className="flex items-center mb-2 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div className="flex items-center mb-2">
                  <MapPin className="w-4 h-4 text-blue-500 mr-2" />
                  <p className="text-sm text-gray-700">{hotel.city}, {hotel.country.toUpperCase()}</p>
                </div>
                <div className="flex items-center mb-2">
                  <DollarSign className="w-4 h-4 text-green-500 mr-2" />
                  <p className="text-sm text-gray-700">{hotel.currency}</p>
                </div>
                <div className="flex items-center mb-4">
                  <Bed className="w-4 h-4 text-purple-500 mr-2" />
                  <p className="text-sm text-gray-700">{hotel.number_of_rooms} room(s)</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setSelectedHotel(hotel)}
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300 text-center font-semibold uppercase tracking-wide transform hover:scale-105"
                >
                  View Details
                </button>
                <a
                  href={hotel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors duration-300 text-center font-semibold uppercase tracking-wide transform hover:scale-105"
                >
                  Book Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedHotel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-xl mt-20 p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold">{selectedHotel.name}</h2>
              <button onClick={() => setSelectedHotel(null)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            {selectedHotel.image && (
              <img
                src={selectedHotel.image}
                alt={selectedHotel.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            )}
            <p className="text-gray-600 mb-4">{selectedHotel.hotel_description}</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-semibold">Location</h3>
                <p>{selectedHotel.city}, {selectedHotel.country}</p>
              </div>
              <div>
                <h3 className="font-semibold">Price</h3>
                <p>{selectedHotel.currency}</p>
              </div>
              <div>
                <h3 className="font-semibold">Rooms</h3>
                <p>{selectedHotel.number_of_rooms}</p>
              </div>
              <div>
                <h3 className="font-semibold">Rating</h3>
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex space-x-4 mb-4">
              <a
                href={`tel:+91 7558565929`} 
                className="inline-flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition"
              >
                <Phone className="mr-2" size={16} /> Call
              </a>
              <a
                href={`mailto:info@${selectedHotel.name.toLowerCase().replace(/\s/g, '')}.com`} // Use a relevant email address
                className="inline-flex items-center px-4 py-2 border border-green-500 text-green-500 rounded-full hover:bg-green-500 hover:text-white transition"
              >
                <Mail className="mr-2" size={16} /> Email
              </a>
            </div>
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=${API}&q=${encodeURIComponent(selectedHotel.name + ' ' + selectedHotel.city + ' ' + selectedHotel.country)}`}
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg mb-4"
            ></iframe>
            <a
              href={selectedHotel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors duration-300 text-center font-semibold uppercase tracking-wide"
            >
              Book Now
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotels;
