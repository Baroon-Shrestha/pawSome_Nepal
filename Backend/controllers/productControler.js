import { asyncErrorHandling } from "../middlewares/asyncErrorHandler.js";
import { createError, errorHanlder } from "../middlewares/errorHandling.js";
import { cart } from "../models/cartModel.js";
import { Product } from "../models/products.js"
import cloudinary from 'cloudinary'

export const addProduct = asyncErrorHandling(async (req, res) => {
    const { email } = req.user

    if (!email.endsWith(".admin@gmail.com")) return errorHanlder(createError("you're not authorized"), req, res)

    const { name, description, price, stockQuantity } = req.body

    if (!name || !description || !price || !stockQuantity) return errorHanlder(createError("You cannot leave any of these empty"), req, res)

    const { prodImage } = req.files

    if (!prodImage) {
        return errorHanlder(createError("Please provide at least one image"), req, res);
    }

    const allowedExtensions = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

    if (!Array.isArray(prodImage)) {
        if (!allowedExtensions.includes(prodImage.mimetype)) {
            return errorHanlder(createError("Please upload images in PNG, JPEG, JPG, or WEBP format"), req, res);
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(prodImage.tempFilePath);
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.log("Cloudinary error:", cloudinaryResponse.error || "Unknown Cloudinary error");
            return errorHanlder(createError("Failed to upload image"), req, res);
        }

        const product = await Product.create({
            name, description, price, stockQuantity, prodImage: [{
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url
            }]
        });

        return res.status(200).json({
            success: true,
            message: "Product added successfully",
            product
        });
    } else {
        for (const img of prodImage) {
            if (!allowedExtensions.includes(img.mimetype)) {
                return errorHanlder(createError("Please upload images in PNG, JPEG, JPG, or WEBP format"), req, res);
            }
        }

        const uploadedImages = [];

        for (const img of prodImage) {
            const cloudinaryResponse = await cloudinary.uploader.upload(img.tempFilePath);
            if (!cloudinaryResponse || cloudinaryResponse.error) {
                console.log("Cloudinary error:", cloudinaryResponse.error || "Unknown Cloudinary error");
                return errorHanlder(createError("Failed to upload image"), req, res);
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
    }
})

export const viewAllProduct = asyncErrorHandling(async (req, res) => {
    const viewProduct = await Product.find()

    res.send({
        success: true,
        viewProduct
    })
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

export const buyProduct = asyncErrorHandling(async (req, res) => {

})


export const addToCart = asyncErrorHandling(async (req, res) => {
    const { id: userId, email } = req.user

    if (email.endsWith(".admin@gmail.com")) return errorHanlder(createError("you're not authorized"), req, res)

    const { id: productId } = req.params

    const { quantity = 1 } = req.body

    if (!productId) return errorHanlder(createError("product not found"), req, res)

    const numQuantity = parseInt(quantity);
    if (isNaN(numQuantity) || numQuantity <= 0) return errorHanlder(createError("Invalid quantity"), req, res);

    const product = await Product.findById(productId);
    if (!product) return errorHanlder(createError("Product not found"), req, res);

    if (product.stockQuantity < numQuantity) {
        return errorHanlder(createError("Insufficient stock quantity"), req, res);
    }

    const existingInCart = await Product.findOne({ user: userId, product: productId })

    product.stockQuantity -= numQuantity;
    await product.save();

    if (existingInCart) {
        existingInCart.quantity += numQuantity
        const cartItem = await cart.create({ user: userId, product: productId, quantity })
        res.send({
            success: true,
            message: "added to cart",
        })
    }

    const carts = await cart.create({ user: userId, product: productId, quantity })

    res.send({
        success: true,
        message: "added to cart successfully",
    })
})

export const viewCart = asyncErrorHandling(async (req, res) => {
    const { id, email } = req.user

    if (email.endsWith(".admin@gmail.com")) return errorHanlder(createError("you're not authorized"), req, res)

    const seeCart = await cart.find({ user: id }).populate({ path: 'product', select: 'name price prodImage' })

    res.send({
        success: true,
        seeCart
    })
})

export const removeFromCart = asyncErrorHandling(async (req, res) => {
    const { email } = req.user

    if (email.endsWith(".admin@gmail.com")) return errorHanlder(createError("you're not authorized"), req, res)

    const { id } = req.params

    if (!id) return errorHanlder(createError("Product not found on cart"), req, res)

    const itemToRemove = await cart.findByIdAndDelete(id)

    if (!itemToRemove) return errorHanlder(createError("Item not found"), req, res)

    res.send({
        success: true,
        message: "Item removed successfully"
    })
})

export const updateFromCart = asyncErrorHandling(async (req, res) => {
    const { email } = req.user

    if (email.endsWith(".admin@gmail.com")) return errorHanlder(createError("you're not authorized"), req, res)

    const { id } = req.params
    const { quantity } = req.body

    if (!id) return errorHanlder(createError("item not found in cart"), req, res)

    const numQuantity = parseInt(quantity);
    if (isNaN(numQuantity) || numQuantity <= 0) return errorHanlder(createError("Invalid quantity"), req, res);

    const updatedCartItem = await cart.findByIdAndUpdate(id, { quantity: numQuantity }, { new: true }).populate({ path: 'product', select: 'name price stockQuantity' });

    if (!updatedCartItem) return errorHanlder(createError(404, "Item not found in cart"), req, res);

    res.send({
        success: true,
        message: "Quantity updated successfully",
        updatedCartItem
    });
})
