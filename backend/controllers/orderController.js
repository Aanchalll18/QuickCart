import Order from "../models/ordersModel.js";
import Product from "../models/ProductModel.js";

export const placeOrderCOD=async(req,res)=>{
    try {
        const {userId,items,address}=req.body;
        if(!userId || !items || !address){
            return res.json({
                success:false,
                message:"All fields are required"
            })
        }
        let amount=await items.reduce(async (acc,item)=>{
            const product=await Product.findById(item.product);
            return (await acc)+ product.offerPrice*item.quantity;
        },0)

        amount+=Math.floor(amount*0.02)

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType:"COD"
        })
        res.json({
            success:true,
            message:'Order Placed successfully!'
        })

    } catch (error) {
       console.log(error)
       return res.json({
        success:false,
        message:'failed,please try again'
       }) 
    }
};

export const getUserOrders=async(req,res)=>{
    try {
        //const {userId}=req.body;
        const { userId } = req.query; 
        // console.log('order',userId)
        const orders=await Order.find({
            userId,
            $or:[{paymentType:"COD"},{isPaid:true}]
        }).populate("items.product address").sort({createdAt: -1});
        res.json({success:true,orders})
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:'failed to fetch orders'
        })
    }
};

// export const getUserOrders = async (req, res) => {
//     try {
//       const { userId } = req.query; 
//       if (!userId) {
//         return res.json({ success: false, message: "User ID is required" });
//       }
  
//       const orders = await Order.find({
//         userId,
//         $or: [{ paymentType: "COD" }, { isPaid: true }],
//       })
//         .populate("items.product")
//         .populate("address")
//         .sort({ createdAt: -1 });
  
//       res.json({ success: true, orders });
//     } catch (error) {
//       console.log(error);
//       res.json({
//         success: false,
//         message: "Failed to fetch orders",
//       });
//     }
//   };
  

export const getAllOrders=async(req,res)=>{
    try {
      
        const orders=await Order.find({  
            $or:[{paymentType:"COD"},{isPaid:true}]
        }).populate("item.product address").sort({createdAt: -1});
        res.json({success:true,orders})
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:'failed to fetch orders'
        })
    }
};