import mongoose from "mongoose";
import Channel from "../models/ChannelModal.js";
import userModel from "../models/Usermodel.js";


export const createChannel = async (req, res, next) => {
    try {
        const {name,members}= req.body;
        const userId =  req.userId;

        const admin = await userModel.findById(userId);

        if(!admin){
            return res.status(400).send("Admin is not Found");
        }
        
        const validMembers = await userModel.find({_id:{$in:members}});

        if(validMembers.length !== members.length){
            return res.status(400).send("Some members are not Valid");
        }

        const newChannel =new Channel({
            name,members,admin:userId
        });

        await newChannel.save();

        return res.status(201).send({channel: newChannel});
    } catch (error) {
        console.log({ error });
        return res.status(500).send("Internal Server Error");
    }
};

export const getUserChannels = async (req, res, next) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.userId);
        const channels = await Channel.find({
            $or: [{admin:userId},{members:userId}]
        }).sort({updatedAt:-1});



        return res.status(201).send({channels});
    } catch (error) {
        console.log({ error });
        return res.status(500).send("Internal Server Error");
    }
};