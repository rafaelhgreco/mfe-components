import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "storybook-react";
import logo from "./assets/logo.svg";
import "./App.css";
import { HairPage } from "./pages/hair/hair-page";
import { ShopPage } from "./pages/shop/shop-page";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Header
					logo={logo}
					items={[
						{ label: "Shop", path: "/" },
						{ label: "Hair", path: "/hair" },
						{ label: "Arquivo", path: "/archive" },
					]}
				/>
				<Routes>
					<Route path="/" element={<ShopPage />} />
					<Route path="/hair" element={<HairPage />} />
					<Route path="/archive" element={<div>Archive Page</div>} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
