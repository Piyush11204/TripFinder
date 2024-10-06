import { Route, Routes, Navigate } from "react-router-dom";

import Signup from "./Pages/Singup";
import Login from "./Pages/Login";
import Home from "./Pages/Home/Home";
import Addlocation from "./Pages/Addlocation/Addlocation";
import EditProfile from "./Pages/EditProfile/EditProfile";
import LocationPage from "./Pages/LocationPage/LocationPage";
import NotFoundPage from "./Pages/PageNotFound/PageNotFound";
import AboutUS from "./Pages/AboutUS/AboutUS";
import AboutUs from "./Pages/AboutUS/AboutUS";
import WishList from "./Pages/Wishlist Page/WishList";
import ContactUs from "./Pages/ContactUs/Contact";
import TripModal from "./components/TripModal";

function App() {
	const user = localStorage.getItem("token");

	return (
		
		<Routes>
			<Route path="/editprofile" element={<EditProfile />} />
			<Route path="/Home" element={<Home />} />
			<Route path="/addlocation" element={<Addlocation />} />
			<Route path="/about" element={<AboutUS />} />
			<Route path="/location/:id" element={<LocationPage />} />
			<Route path="/aboutus" element={<AboutUs />}/>
			<Route path="/wishlist" element={<WishList />} />
			<Route path="/contact" element={<ContactUs />}/>
			<Route path="/trip/:title" component={TripModal} />

			
			{user && <Route path="/" exact element={<Home />} />}
			<Route path="/Signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}

export default App;
