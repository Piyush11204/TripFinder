import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  ComposedChart,
  Area,
  Line,
  Cell,
  Scatter
} from 'recharts';
import { UserPlus,Star, MapPin, Globe, Building, User } from 'lucide-react';
import axios from 'axios';

// Fetch functions
const fetchDashboardData = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/dashboard-data');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    return null;
  }
};


const fetchHotelsData = async () => {
  try {
    const response = await fetch('./hotels.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch hotels data from JSON:", error);
    return [];
  }
};

const fetchInternationalTrips = async () => {
  try {
    const response = await import('./tripPlans.json');
    return response.default.filter(trip => trip.title.includes('International'));
  } catch (error) {
    console.error("Failed to fetch international trips:", error);
    return [];
  }
};

const fetchLocationsData = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/addlocation');
    return response.data;
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
};

const fetchUsersData = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

// Component definitions
const Card = ({ title, value, icon: Icon }) => (
  <div className="bg-violet-100 p-4 rounded-lg shadow">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-sm font-medium text-violet-800">{title}</h3>
      <Icon className="h-4 w-4 text-violet-600" />
    </div>
    <p className="text-2xl font-bold text-violet-900">{value}</p>
  </div>
);

const TabButton = ({ active, onClick, children }) => (
  <button
    className={`px-4 py-2 font-medium rounded-t-lg ${active ? 'bg-white text-violet-800' : 'bg-violet-200 text-violet-600'
      }`}
    onClick={onClick}
  >
    {children}
  </button>
);

const Table = ({ data }) => (
  <table className="min-w-full bg-white">
    <thead>
      <tr>
        <th className="px-6 py-3 border-b-2 border-violet-200 text-left text-xs font-semibold text-violet-800 uppercase tracking-wider">
          Destination
        </th>
        <th className="px-6 py-3 border-b-2 border-violet-200 text-left text-xs font-semibold text-violet-800 uppercase tracking-wider">
          Bookings
        </th>
        <th className="px-6 py-3 border-b-2 border-violet-200 text-left text-xs font-semibold text-violet-800 uppercase tracking-wider">
          Revenue
        </th>
      </tr>
    </thead>
    <tbody>
      {data.map((item, index) => (
        <tr key={index} className={index % 2 === 0 ? 'bg-violet-50' : 'bg-white'}>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-violet-900">{item.name}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-violet-800">{item.bookings}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-violet-800">${item.revenue.toLocaleString()}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const ContactPage = ({ contacts }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4 text-violet-800">Contact Information</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {contacts.map((contact, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium text-violet-800">{contact.name}</h3>
          <p className="text-violet-600">{contact.position}</p>
          <p className="text-violet-600">{contact.email}</p>
          <p className="text-violet-600">{contact.phone}</p>
        </div>
      ))}
    </div>
  </div>
);
const fetchReviewsData = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/Allreview');
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
};
const ReviewCard = ({ review }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <div className="flex items-center mb-2">
      <div className="flex">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
        ))}
      </div>
      {/* <span className="ml-2 text-sm text-gray-600">{new Date(review.date).toLocaleDateString()}</span> */}
    </div>
    <div className='flex m-auto p-2'>

        <User className='text-violet-600 mr-3' />
        <h1 className=" text-violet-600"> {review.name}</h1>
    </div>
    <p className="text-sm text-violet-800">{review.review}</p>
  </div>
);
const LocationsTable = ({ data, searchTerm }) => {
  const filteredData = data.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.locationType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.station.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="px-4 py-2 border">Name</th>
          <th className="px-4 py-2 border">Type</th>
          <th className="px-4 py-2 border">Station</th>
          <th className="px-4 py-2 border">Rating</th>
          <th className="px-4 py-2 border">Description</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map((location, index) => (
          <tr key={index} className={index % 2 === 0 ? 'bg-violet-50' : 'bg-white'}>
            <td className="px-4 py-2 border">{location.name}</td>
            <td className="px-4 py-2 border">{location.locationType}</td>
            <td className="px-4 py-2 border">{location.station}</td>
            <td className="px-4 py-2 border">{location.rating}</td>
            <td className="px-4 py-2 border">
              <div className="max-h-20 overflow-y-auto">{location.description}</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
const ReviewAnalytics = ({ reviews }) => {
  // Process review data for charts
  const ratingDistribution = Array(5).fill(0);
  reviews.forEach(review => {
    ratingDistribution[review.rating - 1]++;
  });

  const ratingData = ratingDistribution.map((count, index) => ({
    rating: `${index + 1} Stars`,
    count: count
  }));

  const COLORS = ['#FF8042', '#FFBB28', '#00C49F', '#0088FE', '#8884d8'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-violet-800">Rating Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ratingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rating" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8">
                {ratingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-violet-800">Rating Distribution (Pie)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ratingData}
                dataKey="count"
                nameKey="rating"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {ratingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4 text-violet-800">Recent Reviews</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.slice(0, 6).map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};

const UsersTable = ({ data, searchTerm }) => {
  const filteredData = data.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr className="bg-violet-500 text-white">
          <th className="px-4 py-2 border">First Name</th>
          <th className="px-4 py-2 border">Last Name</th>
          <th className="px-4 py-2 border">Email</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map((user, index) => (
          <tr key={index} className="hover:bg-gray-100">
            <td className="px-4 py-2 border text-violet-700">{user.firstName}</td>
            <td className="px-4 py-2 border text-violet-700">{user.lastName}</td>
            <td className="px-4 py-2 border text-violet-700">{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const HotelCard = ({ hotel }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold text-violet-800 mb-2">{hotel.name}</h3>
    <p className="text-sm text-violet-600 mb-1">{hotel.address}, {hotel.city}</p>
    <p className="text-sm text-violet-600 mb-1">Rooms: {hotel.number_of_rooms}</p>
    {/* <p className="text-xs text-violet-500">{hotel.hotel_description}</p> */}
  </div>
);


const findCities = (hotels, searchTerm) => {
  const regex = new RegExp(searchTerm, 'i');
  return hotels.filter(hotel => regex.test(hotel.city));
};



const Dashboard = () => {
  const [data, setData] = useState({
    dailyData: [],
    destinations: [],
    totalUsers: 0,
    totalLocations: 0,
    internationalBookings: 0,
    AllReviews:0,
    contacts: [],
    users: [],
    locations: [],
    hotels: [],
    totalHotels: 0,
    trips: [],
    reviews: [],
  });
  const [activeTab, setActiveTab] = useState('AllUsers');
  const [searchTerm, setSearchTerm] = useState('');
  const [cityData, setCityData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const dashboardData = await fetchDashboardData();
      const locationsData = await fetchLocationsData();
      const usersData = await fetchUsersData();
      const hotelsData = await fetchHotelsData();
      const tripsData = await fetchInternationalTrips();
      const reviewsData = await fetchReviewsData();


      if (dashboardData) {
        setData(prevData => ({
          ...prevData,
          ...dashboardData
        }));
      }

      if (locationsData) {
        setData(prevData => ({
          ...prevData,
          locations: locationsData,
          totalLocations: locationsData.length,
          destinations: locationsData.reduce((acc, location) => {
            const existingType = acc.find(dest => dest.name === location.locationType);
            if (existingType) {
              existingType.bookings += 1;
              existingType.revenue += location.rating * 100; // Example revenue calculation
            } else {
              acc.push({
                name: location.locationType,
                bookings: 1,
                revenue: location.rating * 100
              });
            }
            return acc;
          }, [])
        }));
      }

      if (usersData) {
        setData(prevData => ({
          ...prevData,
          users: usersData,
          totalUsers: usersData.length
        }));
      }
      if (reviewsData) {
        setData(prevData => ({
          ...prevData,
          reviews: reviewsData,
          AllReviews:reviewsData.length
        }));
      }
      if (hotelsData) {
        setData(prevData => ({
          ...prevData,
          hotels: hotelsData,
          totalHotels: hotelsData.length
        }));
        if (tripsData) {
          setData(prevData => ({
            ...prevData,
            trips: tripsData,
            internationalBookings: tripsData.length
          }));
        }
        // Process city data for the graph
        const cityCount = hotelsData.reduce((acc, hotel) => {
          acc[hotel.city] = (acc[hotel.city] || 0) + 1;
          return acc;
        }, {});

        const cityDataArray = Object.entries(cityCount).map(([city, count]) => ({
          city,
          count
        }));

        setCityData(cityDataArray.sort((a, b) => b.count - a.count).slice(0, 10)); // Top 10 cities
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 300000);
    return () => clearInterval(intervalId);
  }, []);

  // const totalBookings = data.dailyData.reduce((sum, day) => sum + day.bookings, 0);
  // const totalRevenue = data.dailyData.reduce((sum, day) => sum + day.revenue, 0);
  // const totalVisitors = data.dailyData.reduce((sum, day) => sum + day.visitors, 0);
  
  const filteredHotels = data.hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-violet-50 font-sans">
      <h1 className="text-3xl mt-16 font-bold mb-6 text-violet-800">TripFinder Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card title="Total Users" value={data.totalUsers.toLocaleString()} icon={UserPlus} />
        <Card title="Total Locations" value={data.totalLocations.toLocaleString()} icon={MapPin} />
        <Card title="All Reviews" value={data.AllReviews.toLocaleString()} icon={Globe} />
        <Card title="Total Hotels" value={data.totalHotels.toLocaleString()} icon={Building} />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex border-b border-violet-200">
          <TabButton active={activeTab === 'AllUsers'} onClick={() => setActiveTab('AllUsers')}>All Users</TabButton>
          <TabButton active={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')}>Reviews</TabButton>
          <TabButton active={activeTab === 'AllLocations'} onClick={() => setActiveTab('AllLocations')}>All Locations</TabButton>
          <TabButton active={activeTab === 'destinations'} onClick={() => setActiveTab('destinations')}>Top Destinations</TabButton>
          {/* <TabButton active={activeTab === 'international'} onClick={() => setActiveTab('international')}>International Bookings</TabButton> */}
          <TabButton active={activeTab === 'hotels'} onClick={() => setActiveTab('hotels')}>Hotels</TabButton>
        </div>

        <div className="p-6">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 mb-4 border border-violet-300 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {activeTab === 'AllLocations' && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-violet-800">All Locations</h2>
              <LocationsTable data={data.locations} searchTerm={searchTerm} />
            </div>
          )}
          {activeTab === 'AllUsers' && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-violet-800">Users from Tripfinder</h2>
              <UsersTable data={data.users} searchTerm={searchTerm} />
            </div>
          )}
          {activeTab === 'destinations' && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-violet-800">Top Destinations</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.destinations}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="bookings" fill="#82ca9d" />
                  <Bar dataKey="revenue" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
              <Table data={data.destinations} />
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-violet-800">Destination Names</h3>
                <ul className="list-disc list-inside text-violet-700">
                  {data.destinations.map((destination, index) => (
                    <li key={index}>{destination.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {activeTab === 'international' && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-violet-800">International Bookings</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[{ name: 'International', value: data.internationalBookings }]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#82ca9d"
                  />
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-violet-800">International Trip Plans</h3>
                <ul className="list-disc list-inside text-violet-700">
                  {data.trips.map((trip, index) => (
                    <li key={index}>{trip.title}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {activeTab === 'contact' && <ContactPage contacts={data.contacts} />}
          {activeTab === 'reviews' && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-violet-800">Review Analytics</h2>
              <ReviewAnalytics reviews={data.reviews} />
            </div>)}
          {activeTab === 'hotels' && (
            <div>
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4 text-violet-800">Top 10 Cities with Most Hotels</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={cityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="city" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <h2 className="text-xl font-semibold mb-4 text-violet-800">Hotels</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {findCities(filteredHotels, searchTerm).map((hotel, index) => (
                  <HotelCard key={index} hotel={hotel} />
                ))}
              </div>
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4 text-violet-800">Complex Graph</h2>
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart
                    data={data.dailyData}
                    margin={{
                      top: 20,
                      right: 20,
                      bottom: 20,
                      left: 20,
                    }}
                  >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="revenue" fill="#8884d8" stroke="#8884d8" />
                    <Bar dataKey="bookings" barSize={20} fill="#413ea0" />
                    <Line type="monotone" dataKey="visitors" stroke="#ff7300" />
                    <Scatter dataKey="conversionRate" fill="red" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;