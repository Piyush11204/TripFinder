import { Route, Routes, Navigate } from "react-router-dom";

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
import Hotels from "./Pages/Hotels/Hotels.jsx";
import Admin from "./Pages/Admin/Admin.jsx";
import Dashboard from "./Pages/Admin/Dashboard.jsx";

function App() {
    const user = localStorage.getItem("token");
    const role = localStorage.getItem("role"); // Assuming you store the role in local storage

    return (
        <Routes>
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/home" element={<Home />} />
            <Route path="/addlocation" element={<Addlocation />} />
            <Route path="/aboutus" element={<AboutUS />} />
            <Route path="/location/:id" element={<LocationPage />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/blog" element={<TripvanaReviewPage />} />
            <Route path="/trip/:title" element={<TripModal />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {user && role === 'admin' ? (
                <Route path="/" element={<Navigate replace to="/dashboard" />} />
            ) : user ? (
                <Route path="/" element={<Navigate replace to="/home" />} />
            ) : (
                <Route path="/" element={<Navigate replace to="/login" />} />
            )}

            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default App;
