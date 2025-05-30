import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import { useAppContext } from "./context/AppContext";
import Login from "./components/Login";
import AllProduct from "./pages/AllProduct";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import Addres from "./pages/Addres";
import MyOrders from "./pages/MyOrders";
import SellerLogin from "./components/seller/SellerLogin";
import SellerLayout from "./pages/seller/SellerLayout";
import AddProduct from "./pages/seller/AddProduct";
import ProductList from "./pages/seller/ProductList";
import Orders from "./pages/seller/Orders";
import Loading from './components/Loading'

const App = () => {
	const isSellerPath = useLocation().pathname.includes("seller");

	const { showUserLogin, isSeller } = useAppContext();
	return (
		<div className="text-default min-h-screen text-gray-700 bg-white">
			{isSellerPath ? null : <Navbar />}
			{showUserLogin ? <Login /> : null}

			<div
				className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}
			>
				<Routes>
					{/* Public Routes */}
					<Route path="/" element={<Home />} />
					<Route path="/products" element={<AllProduct />} />
					<Route path="/products/:category" element={<ProductCategory />} />
					<Route path="/products/:category/:id" element={<ProductDetails />} />
					<Route path="/cart" element={<CartPage />} />
					<Route path="/add-address" element={<Addres />} />
					<Route path="/my-orders" element={<MyOrders />} />
					<Route path="/loader" element={<Loading/>}/>

					{/* Seller Auth Route */}
					<Route
						path="/seller"
						element={isSeller ? <SellerLayout /> : <SellerLogin />}
					>
						{isSeller && (
							<>
								<Route index element={<AddProduct />} />
								<Route path="product-list" element={<ProductList />} />
								<Route path="orders" element={<Orders />} />
							</>

						)}
					</Route>
					
				</Routes>
			</div>
			{!isSellerPath && <Footer />}

			<Toaster position="top-center" />
		</div>
	);
};

export default App;
