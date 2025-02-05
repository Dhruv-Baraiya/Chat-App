import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/Authroute.js";
import contactsRoutes from "./routes/Contactsroute.js";
import setupSocket from "./socket.js";
import messagesRoutes from "./routes/MessagesRoute.js";
import channelRoutes from "./routes/ChannelRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3030;
const db_url = process.env.DB_URL;

app.use(cors({
    origin: process.env.ORIGIN,
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

// app.use("/uploads/files", express.static("uploads/files"));

app.use(cookieParser());
app.use(express.json({limit: '10mb'}));

mongoose.connect(db_url).then(()=>console.log("connected")).catch(err=>console.log(err.message));

app.use("/api/auth",authRoutes);
app.use("/api/contacts",contactsRoutes);
app.use("/api/messages",messagesRoutes);
app.use("/api/channel",channelRoutes)

const server = app.listen(port,()=>{
    console.log(`Server is runninng on port http://localhost:${port}`);
    
})

setupSocket(server);

