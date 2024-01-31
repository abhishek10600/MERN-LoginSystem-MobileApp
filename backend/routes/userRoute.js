import express from "express";
import { loginUser, registerUser, setProfilePhoto } from "../controllers/userController.js";
import { isLoggedIn } from "../middlewares/userMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/setProfilePhoto").put(isLoggedIn, upload.single("profile"), setProfilePhoto);

export default router;