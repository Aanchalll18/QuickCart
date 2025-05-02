import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { dummyOrders } from "../assets/assets";

const MyOrders = () => {
	const [myOrders, setMyOrders] = useState([]);
	const { currency } = useAppContext();

	const fetchMyOrders = () => {
		setMyOrders(dummyOrders);
	};

	useEffect(() => {
		fetchMyOrders();
	}, []);

	return (
		<div className="mt-16 pb-16 px-4">
			<div className="flex flex-col items-start mb-8">
				<p className="text-2xl font-medium uppercase">My Orders</p>
				<div className="w-16 h-0.5 bg-primary rounded-full mt-1"></div>
			</div>

			<div className="space-y-6">
				{myOrders.map((order, index) => (
					<div
						key={order._id || index}
						className="border border-gray-300 rounded p-4 shadow-sm py-5 max-w-4xl"
					>
						<p className="flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col">
							<span className="font-semibold">Order ID:</span> {order._id}
							<span className="font-semibold">Payment Type:</span>{" "}
							{order.paymentType}
							<span className="font-semibold">Total Amount:</span> {currency}
							{order.amount}
						</p>
						{order.items.map((item, index) => (
							<div>
								<div lassName="flex items-center mb-4 md:mb-0">
									<div className="bg-primary/10 p-4 rounded-lg">
										<img
											src={item.product.image[0]}
											alt=""
											className="w-16 h-16"
										/>
									</div>
									<div className="ml-4">
										<h2 className="text-xl font-medium text-gray-800">
											{item.product.name}
										</h2>
										<p>Category:{item.product.category}</p>
									</div>
								</div>
                                
                                    <div>
                                        <p>Quantity:{item.quantity || "1"}</p>
                                        <p>Status:{order.status}</p>
                                        <p>Date:{new Date(order.createdAt).toLocalDateString()}</p>
                                    </div>
                                <p>
                                  Amount:{currency}{item.product.offerPrice*itemquantity}  
                                </p>
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default MyOrders;
