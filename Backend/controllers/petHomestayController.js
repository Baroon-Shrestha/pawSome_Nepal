import { asyncErrorHandling } from "../middlewares/asyncErrorHandler.js";
import { createError, errorHanlder } from "../middlewares/errorHandling.js";
import { homestay } from "../models/petHomestay.js";
import { user } from "../models/userModel.js";
import cloudinary from 'cloudinary'

export const addRequest = asyncErrorHandling(async (req, res) => {
    const { id: userId, email } = req.user;

    if (email.endsWith(".admin@gmail.com")) return errorHanlder(createError("You're not authorized"), req, res);

    const { name, category, age, gender, breed, specialCare, disease, dateFrom, dateTo } = req.body;

    // Check if dates are in the future and DateTo is after DateFrom
    const currentDate = new Date();

    if (new Date(dateFrom) <= currentDate) {
        return errorHanlder(createError("DateFrom should be in the future"), req, res);
    }

    if (new Date(dateTo) <= new Date(dateFrom)) {
        return errorHanlder(createError("DateTo should be after DateFrom"), req, res);
    }

    const { image } = req.files;

    // Check if image is provided
    if (!image) {
        return errorHanlder(createError("Please provide at least one image"), req, res);
    }

    const allowedExtensions = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

    // Process single or multiple images
    if (!Array.isArray(image)) {
        // Handle single image upload
        if (!allowedExtensions.includes(image.mimetype)) {
            return errorHanlder(createError("Please upload images in PNG, JPEG, JPG, or WEBP format"), req, res);
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(image.tempFilePath);
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.log("Cloudinary error:", cloudinaryResponse.error || "Unknown Cloudinary error");
            return errorHanlder(createError("Failed to upload image"), req, res);
        }

        const post = await homestay.create({
            user: userId, name, age, category, breed, gender, image: [{
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url
            }], specialCare, disease, dateFrom, dateTo
        });

        return res.status(200).json({
            success: true,
            message: "Posted successfully",
            post
        });
    } else {
        // Handle multiple image uploads
        for (const img of image) {
            if (!allowedExtensions.includes(img.mimetype)) {
                return errorHanlder(createError("Please upload images in PNG, JPEG, JPG, or WEBP format"), req, res);
            }
        }

        const uploadedImages = [];

        for (const img of image) {
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

        const post = await homestay.create({
            user: userId, name, age, category, breed, gender, image: uploadedImages, specialCare, disease, dateFrom, dateTo
        });

        return res.status(200).json({
            success: true,
            message: "Posted successfully",
            post
        });
    }
});



export const yourHomestayRequest = asyncErrorHandling(async (req, res) => {
    const { id: userId, email } = req.user

    if (email.endsWith(".admin@gmail.com")) return errorHanlder(createError("you are not authorized"), req, res)

    if (!userId) return errorHanlder(createError("no user found"), req, res)

    const users = await user.findById(userId);
    if (!users) {
        return errorHanlder(createError("User not found"), req, res);
    }
    const homestayRequest = await homestay.find({ user: userId }).populate('user');

    return res.status(200).json({ success: true, homestayRequest });
});

export const viewAllRequest = asyncErrorHandling(async (req, res) => {
    const { email } = req.user

    if (!email.endsWith(".admin@gmail.com")) return errorHanlder(createError("you're not authoroized"), req, res)

    const requests = await homestay.find({}).populate('user')

    res.send({
        success: true,
        requests
    })
})

export const deleteRequest = asyncErrorHandling(async (req, res) => {
    const { email } = req.user

    if (!email.endsWith(".admin@gmail.com")) return errorHanlder(createError("you're not authorized"), req, res)

    const { id } = req.params

    const deleteReq = await homestay.findByIdAndDelete(id)

    res.send({
        success: true,
        message: "request deleted successfully"
    })

})