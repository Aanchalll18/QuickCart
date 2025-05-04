import Product from "../models/ProductModel";

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

    } catch (error) {
       console.log(error)
       return res.json({
        success:false,
        message:'failed,please try again'
       }) 
    }
};