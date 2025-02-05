import { compare } from "bcrypt";
import userModel from "../models/Usermodel.js";
import jwt from "jsonwebtoken";
import cloudinary from "../middlewares/cloudinary.js";


const maxAge = 20000;

const createToken = (email, userId) => {
    return jwt.sign({ email, userId }, process.env.JWT_KEY, { expiresIn: maxAge });
}

export const signUp = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const userExist = await userModel.findOne({ email })
        if (userExist) {
            return res.json({ success: false, message: "User already exist" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter strong password" });
        }

        const user = await userModel.create({ email, password })
        res.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure: true,//
            sameSite: "None",
            httpOnly: true//
        });
        return res.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup,
                firstName: user.firstName,
                message: "Registration Successfull"
            },
        })
    } catch (error) {
        console.log({ error });
        return res.status(500).send("Internal Server Error")
    }
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "User not Found" });
        }

        const auth = await compare(password, user.password);
        if (!auth) {
            return res.json({ success: false, message: "Password is incorrect" });
        }
        res.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure: true,//
            sameSite: "None",
            httpOnly: true
        });
        return res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                color: user.color,
                message: "Login Successfull"
            },
        })
    } catch (error) {
        console.log({ error });
        return res.status(500).send("Internal Server Error")
    }
}

export const getUserInfo = async (req, res, next) => {
    try {
        const userData = await userModel.findById(req.userId)

        if (!userData) {
            return res.json({ success: false, message: "User not Found" });
        }
        return res.status(200).json({
            id: userData.id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color,
            message: "Login Successfull"
        })
    } catch (error) {
        console.log({ error });
        return res.status(500).send("Internal Server Error")
    }
}

export const updateProfile = async (req, res, next) => {
    try {
        const { userId } = req;
        const { firstName, lastName, color } = req.body;

        if (!firstName) {
            return res.json({ success: false, message: "First Name is required" });
        }
        if (!lastName) {
            return res.json({ success: false, message: "Last Name is required" });
        }
        // if(!color){
        //     return res.json({success:false,message:"color is required"})
        // }
        const userData = await userModel.findByIdAndUpdate(userId, {
            firstName, lastName, color, profileSetup: true
        }, { new: true, runValidators: true })
        return res.status(200).json({
            id: userData.id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color,
            message: "Login Successfull"
        })
    } catch (error) {
        console.log({ error });
        return res.status(500).send("Internal Server Error")
    }
}



// export const addProfileImage = async (req, res, next) => {
//     try {
//         const { userId } = req;
//         const { image, mail } = req.body;
//         const fileName = `${mail}-profile-${userId}`; 

//         const uploadImage = await cloudinary.v2.uploader.upload(image, {
//             public_id: fileName,
//             folder: 'Chat_App/User_Profile',
//             allowed_formats: ['png', 'jpg', 'jpeg', 'webp', 'svg', 'ico']
//         });

//         const publicId = uploadImage.public_id;  

//         await userModel.findByIdAndUpdate(userId, {
//             image: publicId  
//         }, { runValidators: true });
//         console.log(publicId);
//         return res.status(200).json({
//             image: publicId,  
//             message: "Profile image updated successfully"
//         });
//     } catch (error) {
//         console.log({ error });
//         return res.status(500).send("Internal Server Error");
//     }
// };

// export const addProfileImage = async (req, res, next) => {
//     try {
//         const { userId } = req;
//         const { image, mail } = req.body;

//         // Add a timestamp to make the public_id unique
//         const fileName = `${mail}-profile-${userId}-${new Date().getTime()}`; 

//         const uploadImage = await cloudinary.v2.uploader.upload(image, {
//             public_id: fileName,
//             folder: 'Chat_App/User_Profile',
//             allowed_formats: ['png', 'jpg', 'jpeg', 'webp', 'svg', 'ico']
//         });

//         const publicId = uploadImage.public_id;  

//         await userModel.findByIdAndUpdate(userId, {
//             image: publicId  
//         }, { runValidators: true });

//         return res.status(200).json({
//             image: publicId,  
//             message: "Profile image updated successfully"
//         });
//     } catch (error) {
//         console.log({ error });
//         return res.status(500).send("Internal Server Error");
//     }
// };

// letest limit up to 10 mb image

export const addProfileImage = async (req, res, next) => {
    try {
        const { userId } = req;
        const { image, mail } = req.body;

        // Estimate the image size in bytes (base64 size approximation)
        const estimatedSize = (image.length * 3) / 4;
        const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB

        if (estimatedSize > MAX_IMAGE_SIZE) {
            return res.status(400).json({
                message: "File size exceeds the 10 MB limit. Please upload a smaller image."
            });
        }

        const fileName = `${mail}-profile-${userId}-${new Date().getTime()}`;

        const uploadImage = await cloudinary.v2.uploader.upload_large(image, {
            public_id: fileName,
            folder: 'Chat_App/User_Profile',
            allowed_formats: ['png', 'jpg', 'jpeg', 'webp', 'svg', 'ico'],
        });

        const publicId = uploadImage.public_id;

        await userModel.findByIdAndUpdate(userId, { image: publicId }, { runValidators: true });

        return res.status(200).json({
            image: publicId,
            message: "Profile image updated successfully"
        });
    } catch (error) {
        console.error("Error uploading profile image:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const removeProfileImage = async (req, res, next) => {
    try {
        const { userId } = req;

        const user = await userModel.findById(userId);
        // console.log(user);

        if (!user) {
            return res.status(404).send("User not found");
        }

        if (user.image) {  
            const publicId = user.image;  

            await cloudinary.v2.uploader.destroy(publicId); 

            
                var updatedData = await userModel.findByIdAndUpdate(userId, {
                    image: null
                }, { runValidators: true });
            
            // await cloudinary.v2.uploader.destroy(publicId); 
            // user.image = null;
            // await user.save();

            return res.status(200).json({
                image: updatedData.image,  
                message: "Profile image updated successfully"
            });
        } else {
            return res.status(400).send("No image to remove");
        }
    } catch (error) {
        console.log({ error });
        return res.status(500).send("Internal Server Error");
    }
};


export const logout = async (req, res, next) => {
    try {
        
        res.cookie("jwt","",{maxAge:1,secure:true,sameSite:"None"})
        res.status(200).send("Logout Successful!")
    } catch (error) {
        console.log({ error });
        return res.status(500).send("Internal Server Error");
    }
};