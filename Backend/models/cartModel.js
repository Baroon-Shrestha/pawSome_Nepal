import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    product: { type: mongoose.Types.ObjectId, ref: 'Products' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    quantity: {
        type: Number,
    }
})

export const cart = mongoose.model("cart", cartSchema)