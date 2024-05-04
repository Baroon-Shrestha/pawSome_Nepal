import mongoose from "mongoose";

const adoptSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pet: { type: mongoose.Schema.Types.ObjectId, ref: 'PetsData' },
    reason: {
        type: String,
        required: true
    },
    requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

})

export const adopt = mongoose.model("adopt", adoptSchema)