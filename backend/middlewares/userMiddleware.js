import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1]
        if (!token) {
            return res.json({
                success: false,
                message: "Login required."
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}