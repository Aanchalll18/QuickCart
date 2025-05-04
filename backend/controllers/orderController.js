import Order from "../models/ordersModel.js";
import Product from "../models/ProductModel.js";
import Stripe from "stripe";

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);


export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    if (!userId || !items || !address) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) continue;
      amount += product.offerPrice * item.quantity;
    }

    amount += Math.floor(amount * 0.02); // 2% extra charge

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });

    res.json({
      success: true,
      message: "Order Placed successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Failed, please try again",
    });
  }
};

export const placeOrderSTRIPE = async (req, res) => {
    try {
      const { userId, items, address } = req.body;
      const {origin}=req.headers
      if (!userId || !items || !address) {
        return res.json({
          success: false,
          message: "All fields are required",
        });
      }
      let productData=[];
      
      let amount=await items.reduce(async(acc,item)=>{
        const product=await Product.findById(item.product);
        productData.push({
            name:product.name,
            price:product.offerPrice
        })
        return (await acc) + product.offerPrice*item.quantity
      },0)
  
      amount += Math.floor(amount * 0.02); // 2% extra charge
  
    const order=  await Order.create({
        userId,
        items,
        amount,
        address,
        paymentType: "online",
      });
  const line_items=productData.map((item)=>{
    return{
        price_data:{
            currency:"usd",
            product_data:{
                name:item.name,
            },
            unit_amount:Math.floor(item.price + item.price*0.02)*100
        },
        quantity:item.quantity
    }
  })
  const session=await stripeInstance.checkout.sessions.create({
    line_items,
    mode:"payment",
    success_url:`${origin}/loader?next=my-orders`,
    cancel_url:`${origin}/cart`,
    metadata:{
        orderId:order._id.toString(),
        userId,
    }
  })
      res.json({
        success: true,
       url:session.url,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "Failed, please try again",
      });
    }
  };

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.json({ success: false, message: "User ID is required" });
    }

    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product")
      .populate("address")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product")
      .populate("address")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};
