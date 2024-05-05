import { asyncErrorHandling } from "../middlewares/asyncErrorHandler.js";
import { createError, errorHanlder } from "../middlewares/errorHandling.js";
import { adopt } from "../models/adoptModel.js";

export const adoptPet = asyncErrorHandling(async (req, res) => {
    const { id: userId, email } = req.user;

    if (email.endsWith(".admin@gmail.com")) return errorHanlder(createError("You're not authorized"), req, res);

    const { reason } = req.body;
 
    const { id: petId } = req.params;

    if (!petId) {
        return errorHanlder(createError("Pet not found!"), req, res);
    }

    const requestedBy = userId;

    const existingAdoption = await adopt.findOne({ user: userId, pet: petId })

    if (existingAdoption) {
        return errorHanlder(createError("You have already requested to adopt this pet"), req, res);
    }

    const adoption = await adopt.create({ user: userId, pet: petId, reason, requestedBy });

    res.send({
        success: true,
        "message": "Request sent successfully",
        adoption
    });
});

export const viewAdoptReq = asyncErrorHandling(async (req, res) => {
    // const { email } = req.user;

    // if (!email.endsWith(".admin@gmail.com")) return errorHanlder(createError("You're not authorized"), req, res);

    const viewReq = await adopt.find().populate('user').populate('pet');

    res.send({
        success: true,
        viewReq
    });
});

export const deleteReq = asyncErrorHandling(async (req, res) => {
    const { id } = req.params
    const { email } = req.user

    if (!email.endsWith(".admin@gmail.com")) return errorHanlder(createError("you're not authorized"), req, res)

    if (!id) return errorHanlder(createError("the request is not valid"), req, res)

    const deleteAdoptReq = await adopt.findById(id)
    if (!deleteAdoptReq) return errorHanlder(createError("request not found"), req, res)

    await adopt.deleteOne({ _id: id });

    res.send({
        success: true,
        message: "Deleted successfully"
    })
})