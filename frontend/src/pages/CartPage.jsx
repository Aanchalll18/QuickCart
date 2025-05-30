// import React, { useEffect, useState } from "react";
// import { useAppContext } from "../context/AppContext";
// import { assets, dummyAddress } from "../assets/assets";
// import { toast } from "react-hot-toast";

// const CartPage = () => {
// 	const {
// 		products,
// 		navigate,
// 		curreny,
// 		addToCart,
// 		updateCart,
// 		deleteCart,
// 		cartItem,
// 		getCartAmount,
// 		getCartCount,
// 		user,
// 		axios,
// 		setCartItem,
// 	} = useAppContext();

// 	const [cartArray, setCartArray] = useState([]);
// 	const [addresses, setAddresses] = useState([]);
// 	const [showAddress, setShowAddress] = useState();
// 	const [selectAddress, setSelectAddress] = useState(null);
// 	const [paymentOption, setPaymentOption] = useState("COD");

// 	const getCart = () => {
// 		let temp = [];
// 		for (const key in cartItem) {
// 			const product = products.find((item) => item._id === key);
// 			if (product) {
// 				product.quantity = cartItem[key];
// 				temp.push(product);
// 			}
// 		}
// 		setCartArray(temp);
// 	};

// 	const getUserAddress = async () => {
// 		try {
// 			const { data } = await axios.get("/api/address/get", {
// 				withCredentials: true,
// 			});

// 			if (data.success) {
// 				setAddresses(data.addresses);
// 				if (data.addresses.length > 0) {
// 					setSelectAddress(data.addresses[0]);
// 				}
// 			} else {
// 				toast.error(data.message);
// 			}
// 		} catch (error) {
// 			console.log(error);
// 			toast.error(error.message);
// 		}
// 	};

// 	const placeOrder = async () => {
// 		try {
// 			if (!selectAddress) {
// 				return toast.error("Please, select an address");
// 			}

// 			if (paymentOption === "COD") {
// 				const { data } = await axios.post("/api/orders/cod", {
// 					userId: user._id,
// 					items: cartArray.map((item) => ({
// 						product: item._id,
// 						quantity: item.quantity,
// 					})),
// 					address: selectAddress._id,
// 				});

// 				if (data.success) {
// 					toast.success("Order placed successfully!");
// 					setCartItem({});
// 					navigate("/my-orders");
// 				} else {
// 					toast.error(data.message);
// 				}
// 			} else {
// 				const { data } = await axios.post("/api/orders/stripe", {
// 					userId: user._id,
// 					items: cartArray.map((item) => ({
// 						product: item._id,
// 						quantity: item.quantity,
// 					})),
// 					address: selectAddress._id,
// 				});

// 				if (data.success) {
// 					window.location.replace(data.url);
// 				} else {
// 					toast.error(data.message);
// 				}
// 			}
// 		} catch (error) {
// 			console.error(error);
// 			toast.error("Something went wrong while placing the order.");
// 		}
// 	};

// 	useEffect(() => {
// 		if (products.length > 0 && cartItem) {
// 			getCart();
// 		}
// 	}, [products, cartItem]);

// 	useEffect(() => {
// 		if (user) {
// 			getUserAddress();
// 		}
// 	}, [user]);

// 	return products.length > 0 && cartItem ? (
// 		<div className="flex flex-col md:flex-row mt-16">
// 			<div className="flex-1 max-w-4xl">
// 				<h1 className="text-3xl font-medium mb-6">
// 					Shopping Cart{" "}
// 					<span className="text-sm text-primary">{getCartCount()}</span>
// 				</h1>

// 				<div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
// 					<p className="text-left">Product Details</p>
// 					<p className="text-center">Subtotal</p>
// 					<p className="text-center">Action</p>
// 				</div>

// 				{cartArray.map((product, index) => (
// 					<div
// 						key={index}
// 						className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
// 					>
// 						<div className="flex items-center md:gap-6 gap-3">
// 							<div
// 								onClick={() => {
// 									navigate(
// 										`/products/${product.category.toLowerCase()}/${product._id}`
// 									);
// 									scrollTo(0, 0);
// 								}}
// 								className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded"
// 							>
// 								<img
// 									className="max-w-full h-full object-cover"
// 									src={product.image[0]}
// 									alt={product.name}
// 								/>
// 							</div>
// 							<div>
// 								<p className="hidden md:block font-semibold">{product.name}</p>
// 								<div className="font-normal text-gray-500/70">
// 									<p>
// 										Weight: <span>{product.weight?.size || "N/A"}</span>
// 									</p>
// 									<div className="flex items-center">
// 										<p>Qty:</p>
// 										<select
// 											className="outline-none ml-2"
// 											value={product.quantity}
// 											onChange={(e) =>
// 												updateCart(product._id, parseInt(e.target.value))
// 											}
// 										>
// 											{Array.from(
// 												{ length: Math.max(product.quantity, 9) },
// 												(_, i) => (
// 													<option key={i + 1} value={i + 1}>
// 														{i + 1}
// 													</option>
// 												)
// 											)}
// 										</select>
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 						<p className="text-center">
// 							{curreny}
// 							{product.offerPrice * product.quantity}
// 						</p>
// 						<button className="cursor-pointer mx-auto">
// 							<img
// 								onClick={() => deleteCart(product._id)}
// 								className="inline-block w-6 h-6"
// 								src={assets.remove_icon}
// 								alt="remove"
// 							/>
// 						</button>
// 					</div>
// 				))}

// 				<button className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium">
// 					<img
// 						onClick={() => {
// 							navigate("/products");
// 							scrollTo(0, 0);
// 						}}
// 						className="group-hover:translate-x-1 transition"
// 						src={assets.arrow_right_icon_colored}
// 						alt=""
// 					/>
// 					<p
// 						onClick={() => {
// 							navigate("/products");
// 							scrollTo(0, 0);
// 						}}
// 					>
// 						Continue Shopping
// 					</p>
// 				</button>
// 			</div>

// 			<div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
// 				<h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
// 				<hr className="border-gray-300 my-5" />

// 				<div className="mb-6">
// 					<p className="text-sm font-medium uppercase">Delivery Address</p>
// 					<div className="relative flex justify-between items-start mt-2">
// 						<p className="text-gray-500">
// 							{selectAddress
// 								? `${selectAddress.street}, ${selectAddress.city}, ${selectAddress.state}, ${selectAddress.country}`
// 								: "No address found"}
// 						</p>
// 						{/* <button
// 							onClick={() => setShowAddress(!showAddress)}
// 							className="text-primary hover:underline cursor-pointer"
// 						>
// 							Change
// 						</button> */}
// 						<button
// 							onClick={(e) => {
// 								e.preventDefault(); 
// 								setShowAddress(!showAddress); 
// 							}}
// 							className="text-primary hover:underline cursor-pointer"
// 						>
// 							Change
// 						</button>

// 						{showAddress && (
// 							<div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full z-10">
// 								{addresses.map((addr, idx) => (
// 									<p
// 										key={idx}
// 										onClick={() => {
// 											setSelectAddress(addr);
// 											setShowAddress(false);
// 										}}
// 										className="text-gray-500 p-2 hover:bg-gray-100 cursor-pointer"
// 									>
// 										{addr.street}, {addr.city}
// 									</p>
// 								))}
// 								<p
// 									onClick={() => navigate("/add-address")}
// 									className="text-primary text-center cursor-pointer p-2 hover:bg-indigo-500/10"
// 								>
// 									Add address
// 								</p>
// 							</div>
// 						)}
// 					</div>

// 					<p className="text-sm font-medium uppercase mt-6">Payment Method</p>
// 					<select
// 						className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
// 						value={paymentOption}
// 						onChange={(e) => setPaymentOption(e.target.value)}
// 					>
// 						<option value="COD">Cash On Delivery</option>
// 						<option value="Online">Online Payment</option>
// 					</select>
// 				</div>

// 				<hr className="border-gray-300" />

// 				<div className="text-gray-500 mt-4 space-y-2">
// 					<p className="flex justify-between">
// 						<span>Price</span>
// 						<span>
// 							{curreny}
// 							{getCartAmount()}
// 						</span>
// 					</p>
// 					<p className="flex justify-between">
// 						<span>Shipping Fee</span>
// 						<span className="text-green-600">Free</span>
// 					</p>
// 					<p className="flex justify-between">
// 						<span>Tax (2%)</span>
// 						<span>
// 							{curreny}
// 							{(getCartAmount() * 0.02).toFixed(2)}
// 						</span>
// 					</p>
// 					<p className="flex justify-between text-lg font-medium mt-3">
// 						<span>Total Amount:</span>
// 						<span>
// 							{curreny}
// 							{(getCartAmount() * 1.02).toFixed(2)}
// 						</span>
// 					</p>
// 				</div>

// 				<button
// 					onClick={placeOrder}
// 					className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition"
// 				>
// 					{paymentOption === "COD" ? "Place order" : "Proceed to Checkout"}
// 				</button>
// 			</div>
// 		</div>
// 	) : null;
// };

// export default CartPage;
import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets, dummyAddress } from "../assets/assets";
import { toast } from "react-hot-toast";

const CartPage = () => {
	const {
		products,
		navigate,
		curreny,
		addToCart,
		updateCart,
		deleteCart,
		cartItem,
		getCartAmount,
		getCartCount,
		user,
		axios,
		setCartItem,
	} = useAppContext();

	const [cartArray, setCartArray] = useState([]);
	const [addresses, setAddresses] = useState([]);  // Default to empty array
	const [showAddress, setShowAddress] = useState(false);  // Set default value to false
	const [selectAddress, setSelectAddress] = useState(null);
	const [paymentOption, setPaymentOption] = useState("COD");

	const getCart = () => {
		let temp = [];
		for (const key in cartItem) {
			const product = products.find((item) => item._id === key);
			if (product) {
				product.quantity = cartItem[key];
				temp.push(product);
			}
		}
		setCartArray(temp);
	};

	const getUserAddress = async () => {
		try {
			const { data } = await axios.get("/api/address/get", {
				withCredentials: true,
			});

			if (data.success) {
				setAddresses(data.addresses);
				if (data.addresses.length > 0) {
					setSelectAddress(data.addresses[0]);
				}
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	const placeOrder = async () => {
		try {
			if (!selectAddress) {
				return toast.error("Please, select an address");
			}

			if (paymentOption === "COD") {
				const { data } = await axios.post("/api/orders/cod", {
					userId: user._id,
					items: cartArray.map((item) => ({
						product: item._id,
						quantity: item.quantity,
					})),
					address: selectAddress._id,
				});

				if (data.success) {
					toast.success("Order placed successfully!");
					setCartItem({});
					navigate("/my-orders");
				} else {
					toast.error(data.message);
				}
			} else {
				const { data } = await axios.post("/api/orders/stripe", {
					userId: user._id,
					items: cartArray.map((item) => ({
						product: item._id,
						quantity: item.quantity,
					})),
					address: selectAddress._id,
				});

				if (data.success) {
					window.location.replace(data.url);
				} else {
					toast.error(data.message);
				}
			}
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong while placing the order.");
		}
	};

	useEffect(() => {
		if (products.length > 0 && cartItem) {
			getCart();
		}
	}, [products, cartItem]);

	useEffect(() => {
		if (user) {
			getUserAddress();
		}
	}, [user]);

	return products.length > 0 && cartItem ? (
		<div className="flex flex-col md:flex-row mt-16">
			<div className="flex-1 max-w-4xl">
				<h1 className="text-3xl font-medium mb-6">
					Shopping Cart{" "}
					<span className="text-sm text-primary">{getCartCount()}</span>
				</h1>

				<div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
					<p className="text-left">Product Details</p>
					<p className="text-center">Subtotal</p>
					<p className="text-center">Action</p>
				</div>

				{cartArray.map((product, index) => (
					<div
						key={index}
						className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
					>
						<div className="flex items-center md:gap-6 gap-3">
							<div
								onClick={() => {
									navigate(
										`/products/${product.category.toLowerCase()}/${product._id}`
									);
									scrollTo(0, 0);
								}}
								className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded"
							>
								<img
									className="max-w-full h-full object-cover"
									src={product.image[0]}
									alt={product.name}
								/>
							</div>
							<div>
								<p className="hidden md:block font-semibold">{product.name}</p>
								<div className="font-normal text-gray-500/70">
									<p>
										Weight: <span>{product.weight?.size || "N/A"}</span>
									</p>
									<div className="flex items-center">
										<p>Qty:</p>
										<select
											className="outline-none ml-2"
											value={product.quantity}
											onChange={(e) =>
												updateCart(product._id, parseInt(e.target.value))
											}
										>
											{Array.from(
												{ length: Math.max(product.quantity, 9) },
												(_, i) => (
													<option key={i + 1} value={i + 1}>
														{i + 1}
													</option>
												)
											)}
										</select>
									</div>
								</div>
							</div>
						</div>
						<p className="text-center">
							{curreny}
							{product.offerPrice * product.quantity}
						</p>
						<button className="cursor-pointer mx-auto">
							<img
								onClick={() => deleteCart(product._id)}
								className="inline-block w-6 h-6"
								src={assets.remove_icon}
								alt="remove"
							/>
						</button>
					</div>
				))}

				<button className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium">
					<img
						onClick={() => {
							navigate("/products");
							scrollTo(0, 0);
						}}
						className="group-hover:translate-x-1 transition"
						src={assets.arrow_right_icon_colored}
						alt=""
					/>
					<p
						onClick={() => {
							navigate("/products");
							scrollTo(0, 0);
						}}
					>
						Continue Shopping
					</p>
				</button>
			</div>

			<div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
				<h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
				<hr className="border-gray-300 my-5" />

				<div className="mb-6">
					<p className="text-sm font-medium uppercase">Delivery Address</p>
					<div className="relative flex justify-between items-start mt-2">
						<p className="text-gray-500">
							{selectAddress
								? `${selectAddress.street}, ${selectAddress.city}, ${selectAddress.state}, ${selectAddress.country}`
								: "No address found"}
						</p>
						<button
							onClick={(e) => {
								e.preventDefault();
								setShowAddress(!showAddress);
							}}
							className="text-primary hover:underline cursor-pointer"
						>
							Change
						</button>

						{showAddress && (
							<div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full z-10">
								{Array.isArray(addresses) && addresses.length > 0 ? (
									addresses.map((addr, idx) => (
										<p
											key={idx}
											onClick={() => {
												setSelectAddress(addr);
												setShowAddress(false);
											}}
											className="text-gray-500 p-2 hover:bg-gray-100 cursor-pointer"
										>
											{addr.street}, {addr.city}
										</p>
									))
								) : (
									<p className="text-gray-500 text-center p-2">No addresses available</p>
								)}
								<p
									onClick={() => navigate("/add-address")}
									className="text-primary text-center cursor-pointer p-2 hover:bg-indigo-500/10"
								>
									Add address
								</p>
							</div>
						)}
					</div>

					<p className="text-sm font-medium uppercase mt-6">Payment Method</p>
					<select
						className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
						value={paymentOption}
						onChange={(e) => setPaymentOption(e.target.value)}
					>
						<option value="COD">Cash On Delivery</option>
						<option value="Online">Online Payment</option>
					</select>
				</div>

				<hr className="border-gray-300" />

				<div className="text-gray-500 mt-4 space-y-2">
					<p className="flex justify-between">
						<span>Price</span>
						<span>
							{curreny}
							{getCartAmount()}
						</span>
					</p>
					<p className="flex justify-between">
						<span>Shipping Fee</span>
						<span className="text-green-600">Free</span>
					</p>
					<p className="flex justify-between">
						<span>Tax (2%)</span>
						<span>
							{curreny}
							{(getCartAmount() * 0.02).toFixed(2)}
						</span>
					</p>
					<p className="flex justify-between text-lg font-medium mt-3">
						<span>Total Amount:</span>
						<span>
							{curreny}
							{(getCartAmount() * 1.02).toFixed(2)}
						</span>
					</p>
				</div>

				<button
					onClick={placeOrder}
					className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition"
				>
					{paymentOption === "COD" ? "Place order" : "Proceed to Checkout"}
				</button>
			</div>
		</div>
	) : null;
};

export default CartPage;
