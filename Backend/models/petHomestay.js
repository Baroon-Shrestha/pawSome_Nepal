import mongoose from "mongoose";

const homestaySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    name: {
        type: String,
        required: true,
        minLength: [3, "name should not be this short"],
        maxLength: [20, "name should not be this long"]
    },
    category: {
        type: String,
        required: [true, "You cannot leave this empty"],
        enum: ["Dog", "Cat", "Other"]
    },
    age: {
        type: Number,
        required: [true, "You cannot leave this empty"],
        minLength: [1, "age cannot be this short"],
        maxLength: [2, "age cannot be this long"]
    },
    gender: {
        type: String,
        required: [true, "you cannot leave this empty"],
        enum: ["Male", "Female"]
    },
    breed: {
        type: String,
        required: [true, "You cannot leave this empty"],
        minLength: [2, "breed name cannot be this short"],
        maxLength: [50, "breed name cannot be this long"]
    },
    image: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    specialCare: {
        type: String,
    },
    disease: {
        type: String
    },
    dateFrom: {
        type: Date,
        required: true,
    },
    dateTo: {
        type: Date,
        required: true,
    }
})

export const homestay = mongoose.model("pet sitting", homestaySchema)