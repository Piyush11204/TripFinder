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
  Cell
} from 'recharts';
import { UserPlus, Luggage, DollarSign, TrendingUp, MapPin, Globe } from 'lucide-react';
import axios from 'axios';

// Fetch functions for dashboard data and users
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

const Dashboard = () => {
  const [data, setData] = useState({
    dailyData: [],
    destinations: [],
    totalUsers: 0,
    totalLocations: 0,
    internationalBookings: 0,
    contacts: [],
    users: [],
    locations: []
  });
  const [activeTab, setActiveTab] = useState('AllUsers');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const dashboardData = await fetchDashboardData();
      if (dashboardData) {
        setData(prevData => ({
          ...prevData,
          ...dashboardData
        }));
      }

      const locationsData = await fetchLocationsData();
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

      const usersData = await fetchUsersData();
      if (usersData) {
        setData(prevData => ({
          ...prevData,
          users: usersData,
          totalUsers: usersData.length
        }));
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 300000);
    return () => clearInterval(intervalId);
  }, []);

  const totalBookings = data.dailyData.reduce((sum, day) => sum + day.bookings, 0);
  const totalRevenue = data.dailyData.reduce((sum, day) => sum + day.revenue, 0);
  const totalVisitors = data.dailyData.reduce((sum, day) => sum + day.visitors, 0);

  return (
    <div className="p-8 bg-violet-50 font-sans">
      <h1 className="text-3xl mt-16 font-bold mb-6 text-violet-800">TripFinder Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card title="Total Bookings" value={totalBookings} icon={UserPlus} />
        <Card title="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} icon={DollarSign} />
        <Card title="Total Visitors" value={totalVisitors.toLocaleString()} icon={Luggage} />
        <Card title="Conversion Rate" value={`${((totalBookings / totalVisitors) * 100).toFixed(2)}%`} icon={TrendingUp} />
        <Card title="Total Users" value={data.totalUsers.toLocaleString()} icon={UserPlus} />
        <Card title="Total Locations" value={data.totalLocations.toLocaleString()} icon={MapPin} />
        <Card title="International Bookings" value={data.internationalBookings.toLocaleString()} icon={Globe} />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex border-b border-violet-200">
          <TabButton active={activeTab === 'AllUsers'} onClick={() => setActiveTab('AllUsers')}>All Users</TabButton>
          <TabButton active={activeTab === 'AllLocations'} onClick={() => setActiveTab('AllLocations')}>All locations</TabButton>
          <TabButton active={activeTab === 'destinations'} onClick={() => setActiveTab('destinations')}>Top Destinations</TabButton>
          <TabButton active={activeTab === 'international'} onClick={() => setActiveTab('international')}>International Bookings</TabButton>
          <TabButton active={activeTab === 'contact'} onClick={() => setActiveTab('contact')}>Contact</TabButton>
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
                    data={data.destinations.filter(dest => dest.name === 'International')}
                    dataKey="bookings"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                  >
                    {data.destinations.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.name === 'International' ? '#82ca9d' : '#8884d8'} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
          {activeTab === 'contact' && <ContactPage contacts={data.contacts} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;