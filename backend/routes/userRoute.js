import express from "express";
import { loginUser, registerUser, logoutUser, setProfilePhoto, getProfile } from "../controllers/userController.js";
import { isLoggedIn } from "../middlewares/userMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(isLoggedIn, logoutUser);
router.route("/setProfilePhoto").put(upload.single("profile"), isLoggedIn, setProfilePhoto);
router.route("/getUserProfile").get(isLoggedIn, getProfile);

export default router;