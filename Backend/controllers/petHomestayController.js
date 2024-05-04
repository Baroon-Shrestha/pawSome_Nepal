import { asyncErrorHandling } from "../middlewares/asyncErrorHandler.js";
import { createError, errorHanlder } from "../middlewares/errorHandling.js";
import { homestay } from "../models/petHomestay.js";

export const addRequest = asyncErrorHandling(async (req, res) => {

    const { id: userId, email } = req.user;

    if (email.endsWith(".admin@gmail.com")) return errorHanlder(createError("You're not authorized"), req, res);

    const newRequest = await homestay.create({ user: userId });
    res.send({
        success: true,
        message: 'Request sent successfully',
        newRequest
    });
});

export const viewRequest = asyncErrorHandling(async (req, res) => {
    const { email } = req.user

    if (!email.ednsWith(".admin@gmail.com")) return errorHanlder(createError("you're not authorized"), req, res)

    const viewAllRequest = await homestay.find().populate('user');
    return res.send({ success: true, requests: viewAllRequest });
});

export const viewYourRequest = asyncErrorHandling(async (req, res) => {

})