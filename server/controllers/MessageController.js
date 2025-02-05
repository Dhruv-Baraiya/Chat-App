// import Message from "../models/MessageModel.js";
// import cloudinary from "../middlewares/cloudinary.js";
// import multer from "multer";

 
// export const getMessages = async (req, res, next) => {
//     try {

//         const user1 = req.userId;
//         const user2 = req.body.id; 

//         if(!user1 || !user2 ){
//             return res.status(400).send("User Required");
//         }


//         const messages = await Message.find({
//             $or: [
//                 {sender: user1, recipient: user2},
//                 {sender: user2, recipient: user1},
//             ]
//         }).sort({timestamp: 1});

        
//         return res.status(200).json({messages})
//     } catch (error) {
//         console.log({ error });
//         return res.status(500).send("Internal Server Error");
//     }
// };

// const storage = multer.memoryStorage();
// const upload = multer({ storage });
// export const uploadFile = async (req, res, next) => {
//     try {
//         const file = req.file; // Get the uploaded file from the request

//         if (!file) {
//             return res.status(400).json({ error: 'No file uploaded' });
//         }

//         const fileExtension = file.originalname.split('.').pop(); // Extract file extension
//         const publicId = `${Date.now()}-${file.originalname}`; // Generate unique ID with original name

//         // Upload to Cloudinary as 'raw' resource type
//         const result = await cloudinary.uploader.upload_stream(
//             {
//                 folder: 'Chat_App/Files',
//                 resource_type: 'raw', // Use raw for non-media files
//                 public_id: publicId,
//                 format: fileExtension,
//             },
//             async (error, result) => {
//                 if (error) {
//                     console.error("Error uploading file:", error);
//                     return res.status(500).json({ error: 'Failed to upload file.' });
//                 }

//                 // Save the message with file URL in MongoDB
//                 const newMessage = new Message({
//                     sender: req.body.sender,        // assuming 'sender' is part of the request body
//                     receiver: req.body.receiver,    // assuming 'receiver' is part of the request body
//                     fileUrl: result.secure_url,     // Cloudinary file URL
//                     fileType: file.mimetype,        // MIME type of the file
//                 });

//                 try {
//                     const savedMessage = await newMessage.save();
//                     return res.status(200).json(savedMessage);
//                 } catch (saveError) {
//                     console.error("Error saving message:", saveError);
//                     return res.status(500).json({ error: 'Failed to save file URL to database.' });
//                 }
//             }
//         );

//         // End the stream after file upload
//         result.end(file.buffer);

//     } catch (error) {
//         console.error("Unexpected error:", error);
//         return res.status(500).send("Internal Server Error");
//     }
// };
// export const uploadMiddleware = upload.single("file");

import Message from "../models/MessageModel.js";
import cloudinary from "../middlewares/cloudinary.js";
// import multer from "multer";
// import { v2 as cloudinary } from 'cloudinary';
// import {mkdirSync, renameSync} from 'fs'
// import streamifier from 'streamifier';

// Set up multer to handle file uploads in memory
// const storage = multer.memoryStorage();
// const upload = multer({
//     storage: storage
// });

// Upload middleware to handle single file uploads


export const getMessages = async (req, res, next) => {
    try {
        const user1 = req.userId;
        const user2 = req.body.id;

        if (!user1 || !user2) {
            return res.status(400).send("User Required");
        }

        const messages = await Message.find({
            $or: [
                { sender: user1, recipient: user2 },
                { sender: user2, recipient: user1 },
            ]
        }).sort({ timestamp: 1 });

        return res.status(200).json({ messages });
    } catch (error) {
        console.log({ error });
        return res.status(500).send("Internal Server Error");
    }
};


export const uploadFile =  async (req, res, next) => {
    // try {
    //     const file = req.file;

    //     if (!file) {
    //         return res.status(400).json({ error: 'No file uploaded' });
    //     }

    //     const fileExtension = file.originalname.split('.').pop();
    //     const publicId = `${Date.now()}-${file.originalname}`;

    //     // Upload the file to Cloudinary
    //     cloudinary.uploader.upload_stream(
    //         {
    //             folder: 'Chat_App/Files',
    //             resource_type: 'raw',
    //             public_id: publicId,
    //             format: fileExtension,
    //             chunk_size: 6000000,  // Optional chunk size for large files
    //         },
    //         (error, result) => {
    //             if (error) {
    //                 console.error("Cloudinary upload error:", error);
    //                 return res.status(500).json({ error: 'Failed to upload file to Cloudinary' });
    //             }

    //             // Return the file URL after successful upload
    //             return res.status(200).json({ message: "File uploaded", filePath: result.secure_url });
    //         }
    //     ).end(file.buffer);  // Pipe file buffer directly to Cloudinary
    // } catch (error) {
    //     console.error("Unexpected error during file upload:", error);
    //     return res.status(500).json({ error: "Internal Server Error" });
    // }

    try {
        const file = req.file;
        // console.log({file})
        if (!file) {
          return res.status(400).json({ error: 'No file uploaded.' });
        }
      
        const fileExtension = file.originalname.split('.').pop(); // get the file extension
      
        // Generate a unique name with extension
        const publicId = `${Date.now()}-${file.originalname}`;
      
        // console.log('File buffer size:', file.buffer.length); // Check buffer size
      
        // Upload to Cloudinary with public_id and resource_type as raw
        cloudinary.uploader.upload_stream(
            {
              folder: 'Chat_App/Files',
              resource_type: 'raw',
              public_id: publicId,
              format: fileExtension, // Force extension
            },
            (error, result) => {
              if (error) {
                console.error('Cloudinary upload error:', error);
                return res.status(500).json({ error: 'Failed to upload file to Cloudinary.' });
              }
              res.status(200).json({ filePath: result.secure_url });
            }
          ).end(req.file.buffer);
      
      } catch (error) {
        console.error('Error in file upload:', error);
        res.status(500).json({ error: 'Failed to upload file.' });
      }
};

// export const uploadFile = async (req, res, next) => {
//     try {
//         if(!req.file){
//             return res.status(400).send("File is required");
//         }
//         const date = Date.now();
//         let fileDir = `uploads/files/${date}`;
//         let fileName = `${fileDir}/${req.file.originalname}`;

//         mkdirSync(fileDir,{recursive: true})

//         renameSync(req.file.path, fileName)

//         return res.status(200).json({filePath: fileName});
        
//     } catch (error) {
//         console.error("Unexpected error:", error);
//         return res.status(500).send("Internal Server Error");
//     }
// };


export const uploadMiddleware = upload.single("file");