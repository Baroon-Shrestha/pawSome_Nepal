import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    prodImage: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    description: {
        type: String
    },
    // forPetCategory: {
    //     type: String,
    //     enum: ["Dog", "Cat", "Other"]
    // },
    price: {
        type: Number,
    },
    stockQuantity: {
        type: Number,
        required: true
    }
})

export const Product = mongoose.model("Products", productSchema)