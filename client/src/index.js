import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer/Footer";

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
		<Navbar />
			<App />
			<Footer />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
