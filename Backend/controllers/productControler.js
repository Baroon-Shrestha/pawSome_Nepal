import { asyncErrorHandling } from "../middlewares/asyncErrorHandler.js";
import { createError, errorHanlder } from "../middlewares/errorHandling.js";
import { Product } from "../models/products.js"
import cloudinary from 'cloudinary'


export const addProduct = asyncErrorHandling(async (req, res) => {

    const { eamil } = req.user

    if (!eamil.endsWith(".admin@gmail.com")) return errorHanlder(createError("you're not authorized"), req, res)

    const { name, description, price, stockQuantity } = req.body

    if (!name || !description || !price || !stockQuantity) return errorHanlder(createError("You cannot leave any of these empty"), req, res)

    const { prodImage } = req.files

    if (!prodImage || !Array.isArray(prodImage) || prodImage.length < 2) {
        return errorHanlder(createError("Please provide two or more images"), req, res)
    }
    const allowedExtensions = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    for (const image of prodImage) {
        if (!allowedExtensions.includes(image.mimetype)) {
            return errorHanlder(createError("Please upload images in PNG, JPEG, JPG, or WEBP format"), req, res)
        }
    }
    const uploadedImages = [];

    for (const image of prodImage) {
        const cloudinaryResponse = await cloudinary.uploader.upload(image.tempFilePath);
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.log("Cloudinary error:", cloudinaryResponse.error || "Unknown Cloudinary error");
            return errorHanlder(createError("Failed to upload image"), req, res)
        }
        uploadedImages.push({
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        });
    }

    const products = await Product.create({ name, description, price, stockQuantity, prodImage: uploadedImages })
    res.send({
        success: true,
        message: "Product added successfully",
        products
    })
})

export const viewAllProduct = asyncErrorHandling(async (req, res) => {
    const viewProduct = await Product.find()

    res.send({
        success: true,
        viewProduct
    })
})

export const buyProduct = asyncErrorHandling(async (req, res) => {

})

export const deleteProduct = asyncErrorHandling(async (req, res) => {
    const { id } = req.params

    if (!id) return errorHanlder(createError("product not found"), req, res)

    const productToDelete = await Product.findByIdAndDelete(id)

    res.send({
        success: true,
        message: "Product delete successfully"
    })
})