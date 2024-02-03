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
        createToken(res, user);
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

export const logoutUser = async (req, res, next) => {
    try {
        if (req.headers && req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            const userId = req.user._id;
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "Authorization failed."
                })
            }
            const setToken = []
            await User.findByIdAndUpdate(userId, { token: setToken })
            res.json({
                success: true,
                message: "Logout successful."
            })
        }
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const setProfilePhoto = async (req, res, next) => {
    try {
        const { user } = req;
        const userId = user._id;
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "mobileloginsystem/user"
        })
        const photo = {
            public_id: result.public_id,
            secure_url: result.secure_url
        }
        await User.findByIdAndUpdate(userId, { photo })
        const updatedUser = await User.findById(userId);
        user.password = undefined;
        res.status(200).json({
            success: true,
            message: "Profile photo set.",
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getProfile = async (req, res, next) => {
    const { user } = req;
    if (!user) {
        return res.json({
            success: true,
            message: "Unauthorized Access."
        })
    }
    user.password = undefined;
    res.json({
        success: true,
        user
    })
}