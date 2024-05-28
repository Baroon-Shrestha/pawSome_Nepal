import { asyncErrorHandling } from "../middlewares/asyncErrorHandler.js"
import { errorHanlder, createError } from "../middlewares/errorHandling.js"
import jwt from "jsonwebtoken";
import { user } from "../models/userModel.js"

export const isAuthorized = asyncErrorHandling(async (req, res, next) => {

    let token;

    if (req.headers.authorization) {
        token = req.headers.authorization;
    } else if (req.cookies.token) {
        token = req.cookies.token;
    }



    if (!token) {
        return errorHanlder(createError("You are not authorized", 400), req, res);
    }

    try {
        const decodedId = jwt.verify(token, " f0f3f30f1a7eb98c87223fcc8b9be1832874babf057b777582286fd734642e9f502672242b86bbe2d19440ff5ac88a509bfd14518be5008e0774378e5f0c74be");
        req.user = await user.findById(decodedId.id);
        next();
    } catch (error) {
        console.error("Authorization error:", error);
        if (error.name === 'JsonWebTokenError') {
            return errorHanlder(createError("Invalid token", 401), req, res);
        } else {
            return errorHanlder(createError("Internal Server Error", 500), req, res);
        }
    }
});
