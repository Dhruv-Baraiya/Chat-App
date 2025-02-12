import { Router } from "express";
import { verifyToken } from "../middlewares/Authmiddleware.js";
import { createChannel, getUserChannels } from "../controllers/ChannelControllers.js";


const channelRoutes = Router();

channelRoutes.post("/create-channel",verifyToken,createChannel);
channelRoutes.get("/get-user-channels",verifyToken,getUserChannels);

export default channelRoutes;