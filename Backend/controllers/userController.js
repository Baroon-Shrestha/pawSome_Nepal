import { asyncErrorHandling } from "../middlewares/asyncErrorHandler.js";
import { createError, errorHanlder } from "../middlewares/errorHandling.js";
import { user } from "../models/userModel.js";
import { getToken } from "../utils/token.js";
import cloudinary from 'cloudinary'
import bcrypt from 'bcrypt';

export const userData = asyncErrorHandling(async (req, res) => {
    const users = await user.find()
    res.send({
        success: true,
        users
    })
})

export const register = asyncErrorHandling(async (req, res) => {
    const { firstname, lastname, number, email, password, confirmPassword } = req.body;

    if (!firstname || !lastname || !number || !email || !password || !confirmPassword) {
        return errorHanlder(createError("You cannot leave any of these empty"), req, res);
    }

    const ifExists = await user.findOne({ email });

    if (ifExists) {
        return errorHanlder(createError("This email already exists"), req, res);
    }

    let publicId = ''
    let url = ''
    let cloudinaryResponse;

    if (req.files && req.files.profile) {
        const { profile } = req.files;
        const imgExt = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

        if (!imgExt.includes(profile.mimetype)) {
            return errorHanlder(createError("Please upload the image in PNG, JPEG, JPG, or WEBP format"), req, res);
        }

        cloudinaryResponse = await cloudinary.uploader.upload(profile.tempFilePath);
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.log("Cloudinary error:", cloudinaryResponse.error || "Unknown Cloudinary error");
            return errorHanlder(createError("Failed to upload"), req, res);
        }
        publicId = cloudinaryResponse.public_id
        url = cloudinaryResponse.secure_url
    }
    else {
        publicId = "gfpbmxq7uasbahzowi0t"
        url = "https://res.cloudinary.com/dbwu2fxcs/image/upload/v1712850394/gfpbmxq7uasbahzowi0t.jpg"
    }

    const newUser = await user.create({
        firstname,
        lastname,
        number,
        email,
        password,
        confirmPassword,
        profile: {
            public_id: publicId,
            url: url
        }
    });

    getToken(newUser, 200, res, "Registration and token generation successful");
});


export const login = asyncErrorHandling(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) return errorHanlder(createError("User info not found"), req, res)

    const userInfo = await user.findOne({ email }).select("+password")
    if (!userInfo) return errorHanlder(createError("User not Found"), req, res)

    const confirmPass = await userInfo.comparePassword(password)
    if (!confirmPass) {
        return errorHanlder(createError("email or password is incorrect"), req, res)
    }

    getToken(userInfo, 200, res, "login and token generation successfull")
})

export const getLoggedInUser = asyncErrorHandling(async (req, res) => {
    const loggedInUser = await req.user

    res.send({
        success: true,
        loggedInUser
    })
})

export const logout = asyncErrorHandling(async (req, res) => {
    res.status(201).cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "logged out",
    })
})

export const deleteUser = asyncErrorHandling(async (req, res) => {
    const { id } = req.params
    const { email } = req.user

    if (!email.endsWith(".admin@gmail.com")) return errorHanlder(createError("you're not authorized"), req, res)

    const UserToDelete = await user.findById(id)
    if (!UserToDelete) return errorHanlder(createError("User not found"), req, res)

    await user.deleteOne({ _id: id });

    res.send({
        success: true,
        message: "user deleted successfully"
    })
})

export const updateUser = asyncErrorHandling(async (req, res) => {
    const { id } = req.params;
    const loggedInUserId = req.user.id;

    if (id !== loggedInUserId) {
        return errorHanlder(createError("You are not authorized to update this user's data"), req, res);
    }

    let profileUpdate = {};

    if (req.files && req.files.profile) {
        const profileFile = req.files.profile;

        const cloudinaryResponse = await cloudinary.uploader.upload(profileFile.tempFilePath);
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.log("Cloudinary error:", cloudinaryResponse.error || "Unknown Cloudinary error");
            return errorHanlder(createError(500, "Failed to upload profile image"), req, res);
        }

        profileUpdate = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        };
    }

    delete req.body.email;

    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    // Create update object for user data excluding profile if no new image provided
    const updateObject = Object.keys(profileUpdate).length !== 0 ?
        { ...req.body, profile: profileUpdate } :
        req.body;

    // Use findByIdAndUpdate to update user data
    const userToUpdate = await user.findByIdAndUpdate(id, updateObject, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    if (!userToUpdate) {
        return errorHanlder(createError("User not found"), req, res);
    }

    res.send({
        success: true,
        message: "User updated successfully",
        userToUpdate
    });
});
