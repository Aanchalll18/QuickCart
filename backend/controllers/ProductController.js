import { v2 as cloudinary } from 'cloudinary';
import Product from '../models/ProductModel.js';

export const addProduct = async (req, res) => {
  try {
    const productData = JSON.parse(req.body.productData); // fixed parser

    const images = req.files;

    let imageUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: 'image',
        });
        return result.secure_url;
      })
    );

    await Product.create({ ...productData, image: imageUrl });

    return res.json({
      success: true,
      message: 'Product Added',
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: 'Failed to upload product',
    });
  }
};

export const productList = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const productById = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    await Product.findByIdAndUpdate(id, { inStock });
    res.json({
      success: true,
      message: 'Stock Updated',
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
