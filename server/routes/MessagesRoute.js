import { Router } from "express";
import { verifyToken } from "../middlewares/Authmiddleware.js";
import { getMessages, uploadFile, uploadMiddleware } from "../controllers/MessageController.js";
// import multer from "multer";


const messagesRoutes = Router();

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

messagesRoutes.post("/get-messages",verifyToken,getMessages);
messagesRoutes.post("/upload-file", uploadMiddleware,verifyToken, uploadFile);

export default messagesRoutes;