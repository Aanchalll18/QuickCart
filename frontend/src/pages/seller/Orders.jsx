import React, { useEffect, useState } from "react";
import { assets, dummyAddress, dummyOrders } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const {currency,axios}=useAppContext()
	const fetchOrders = async () => {
		try {
			const { data } = await axios.get('/api/orders/seller', {
				withCredentials: true
			  });
			  
			if(data.success){
				setOrders(data.orders)
			}else{
				toast.error(data.message)
			}
		} catch (error) {
			console.log(error.message)
			toast.error(error.message)
		}
	};

	useEffect(() => {
		fetchOrders();
	}, []);

	return (
		<div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll">
			<div className="md:p-10 p-4 space-y-4">
				<h2 className="text-lg font-medium">Orders List</h2>

				{orders.length === 0 ? (
					<p className="text-gray-500">No orders available.</p>
				) : (
					orders.map((order, index) => (
						<div
							key={index}
							className="flex flex-col md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 md:flex-row justify-between"
						>
							<div className="flex gap-5">
								<img
									className="w-12 h-12 object-cover"
									src={assets.box_icon}
									alt="boxIcon"
								/>
								<div className="flex flex-col">
									{order.items?.map((item, i) => (
										<p key={i} className="font-medium">
											{item.product.name}{" "}
											<span
												className={`text-indigo-500 ${
													item.quantity < 2 ? "hidden" : ""
												}`}
											>
												x {item.quantity}
											</span>
										</p>
									))}
								</div>
							</div>

							<div className="text-sm md:text-base text-black/60">
								{/* <p className="text-black/80">
                  {order.address.firstName} {order.address.lastName}
                </p> */}
								{/* <p>
                  {order.address.street}, {order.address.city},{' '}
                  {order.address.state}
                </p>
                <p>
                  {order.address.zipcode}, {order.address.country}
                </p>
                <p>{order.address.phone}</p> */}
								{order.address ? (
									<div className="text-sm md:text-base text-black/60">
										<p className="text-black/80">
											{order.address.firstName} {order.address.lastName}
										</p>
										<p>
											{order.address.street}, {order.address.city},{" "}
											{order.address.state}
										</p>
										<p>
											{order.address.zipcode}, {order.address.country}
										</p>
										<p>{order.address.phone}</p>
									</div>
								) : (
									<div className="text-sm text-red-500">
										Address not available
									</div>
								)}
							</div>

							<p className="font-medium text-base my-auto">${order.amount}</p>

							<div className="flex flex-col text-sm md:text-base text-black/60">
								<p>Method: {order.paymentType}</p>
								<p>
									Date:{" "}
									{order.createdAt
										? new Date(order.createdAt).toLocaleDateString()
										: "N/A"}
								</p>
								<p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default Orders;
