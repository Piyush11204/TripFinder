import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Signup from "./Pages/Singup";
import Login from "./Pages/Login";
import Home from "./Pages/Home/Home";
import Addlocation from "./Pages/Addlocation/Addlocation";
import EditProfile from "./Pages/EditProfile/EditProfile";
import LocationPage from "./Pages/LocationPage/LocationPage";
import NotFoundPage from "./Pages/PageNotFound/PageNotFound";
import AboutUS from "./Pages/AboutUS/AboutUS";
import WishList from "./Pages/Wishlist Page/WishList";
import ContactUs from "./Pages/ContactUs/Contact";
import TripModal from "./components/TripModal";
import TripvanaReviewPage from "./Pages/TripvanaReviewPage/TripvanaReviewPage";
import Hotels from "./Pages/Hotels/Hotels";
import Admin from "./Pages/Admin/Admin";
import Dashboard from "./Pages/Admin/Dashboard";
import ChatApp from "./Pages/ChatSection/ChatApp";

function App() {
    const [user, setUser] = useState(localStorage.getItem("token"));
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const storedUserName = localStorage.getItem("userName");
        if (storedUserName) {
            setUserName(storedUserName);
        }
    }, []);

    const handleLogin = (name) => {
        setUserName(name);
        localStorage.setItem("userName", name);
    };

    const handleLogout = () => {
        setUser(null);
        // eslint-disable-next-line no-undef
        setRole(null);
        setUserName('');
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userName");
    };

    return (
        <Routes>
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/home" element={<Home />} />
            <Route path="/aboutus" element={<AboutUS />} />
            <Route path="/location/:id" element={<LocationPage />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/blog" element={<TripvanaReviewPage />} />
            <Route path="/trip/:title" element={<TripModal />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Navigate replace to="/home" />} />
            {/* Restricted routes for logged-in users only */}
            {user ? (
                <>
                    <Route path="/addlocation" element={<Addlocation />} />
                    <Route path="/hotels" element={<Hotels />} />
                </>
            ) : (
                <>
                    <Route path="/addlocation" element={<Navigate to="/login" replace />} />
                    <Route path="/hotels" element={<Navigate to="/login" replace />} />
                </>
            )}

           

                    
          

          

            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/chat" element={<ChatApp userName={userName} />} />
        </Routes>
    );
}

export default App;
