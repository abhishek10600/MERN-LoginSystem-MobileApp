import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectWithDatabase from "./config/database.js";
import { v2 as cloudinary } from "cloudinary";

const PORT = process.env.PORT || 4001;

connectWithDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
})