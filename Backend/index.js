import app from "./app.js"
import cloudinary from 'cloudinary'

cloudinary.v2.config({
    cloud_name: "dbwu2fxcs",
    api_key: "875927265939911",
    api_secret: "u8AUQuna7zXn1OVDDWuF5HI09vk"
})

app.get("/", (req, res) => {
    res.json("conncetion successfull")
})

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
});


