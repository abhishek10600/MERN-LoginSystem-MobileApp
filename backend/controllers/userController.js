import User from "../models/userModel.js";
import { createToken } from "../utils/createToken.js";
import { v2 as cloudinary } from "cloudinary";

export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        console.log({ name, email, password });
        if (name === "" || email === "" || password === "") {
            return res.json({
                success: true,
                message: "Mandatory fields are missing."
            })
        }
        let user = await User.findOne({ email });
        if (user) {
            return res.json({
                success: false,
                message: "User with this email already exists."
            })
        }
        user = await User.create({
            name,
            email,
            password
        })
        user.password = undefined;
        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log({ email, password });
        if (!email || !password) {
            return res.json({
                success: false,
                message: "Mandatory fiels are missing."
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                success: false,
                message: "Invalid email or password."
            })
        }
        const isPasswordCorrect = user.isPasswordValidated(password);
        if (!isPasswordCorrect) {
            return res.json({
                success: false,
                message: "Invalid email or password."
            })
        }
        createToken(res, user);
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const setProfilePhoto = async (req, res, next) => {
    try {
        const { user } = req;
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "mobileloginsystem/user"
        })
        user.photo.public_id = result.public_id;
        user.photo.secure_url = result.secure_url;
        user.save();
        res.status(200).json({
            success: true,
            message: "Profile photo set."
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}