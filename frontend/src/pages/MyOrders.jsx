import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";


const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency,user,axios } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get(`/api/orders/user?userId=${user._id}`);
      if (data.success) {
        setMyOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    if(user){
      fetchMyOrders();
    }
  }, [user]);

  return (
    <div className="mt-16 pb-16 px-4">
      <div className="flex flex-col items-start mb-10">
        <p className="text-3xl font-semibold uppercase text-primary">My Orders</p>
        <div className="w-20 h-1 bg-primary rounded-full mt-2"></div>
      </div>

      <div className="space-y-10">
        {myOrders.map((order, index) => (
          <div
            key={order._id || index}
            className="border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300 bg-white max-w-4xl"
          >
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row items-start md:items-center gap-6"
              >
                <div className="bg-primary/10 p-4 rounded-lg">
                  <img
                    src={item.product.image[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <h2 className="text-xl font-medium text-gray-800">
                    {item.product.name}
                  </h2>
                  <p className="text-gray-500">Category: {item.product.category}</p>
                  <p className="text-gray-500">Quantity: {item.quantity || 1}</p>
                  <p className="text-gray-500">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-500">Status: {order.status}</p>
                  <p className="text-primary font-semibold">
                    Amount: {currency}
                    {item.product.offerPrice * (item.quantity || 1)}
                  </p>
                </div>
              </div>
            ))}

            {/* Order Info Below Items */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border-t border-dashed border-gray-300 space-y-2 text-sm md:text-base">
              <p>
                <span className="font-semibold text-gray-700">Order ID:</span>{" "}
                <span className="bg-gray-200 text-gray-800 px-2 py-0.5 rounded font-mono">
                  {order._id}
                </span>
              </p>
              <p>
                <span className="font-semibold text-gray-700">Payment Type:</span>{" "}
                {order.paymentType}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Total Amount:</span>{" "}
                {currency}
                {order.amount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
