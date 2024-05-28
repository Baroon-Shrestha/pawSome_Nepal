import mongoose from 'mongoose';

export const connectDB = () => {

    mongoose.connect("mongodb+srv://bar00nshrestha098:Bl67u1WZyixtphKI@cluster0.0ri681o.mongodb.net/PetsNepal?retryWrites=true&w=majority&appName=Cluster0")
        .then(() => {
            console.log("Connection successful");
        })
        .catch((err) => {
            console.error("Connection error:", err);
        });
};
