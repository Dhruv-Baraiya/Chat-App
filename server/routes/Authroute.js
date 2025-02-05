import { Router } from "express";
import { getUserInfo, login, signUp ,updateProfile, addProfileImage, removeProfileImage, logout} from "../controllers/Authcontroller.js";
import { verifyToken } from "../middlewares/Authmiddleware.js";

const authRoutes = Router();



authRoutes.post("/signup",signUp);
authRoutes.post("/login",login);
authRoutes.get("/user-info",verifyToken,getUserInfo);
authRoutes.post("/update-profile",verifyToken,updateProfile);
authRoutes.post("/add-profile-image",verifyToken,addProfileImage);
authRoutes.post("/remove-profile-image",verifyToken,removeProfileImage);
authRoutes.post("/logout",logout)

export default authRoutes;