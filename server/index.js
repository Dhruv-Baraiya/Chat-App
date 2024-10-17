import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/Authroute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3030;
const db_url = process.env.DB_URL;

app.use(cors({
    origin: "http://localhost:5173",
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));


app.use(cookieParser());
app.use(express.json());

mongoose.connect(db_url).then(()=>console.log("connected")).catch(err=>console.log(err.message));

app.use("/api/auth",authRoutes);

app.listen(port,()=>{
    console.log(`Server is runninng on port http://localhost:${port}`);
    
})