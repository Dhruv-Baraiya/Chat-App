import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import apiClient from "@/lib/api-client";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store"
import { LOGOUT_ROUTE } from "@/utils/constants";
import { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { IoPowerSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProfileInfo = () => {
    const { userInfo, setUserInfo } = useAppStore();
    const [image, setImage] = useState();
    const navigate = useNavigate();
    const imgBaseURL = import.meta.env.VITE_CLOUDINARY_URL;
    // console.log(userInfo)

    useEffect(() => {
        if (userInfo.image) {
            setImage(`${imgBaseURL}/${userInfo.image}`);  // Construct the image URL using public_id
        }
    }, [userInfo]);

    const logout = async()=>{
        try {
            const response = await apiClient.post(LOGOUT_ROUTE,{},{withCredentials:true})
            console.log(response)
            if(response.status===200){
                navigate("/auth");
                setUserInfo(null)
                toast.success(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className='absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33]'>
            <div className="flex gap-3 items-center justify-center">
                <div className="w-12 h-12 relative">
                    <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                        {image ? (
                            <AvatarImage src={image} alt="profile" className="object-cover h-full w-full bg-black" />
                        ) : (
                            <div
                                className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full shadow-lg ${getColor(
                                    userInfo.color
                                )}`}
                            >
                                {userInfo.firstName ? userInfo.firstName[0] : userInfo.email[0]}
                            </div>
                        )}
                    </Avatar>
                </div>
                <div>
                    {userInfo.firstName && userInfo.lastName ? `${userInfo.firstName} ${userInfo.lastName}` : ""}
                </div>
            </div>
            <div className="flex gap-5">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            < FiEdit2 className="text-purple-500 text-xl font-medium" onClick={()=>navigate('/profile')}/>
                        </TooltipTrigger>
                        <TooltipContent className="bg-[#1c1b1e] border-none text-white">
                            <p>Edit Profile</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            < IoPowerSharp className="text-red-500 text-xl font-medium" onClick={logout}/>
                        </TooltipTrigger>
                        <TooltipContent className="bg-[#1c1b1e] border-none text-white">
                            <p>Logout</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

            </div>
        </div>
    )
}

export default ProfileInfo
