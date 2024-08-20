import { Route, Routes, Navigate } from "react-router-dom";

import Signup from "./Pages/Singup";
import Login from "./Pages/Login";
import Home from "./Pages/Home/Home";
import Addlocation from "./Pages/Addlocation/Addlocation";
import EditProfile from "./Pages/EditProfile/EditProfile";
import LocationPage from "./Pages/LocationPage/LocationPage";
import NotFoundPage from "./Pages/PageNotFound/PageNotFound";

function App() {
	const user = localStorage.getItem("token");

	return (
		
		<Routes>
			<Route path="/editprofile" element={<EditProfile />} />
			<Route path="/Home" element={<Home />} />
			<Route path="/addlocation" element={<Addlocation />} />
			<Route path="/location/:id" element={<LocationPage />} />
			
			{user && <Route path="/" exact element={<Home />} />}
			<Route path="/Signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}

export default App;
