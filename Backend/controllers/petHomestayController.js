import { asyncErrorHandling } from "../middlewares/asyncErrorHandler.js";
import { createError, errorHanlder } from "../middlewares/errorHandling.js";
import { homestay } from "../models/petHomestay.js";
import { user } from "../models/userModel.js";

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