import mongoose from "mongoose";

const homestaySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    // Date: {
    //     type: Date,
    //     default: Date.now
    // }
})

export const homestay = mongoose.model("pet sitting", homestaySchema)