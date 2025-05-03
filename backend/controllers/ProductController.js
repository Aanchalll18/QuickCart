import {v2 as cloudinary} from 'cloudinary'
import Product from '../models/ProductModel';

export const addProduct=async(req,res)=>{
    try {

        let productData=JSON.parser(req,ReportBody.productData)

        const images=req.files;
        let imageUrl=await Promise.all(
            images.map(async (item)=>{
                let result=await connectcloudinary.uploader.upload(item.path,
                    {resource_type:'image'})
                return result.secure_url
            })
        )
        await Product.create({...productData,image:imageUrl})

        return res.json({
            success:true,
            message:'Product Added'
        })

    } catch (error) {
        console.log(error)
        return res.json({
            success:false,
            message:'Failed to upload product'
        })
    }
};

