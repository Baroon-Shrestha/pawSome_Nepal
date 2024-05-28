import app from "./app.js"
import cloudinary from 'cloudinary'
import dotenv from 'dotenv'
import { getpets } from "./controllers/petController.js";

dotenv.config();

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDIARY_PASS
})

app.get("/", getpets)

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
});


